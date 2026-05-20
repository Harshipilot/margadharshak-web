/**
 * Utility functions
 */

/**
 * Age-based dashboard type
 */
function getDashboardType(age) {
  if (age >= 13 && age <= 17) {
    return 'student';
  } else if (age >= 18) {
    return 'adult';
  }
  return 'unknown';
}

/**
 * Calculate XP for challenge completion
 */
function calculateXP(difficulty, timeSpent) {
  const baseXP = {
    easy: 10,
    medium: 25,
    hard: 50,
  };

  const xp = baseXP[difficulty] || 10;
  const timeBonus = Math.max(0, 30 - timeSpent) / 6; // Bonus for quick completion
  return Math.floor(xp + timeBonus);
}

/**
 * Calculate level from XP
 */
function calculateLevel(totalXP) {
  return Math.floor(totalXP / 100) + 1;
}

/**
 * Format duration
 */
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

/**
 * Validate email
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate phone number (Indian format)
 */
function isValidIndianPhoneNumber(phone) {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone.replace(/\D/g, ''));
}

/**
 * Generate random challenge code
 */
function generateChallengeCode() {
  return 'CH_' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

/**
 * Sanitize user input
 */
function sanitizeInput(input) {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 500);
}

module.exports = {
  getDashboardType,
  calculateXP,
  calculateLevel,
  formatDuration,
  isValidEmail,
  isValidIndianPhoneNumber,
  generateChallengeCode,
  sanitizeInput,
};
