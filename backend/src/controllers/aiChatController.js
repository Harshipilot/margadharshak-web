const AIChatService = require('../services/aiChatService');
const SahayakService = require('../services/sahayakService');

/**
 * AI Chat Controller
 */
class AIChatController {
  /**
   * Send message to AI chat
   */
  static async sendMessage(req, res) {
    try {
      const { message, subject, userType = 'student' } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Generate AI response
      let response;

      if (userType === 'student' && subject) {
        // For homework help
        response = await AIChatService.processStudentHomework(message, subject, true);
      } else if (userType === 'adult') {
        response = await AIChatService.processCareerQuery(message);
      } else {
        response = await AIChatService.generateResponse(message, userType);
      }

      res.json({
        success: true,
        response: response,
      });
    } catch (error) {
      console.error('AI Chat error:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  }

  /**
   * Analyze skills based on questionnaire
   */
  static async analyzeSkills(req, res) {
    try {
      const { answers } = req.body;

      if (!answers) {
        return res.status(400).json({ error: 'Answers are required' });
      }

      const recommendations = await AIChatService.analyzeSkills(answers);

      res.json({
        success: true,
        recommendations: recommendations,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Check offline AI availability
   */
  static async checkOfflineAvailability(req, res) {
    try {
      const status = await AIChatService.checkOfflineAvailability();

      res.json({
        success: true,
        status: status,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Translate text
   */
  static async translateText(req, res) {
    try {
      const { text, targetLanguage = 'en' } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }

      const translation = await AIChatService.translateText(text, targetLanguage);

      res.json({
        success: true,
        translation: translation,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AIChatController;
