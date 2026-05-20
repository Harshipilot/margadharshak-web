const SahayakService = require('../services/sahayakService');
const CallLog = require('../models/CallLog');

/**
 * Sahayak Calling System Controller
 */
class SahayakController {
  /**
   * Webhook: Handle incoming call
   */
  static async incomingCall(req, res) {
    try {
      const { callId, phoneNumber, language = 'en' } = req.body;

      const result = await SahayakService.initializeCall({
        callId,
        phoneNumber,
        language,
      });

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Incoming call error:', error);
      res.status(500).json({ error: 'Failed to handle incoming call' });
    }
  }

  /**
   * Process user voice message
   */
  static async processVoiceMessage(req, res) {
    try {
      const { callLogId, audioBuffer, language = 'en' } = req.body;

      // Convert speech to text
      const userText = await SahayakService.processSTT(audioBuffer, language);

      // Get AI response
      const aiResponse = await SahayakService.handleConversation(callLogId, userText);

      // Convert response to speech
      const audioResponse = await SahayakService.processTTS(aiResponse.response, language);

      res.json({
        success: true,
        userText: userText,
        aiResponse: aiResponse.response,
        audioResponse: audioResponse,
      });
    } catch (error) {
      console.error('Voice message error:', error);
      res.status(500).json({ error: 'Failed to process voice message' });
    }
  }

  /**
   * End call
   */
  static async endCall(req, res) {
    try {
      const { callLogId } = req.body;

      const callLog = await SahayakService.endCall(callLogId);

      res.json({
        success: true,
        callLog: callLog,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Escalate call to human support
   */
  static async escalateCall(req, res) {
    try {
      const { callLogId, reason } = req.body;

      const result = await SahayakService.escalateCall(callLogId, reason);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get call history
   */
  static async getCallHistory(req, res) {
    try {
      const userId = req.user.id;
      const { limit = 10 } = req.query;

      const calls = await SahayakService.getCallHistory(userId, limit * 1);

      res.json({
        success: true,
        calls: calls,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get call details
   */
  static async getCallDetails(req, res) {
    try {
      const { callLogId } = req.params;

      const callLog = await CallLog.findById(callLogId);

      if (!callLog) {
        return res.status(404).json({ error: 'Call log not found' });
      }

      res.json({
        success: true,
        data: callLog,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SahayakController;
