/**
 * Frontend Utility Functions
 */

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const getDashboardType = (age) => {
  if (age >= 13 && age <= 17) return 'student';
  if (age >= 18) return 'adult';
  return 'unknown';
};

export const getAgeGroupLabel = (ageGroup) => {
  return ageGroup === '13-17' ? 'School (13-17)' : 'Professional (18+)';
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'green';
    case 'medium':
      return 'yellow';
    case 'hard':
      return 'red';
    default:
      return 'gray';
  }
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default {
  formatDate,
  formatCurrency,
  getDashboardType,
  getAgeGroupLabel,
  getDifficultyColor,
  getInitials,
};
