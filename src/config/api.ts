// API Configuration
// 🚀 CONFIGURACIÓN HARDCODEADA PARA ACCESO PÚBLICO

// ⚠️ CAMBIAR SOLO ESTA URL CUANDO CAMBIE NGROK:
const NGROK_URL = 'https://5a5c56347372.ngrok-free.app';

// Determinar si estamos en producción
const isProduction = process.env.NODE_ENV === 'production';

// Configuración simplificada
const API_BASE_URL = isProduction 
  ? `${NGROK_URL}/api`  // Producción: usar ngrok
  : 'http://localhost:3001/api';  // Desarrollo: usar localhost

console.log('🔧 [API Config] Modo:', isProduction ? 'PRODUCCIÓN' : 'DESARROLLO');
console.log('🔧 [API Config] API_BASE_URL:', API_BASE_URL);

// Alert solo para confirmar en producción
if (typeof window !== 'undefined' && isProduction) {
  alert(`✅ PRODUCCIÓN: Usando ${API_BASE_URL}`);
}

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/events?limit=50`,
  HEALTH: `${API_BASE_URL}/health`,
  USERS_WEB: `${API_BASE_URL}/usersweb`,
  LOGIN: `${API_BASE_URL}/usersweb/login`,
} as const;

console.log('🔧 [API Config] Endpoints configurados:', API_ENDPOINTS);

export default API_BASE_URL;
