const Challenge = require('../models/Challenge');
const { calculateXP, calculateLevel } = require('../utils/helpers');

/**
 * Challenge Controller
 */
class ChallengeController {
  static async getChallenges(req, res) {
    try {
      const { category, difficulty, ageGroup, page = 1, limit = 10 } = req.query;

      let filter = { isActive: true };

      if (category) filter.category = category;
      if (difficulty) filter.difficulty = difficulty;
      if (ageGroup) filter.ageGroup = ageGroup;

      const challenges = await Challenge.find(filter)
        .populate('createdBy', 'name')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await Challenge.countDocuments(filter);

      res.json({
        success: true,
        data: challenges,
        pagination: {
          total,
          page: page * 1,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getChallengeById(req, res) {
    try {
      const challenge = await Challenge.findById(req.params.id).populate('createdBy', 'name');

      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }

      res.json({
        success: true,
        data: challenge,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createChallenge(req, res) {
    try {
      const { title, description, category, difficulty, ageGroup, points, content, hints } =
        req.body;

      const challenge = new Challenge({
        title,
        description,
        category,
        difficulty,
        ageGroup,
        points: points || 10,
        content,
        hints: hints || [],
        createdBy: req.user.id,
      });

      await challenge.save();

      res.status(201).json({
        success: true,
        data: challenge,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async submitChallenge(req, res) {
    try {
      const { challengeId } = req.params;
      const { submission } = req.body;

      const challenge = await Challenge.findById(challengeId);
      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }

      // For now, accept all submissions
      // In production, add actual evaluation logic
      const xpEarned = challenge.points;

      challenge.submissionCount += 1;
      challenge.acceptanceRate = (challenge.submissionCount / (challenge.submissionCount + 1)) * 100;
      await challenge.save();

      // Update user
      const User = require('../models/User');
      const user = await User.findById(req.user.id);
      user.xp = (user.xp || 0) + xpEarned;
      user.level = calculateLevel(user.xp);
      user.completedChallenges.push(challengeId);
      await user.save();

      res.json({
        success: true,
        message: 'Challenge submitted successfully',
        xpEarned,
        newLevel: user.level,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async bookmarkChallenge(req, res) {
    try {
      const { challengeId } = req.params;
      const User = require('../models/User');
      const user = await User.findById(req.user.id);

      if (user.bookmarkedChallenges.includes(challengeId)) {
        user.bookmarkedChallenges = user.bookmarkedChallenges.filter(
          (id) => id.toString() !== challengeId
        );
      } else {
        user.bookmarkedChallenges.push(challengeId);
      }

      await user.save();

      res.json({
        success: true,
        bookmarked: user.bookmarkedChallenges.includes(challengeId),
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ChallengeController;
