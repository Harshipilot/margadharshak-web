import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Auth API
 */
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

/**
 * Challenge API
 */
export const challengeAPI = {
  getChallenges: (params) => api.get('/challenges', { params }),
  getChallengeById: (id) => api.get(`/challenges/${id}`),
  createChallenge: (data) => api.post('/challenges', data),
  submitChallenge: (id, data) => api.post(`/challenges/${id}/submit`, data),
  bookmarkChallenge: (id) => api.post(`/challenges/${id}/bookmark`),
};

/**
 * Opportunities API
 */
export const opportunitiesAPI = {
  getInternships: (params) => api.get('/opportunities/internships', { params }),
  getJobs: (params) => api.get('/opportunities/jobs', { params }),
  getHackathons: (params) => api.get('/opportunities/hackathons', { params }),
  getScholarships: (params) => api.get('/opportunities/scholarships', { params }),
  getStats: () => api.get('/opportunities/stats'),
};

/**
 * AI Chat API
 */
export const aiAPI = {
  sendMessage: (data) => api.post('/ai/message', data),
  analyzeSkills: (data) => api.post('/ai/analyze-skills', data),
  translateText: (data) => api.post('/ai/translate', data),
  checkOfflineStatus: () => api.get('/ai/offline-status'),
};

/**
 * Sahayak (Calling) API
 */
export const sahayakAPI = {
  initiateCall: (data) => api.post('/sahayak/incoming', data),
  processVoice: (data) => api.post('/sahayak/process-voice', data),
  endCall: (data) => api.post('/sahayak/end-call', data),
  escalateCall: (data) => api.post('/sahayak/escalate', data),
  getCallHistory: (params) => api.get('/sahayak/call-history', { params }),
  getCallDetails: (id) => api.get(`/sahayak/call-details/${id}`),
};

/**
 * Admin API
 */
export const adminAPI = {
  getSettings: () => api.get('/admin/settings'),
  updateSetting: (key, data) => api.put(`/admin/settings/${key}`, data),
  getStats: () => api.get('/admin/stats'),
};

export default api;
