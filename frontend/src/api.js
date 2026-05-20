import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

// ================= AUTH =================
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// ================= PROFILE =================
export const getProfile = (id) => api.get(`/profile/${id}`);
export const updateProfile = (id, data) => api.post(`/profile/${id}`, data);

// ================= CAREER =================
export const getRoadmap = () => api.get('/career/roadmap');

// ================= OPPORTUNITIES =================
export const getCompetitions = () => api.get('/competitions');
export const getInternships = () => api.get('/internships');
export const getOpportunities = () => api.get('/opportunities');

// ================= FEATURES =================
export const getSchoolFeatures = () => api.get('/school/features');
export const getCollegeFeatures = () => api.get('/college/features');

// ================= RESOURCES BY INTEREST =================
export const getResources = (interest) => api.post('/resources', { interest });

export default api;
