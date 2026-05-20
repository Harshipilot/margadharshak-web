const callingSystemConfig = require('../config/callingSystem');
const CallLog = require('../models/CallLog');
const axios = require('axios');

/**
 * Offline AI Calling Service (Sahayak)
 * Manages voice calls, STT, TTS, and AI responses
 */
class SahayakService {
  /**
   * Initialize incoming call
   */
  static async initializeCall(callData) {
    try {
      const { callId, phoneNumber, language = 'en' } = callData;

      // Create call log entry
      const callLog = new CallLog({
        callId,
        phoneNumber,
        language,
        startTime: new Date(),
        callStatus: 'in_progress',
      });

      await callLog.save();

      console.log(`📞 Call initiated: ${callId}`);

      return {
        callLogId: callLog._id,
        message: 'Welcome to Sahayak. How can I help you today?',
      };
    } catch (error) {
      console.error('Error initializing call:', error);
      throw error;
    }
  }

  /**
   * Process speech-to-text
   */
  static async processSTT(audioBuffer, language = 'en') {
    try {
      // Placeholder for Whisper API call
      // In production, integrate with Whisper offline model
      console.log(`🎤 Processing STT for language: ${language}`);

      // Example: Call Whisper API
      // const response = await axios.post('http://localhost:8000/transcribe', {
      //   audio: audioBuffer,
      //   language: language,
      // });

      return 'User voice transcribed to text';
    } catch (error) {
      console.error('Error in STT:', error);
      throw error;
    }
  }

  /**
   * Process text-to-speech
   */
  static async processTTS(text, language = 'en') {
    try {
      // Placeholder for TTS
      // In production, integrate with Coqui TTS or Piper
      console.log(`🔊 Processing TTS for language: ${language}`);

      // Example: Call Coqui TTS API
      // const response = await axios.post('http://localhost:5000/tts', {
      //   text: text,
      //   language: language,
      //   speed: 1.0,
      // });

      return 'Generated audio response';
    } catch (error) {
      console.error('Error in TTS:', error);
      throw error;
    }
  }

  /**
   * Handle call conversation
   */
  static async handleConversation(callLogId, userText, userId = null) {
    try {
      const callLog = await CallLog.findById(callLogId);
      if (!callLog) throw new Error('Call log not found');

      // Add user message to transcript
      callLog.transcript.push({
        speaker: 'user',
        text: userText,
        timestamp: new Date(),
      });

      // Get AI response
      const aiResponse = await this.getAIResponse(userText, callLog.language);

      // Add AI response to transcript
      callLog.transcript.push({
        speaker: 'ai',
        text: aiResponse,
        timestamp: new Date(),
      });

      await callLog.save();

      return {
        response: aiResponse,
        transcript: callLog.transcript,
      };
    } catch (error) {
      console.error('Error handling conversation:', error);
      throw error;
    }
  }

  /**
   * Get AI response for call
   */
  static async getAIResponse(userMessage, language = 'en') {
    try {
      // Call AI service
      const AIChatService = require('./aiChatService');
      return await AIChatService.generateResponse(userMessage, 'student', language);
    } catch (error) {
      return "Sorry, I couldn't process your request. Please try again.";
    }
  }

  /**
   * End call
   */
  static async endCall(callLogId) {
    try {
      const callLog = await CallLog.findById(callLogId);
      if (!callLog) throw new Error('Call log not found');

      callLog.endTime = new Date();
      callLog.duration = Math.floor((callLog.endTime - callLog.startTime) / 1000);
      callLog.callStatus = 'completed';

      await callLog.save();

      console.log(`✅ Call ended: ${callLogId}, Duration: ${callLog.duration}s`);

      return callLog;
    } catch (error) {
      console.error('Error ending call:', error);
      throw error;
    }
  }

  /**
   * Escalate call to human support
   */
  static async escalateCall(callLogId, reason = '') {
    try {
      const callLog = await CallLog.findById(callLogId);
      if (!callLog) throw new Error('Call log not found');

      callLog.callStatus = 'escalated';
      callLog.escalatedTo = callingSystemConfig.escalation.supportTeamNumber;

      await callLog.save();

      console.log(`🔄 Call escalated: ${callLogId}`);

      return {
        success: true,
        message: 'Connecting you to support team...',
        supportNumber: callingSystemConfig.escalation.supportTeamNumber,
      };
    } catch (error) {
      console.error('Error escalating call:', error);
      throw error;
    }
  }

  /**
   * Get call history for user
   */
  static async getCallHistory(userId, limit = 10) {
    try {
      const calls = await CallLog.find({ userId })
        .sort({ createdAt: -1 })
        .limit(limit);

      return calls;
    } catch (error) {
      console.error('Error fetching call history:', error);
      throw error;
    }
  }
}

module.exports = SahayakService;
