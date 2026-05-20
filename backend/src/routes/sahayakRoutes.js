const express = require('express');
const SahayakController = require('../controllers/sahayakController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * Incoming call webhook (no auth required)
 */
router.post('/incoming', SahayakController.incomingCall);

/**
 * Voice message processing
 */
router.post('/process-voice', SahayakController.processVoiceMessage);

/**
 * End call
 */
router.post('/end-call', SahayakController.endCall);

/**
 * Escalate call
 */
router.post('/escalate', SahayakController.escalateCall);

/**
 * Call history (protected)
 */
router.get('/call-history', authMiddleware, SahayakController.getCallHistory);
router.get('/call-details/:callLogId', authMiddleware, SahayakController.getCallDetails);

module.exports = router;
