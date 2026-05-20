/**
 * Offline AI Configuration
 * Supports Ollama, TinyLlama, Whisper, Coqui TTS
 */

const offlineAIConfig = {
  // LLM Configuration
  llm: {
    engine: process.env.LLM_ENGINE || 'ollama', // 'ollama', 'transformers', 'local'
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    model: process.env.LLM_MODEL || 'tinyllama', // tinyllama, mistral, neural-chat
    temperature: parseFloat(process.env.LLM_TEMPERATURE || '0.7'),
    maxTokens: parseInt(process.env.LLM_MAX_TOKENS || '512'),
  },

  // Speech-to-Text Configuration
  stt: {
    engine: process.env.STT_ENGINE || 'whisper', // 'whisper', 'vosk'
    model: process.env.STT_MODEL || 'base', // tiny, base, small, medium, large
    language: process.env.STT_LANGUAGE || 'en',
    device: process.env.STT_DEVICE || 'cpu', // 'cpu', 'cuda'
  },

  // Text-to-Speech Configuration
  tts: {
    engine: process.env.TTS_ENGINE || 'coqui', // 'coqui', 'piper', 'glow-tts'
    voice: process.env.TTS_VOICE || 'en_US-amy-medium',
    speaker: process.env.TTS_SPEAKER || 'default',
    speed: parseFloat(process.env.TTS_SPEED || '1.0'),
  },

  // Languages supported
  languages: {
    en: { name: 'English', code: 'en' },
    hi: { name: 'Hindi', code: 'hi' },
    ka: { name: 'Kannada', code: 'ka' },
  },

  // System prompts
  systemPrompts: {
    student: `You are Sahayak, a helpful AI tutor designed specifically for rural Indian students aged 13-17. 
              Your goal is to help students learn by:
              - Providing hints instead of direct answers
              - Using simple, clear language
              - Relating concepts to everyday examples from rural India
              - Being encouraging and patient
              - Always promoting learning over memorization`,

    adult: `You are Sahayak, a helpful career and opportunity advisor for adults aged 18+.
            Your goal is to help with:
            - Career guidance and job opportunities
            - Skill development and learning resources
            - Interview preparation
            - Resume building
            - Using simple, practical language`,
  },
};

module.exports = offlineAIConfig;
