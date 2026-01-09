import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services API
export const fetchServices = () => api.get('/services');
export const fetchServiceById = (id: string) => api.get(`/services/${id}`);

// Insights/Blog API
export const fetchInsights = () => api.get('/insights');
export const fetchInsightById = (id: string) => api.get(`/insights/${id}`);
export const fetchInsightsByCategory = (category: string) => 
  api.get(`/insights/category/${category}`);

// Case Studies API
export const fetchCaseStudies = () => api.get('/case-studies');
export const fetchCaseStudyById = (id: string) => api.get(`/case-studies/${id}`);

// Portfolio API
export const fetchPortfolio = () => api.get('/portfolio');
export const fetchPortfolioItemById = (id: string) => api.get(`/portfolio/${id}`);

// Team API
export const fetchTeamMembers = () => api.get('/team');
export const fetchTeamMemberById = (id: string) => api.get(`/team/${id}`);

// Contact API
export const submitContactForm = (data: any) => api.post('/contact', data);

// CMS Content API
export const fetchContent = (contentType: string) => 
  api.get(`/cms/content/${contentType}`);

export default api;
