// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_EVENTS_URL || 'http://localhost:3001/api/events';
const API_USERS_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}?limit=50`,
  HEALTH: process.env.NEXT_PUBLIC_API_EVENTS_URL?.replace('/events', '/health') || 'http://localhost:3001/api/health',
  USERS_WEB: `${API_USERS_URL}/usersweb`,
  LOGIN: `${API_USERS_URL}/usersweb/login`,
} as const;

export default API_BASE_URL;
