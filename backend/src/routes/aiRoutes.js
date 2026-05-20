const express = require('express');
const AIChatController = require('../controllers/aiChatController');
const AIRoadmapService = require('../services/aiRoadmapService');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * AI Chat endpoints
 */
router.post('/message', authMiddleware, AIChatController.sendMessage);
router.post('/analyze-skills', authMiddleware, AIChatController.analyzeSkills);
router.post('/translate', authMiddleware, AIChatController.translateText);

/**
 * AI Roadmap endpoints
 */
router.post('/roadmap-generate', authMiddleware, async (req, res) => {
  try {
    const { interest, age, ageGroup } = req.body;

    if (!interest || !age || !ageGroup) {
      return res.status(400).json({ error: 'Missing required fields: interest, age, ageGroup' });
    }

    const roadmap = await AIRoadmapService.generateRoadmap(interest, age, ageGroup);

    res.json({
      success: true,
      data: roadmap
    });
  } catch (error) {
    console.error('Roadmap generation error:', error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * System status
 */
router.get('/offline-status', AIChatController.checkOfflineAvailability);

module.exports = router;
