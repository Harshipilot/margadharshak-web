/**
 * Asterisk & Calling System Configuration
 * Placeholders for Twilio/SIP integration
 */

const callingSystemConfig = {
  // Provider options: 'twilio', 'sip', 'asterisk'
  provider: process.env.CALLING_PROVIDER || 'asterisk',

  // Twilio Configuration (when provider = 'twilio')
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    webhookUrl: process.env.TWILIO_WEBHOOK_URL || '',
  },

  // SIP Configuration (when provider = 'sip')
  sip: {
    server: process.env.SIP_SERVER || 'localhost',
    port: parseInt(process.env.SIP_PORT || '5060'),
    username: process.env.SIP_USERNAME || '',
    password: process.env.SIP_PASSWORD || '',
    domain: process.env.SIP_DOMAIN || '',
  },

  // Asterisk Configuration (when provider = 'asterisk')
  asterisk: {
    host: process.env.ASTERISK_HOST || 'localhost',
    port: parseInt(process.env.ASTERISK_PORT || '5038'),
    username: process.env.ASTERISK_USERNAME || 'admin',
    password: process.env.ASTERISK_PASSWORD || 'password',
    amiPort: parseInt(process.env.AMI_PORT || '5038'),
    extension: process.env.ASTERISK_EXTENSION || '1000',
  },

  // Call Configuration
  call: {
    ringTimeout: parseInt(process.env.CALL_RING_TIMEOUT || '30'), // seconds
    maxDuration: parseInt(process.env.CALL_MAX_DURATION || '3600'), // seconds (1 hour)
    recordCalls: process.env.RECORD_CALLS === 'true',
    enableTranscription: process.env.ENABLE_TRANSCRIPTION === 'true',
  },

  // Escalation settings
  escalation: {
    enableHumanTransfer: process.env.ENABLE_HUMAN_TRANSFER === 'true',
    supportTeamNumber: process.env.SUPPORT_TEAM_NUMBER || '',
    escalationThreshold: parseInt(process.env.ESCALATION_THRESHOLD || '3'),
  },

  // IVR Menu
  ivrMenu: {
    language: 'en', // Default language
    retries: parseInt(process.env.IVR_RETRIES || '3'),
  },
};

module.exports = callingSystemConfig;
