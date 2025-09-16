// API Configuration
import { PRODUCTION_API_CONFIG } from './production-api';

// DEBUG AGRESIVO - Mostrar TODAS las variables de entorno
console.log('🚨 [DEBUG] Todas las variables NEXT_PUBLIC_*:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')));
console.log('🚨 [DEBUG] process.env completo:', process.env);

// Determinar si estamos en producción
const isProduction = process.env.NODE_ENV === 'production';
const envApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Lógica de fallback
let API_BASE_URL: string;
let configSource: string;

if (envApiUrl) {
  // Si hay variable de entorno, usarla
  API_BASE_URL = envApiUrl;
  configSource = 'Environment Variable';
} else if (isProduction) {
  // Si estamos en producción pero no hay variable, usar configuración de respaldo
  API_BASE_URL = PRODUCTION_API_CONFIG.BASE_URL;
  configSource = 'Production Config File';
} else {
  // Desarrollo local
  API_BASE_URL = 'http://localhost:3001/api';
  configSource = 'Local Development';
}

// Alert para debugging en producción
if (typeof window !== 'undefined') {
  alert(`🚨 DEBUG: 
Source: ${configSource}
ENV VAR: ${envApiUrl || 'UNDEFINED'}
Final URL: ${API_BASE_URL}`);
}

console.log('🔧 [API Config] Source:', configSource);
console.log('🔧 [API Config] NEXT_PUBLIC_API_BASE_URL:', envApiUrl);
console.log('🔧 [API Config] API_BASE_URL final:', API_BASE_URL);

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/events?limit=50`,
  HEALTH: `${API_BASE_URL}/health`,
  USERS_WEB: `${API_BASE_URL}/usersweb`,
  LOGIN: `${API_BASE_URL}/usersweb/login`,
} as const;

console.log('🔧 [API Config] Endpoints configurados:', API_ENDPOINTS);

export default API_BASE_URL;
