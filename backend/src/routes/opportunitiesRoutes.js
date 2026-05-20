const express = require('express');
const OpportunitiesController = require('../controllers/opportunitiesController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * Internships
 */
router.get('/internships', OpportunitiesController.getInternships);

/**
 * Jobs
 */
router.get('/jobs', OpportunitiesController.getJobs);

/**
 * Hackathons
 */
router.get('/hackathons', OpportunitiesController.getHackathons);

/**
 * Scholarships
 */
router.get('/scholarships', OpportunitiesController.getScholarships);

/**
 * Dashboard stats
 */
router.get('/stats', authMiddleware, OpportunitiesController.getDashboardStats);

module.exports = router;
