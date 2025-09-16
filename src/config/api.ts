// API Configuration
// Usar una sola variable de entorno para la base de la API

// DEBUG AGRESIVO - Mostrar TODAS las variables de entorno
console.log('🚨 [DEBUG] Todas las variables NEXT_PUBLIC_*:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')));
console.log('🚨 [DEBUG] process.env completo:', process.env);

// Alert para debugging en producción
if (typeof window !== 'undefined') {
  alert(`🚨 DEBUG ENV: NEXT_PUBLIC_API_BASE_URL = ${process.env.NEXT_PUBLIC_API_BASE_URL || 'UNDEFINED'}`);
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

console.log('🔧 [API Config] NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
console.log('🔧 [API Config] API_BASE_URL final:', API_BASE_URL);

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/events?limit=50`,
  HEALTH: `${API_BASE_URL}/health`,
  USERS_WEB: `${API_BASE_URL}/usersweb`,
  LOGIN: `${API_BASE_URL}/usersweb/login`,
} as const;

console.log('🔧 [API Config] Endpoints configurados:', API_ENDPOINTS);

export default API_BASE_URL;
