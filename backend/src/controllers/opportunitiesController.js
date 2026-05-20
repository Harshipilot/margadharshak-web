const Internship = require('../models/Internship');
const Job = require('../models/Job');
const Hackathon = require('../models/Hackathon');
const Scholarship = require('../models/Scholarship');

/**
 * Opportunities Controller
 */
class OpportunitiesController {
  // ============ INTERNSHIPS ============
  static async getInternships(req, res) {
    try {
      const { category, location, page = 1, limit = 10 } = req.query;

      let filter = { isActive: true };
      if (category) filter.category = category;
      if (location) filter.location = new RegExp(location, 'i');

      const internships = await Internship.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ postedDate: -1 });

      const total = await Internship.countDocuments(filter);

      res.json({
        success: true,
        data: internships,
        pagination: { total, page: page * 1, pages: Math.ceil(total / limit) },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ============ JOBS ============
  static async getJobs(req, res) {
    try {
      const { category, location, jobType, page = 1, limit = 10 } = req.query;

      let filter = { isActive: true };
      if (category) filter.category = category;
      if (location) filter.location = new RegExp(location, 'i');
      if (jobType) filter.jobType = jobType;

      const jobs = await Job.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ postedDate: -1 });

      const total = await Job.countDocuments(filter);

      res.json({
        success: true,
        data: jobs,
        pagination: { total, page: page * 1, pages: Math.ceil(total / limit) },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ============ HACKATHONS ============
  static async getHackathons(req, res) {
    try {
      const { location, difficulty, page = 1, limit = 10 } = req.query;

      let filter = { isActive: true };
      if (location) filter.location = new RegExp(location, 'i');
      if (difficulty) filter.difficulty = difficulty;

      const hackathons = await Hackathon.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ startDate: -1 });

      const total = await Hackathon.countDocuments(filter);

      res.json({
        success: true,
        data: hackathons,
        pagination: { total, page: page * 1, pages: Math.ceil(total / limit) },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ============ SCHOLARSHIPS ============
  static async getScholarships(req, res) {
    try {
      const { level, specialization, page = 1, limit = 10 } = req.query;

      let filter = { isActive: true };
      if (level) filter.level = level;
      if (specialization) filter.specialization = specialization;

      const scholarships = await Scholarship.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ deadline: -1 });

      const total = await Scholarship.countDocuments(filter);

      res.json({
        success: true,
        data: scholarships,
        pagination: { total, page: page * 1, pages: Math.ceil(total / limit) },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ============ DASHBOARD STATS ============
  static async getDashboardStats(req, res) {
    try {
      const internshipCount = await Internship.countDocuments({ isActive: true });
      const jobCount = await Job.countDocuments({ isActive: true });
      const hackathonCount = await Hackathon.countDocuments({ isActive: true });
      const scholarshipCount = await Scholarship.countDocuments({ isActive: true });

      res.json({
        success: true,
        stats: {
          internships: internshipCount,
          jobs: jobCount,
          hackathons: hackathonCount,
          scholarships: scholarshipCount,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OpportunitiesController;
