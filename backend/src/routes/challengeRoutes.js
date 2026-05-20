const express = require('express');
const ChallengeController = require('../controllers/challengeController');
const { authMiddleware, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * Public routes
 */
router.get('/', ChallengeController.getChallenges);
router.get('/:id', ChallengeController.getChallengeById);

/**
 * Protected routes
 */
router.post('/', authMiddleware, authorize('admin'), ChallengeController.createChallenge);
router.post('/:challengeId/submit', authMiddleware, ChallengeController.submitChallenge);
router.post('/:challengeId/bookmark', authMiddleware, ChallengeController.bookmarkChallenge);

module.exports = router;
