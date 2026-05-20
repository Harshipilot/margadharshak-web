const offlineAIConfig = require('../config/offlineAI');
const axios = require('axios');

/**
 * AI Chat Service
 * Handles interactions with Ollama, local LLMs, and offline AI
 */
class AIChatService {
  /**
   * Generate response using local LLM (Ollama)
   */
  static async generateResponse(userMessage, userType = 'student', language = 'en') {
    try {
      const config = offlineAIConfig;
      const systemPrompt = config.systemPrompts[userType] || config.systemPrompts.student;

      // Call Ollama API
      const response = await axios.post(`${config.llm.baseUrl}/api/generate`, {
        model: config.llm.model,
        prompt: `${systemPrompt}\n\nUser (${language}): ${userMessage}`,
        stream: false,
        temperature: config.llm.temperature,
        num_predict: config.llm.maxTokens,
      });

      return response.data.response;
    } catch (error) {
      console.error('Error generating response:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  /**
   * Process student homework query
   */
  static async processStudentHomework(question, subject, hints = true) {
    try {
      let prompt = `You are a helpful tutor for Indian students. A student asks:
      Subject: ${subject}
      Question: ${question}`;

      if (hints) {
        prompt += `\n\nProvide helpful HINTS instead of direct answers. Break down the concept into steps.
        Use everyday examples from rural India when possible.`;
      }

      return await this.generateResponse(prompt, 'student');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Process adult career query
   */
  static async processCareerQuery(question) {
    try {
      return await this.generateResponse(question, 'adult');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Process skill discovery questionnaire
   */
  static async analyzeSkills(answers) {
    try {
      const prompt = `Based on these interest answers, recommend career paths and skills to develop:
      ${JSON.stringify(answers)}
      
      Provide personalized recommendations for learning resources, courses, and career paths.`;

      return await this.generateResponse(prompt, 'student');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Translate text between supported languages
   */
  static async translateText(text, targetLanguage = 'en') {
    try {
      const languageMap = {
        en: 'English',
        hi: 'Hindi',
        ka: 'Kannada',
      };

      const prompt = `Translate the following text to ${languageMap[targetLanguage]}:
      "${text}"
      
      Provide only the translation, nothing else.`;

      return await this.generateResponse(prompt);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if offline LLM is available
   */
  static async checkOfflineAvailability() {
    try {
      const config = offlineAIConfig;
      const response = await axios.get(`${config.llm.baseUrl}/api/tags`, {
        timeout: 5000,
      });

      return {
        available: true,
        models: response.data.models || [],
        engine: config.llm.engine,
      };
    } catch (error) {
      return {
        available: false,
        error: 'Offline AI engine not available',
      };
    }
  }
}

module.exports = AIChatService;
