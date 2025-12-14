// API Configuration
// 🚀 CONFIGURACIÓN HARDCODEADA PARA ACCESO PÚBLICO

// ⚠️ CAMBIAR SOLO ESTA URL CUANDO CAMBIE NGROK:
const NGROK_URL = 'https://b108ac6afb18.ngrok-free.app';

// Determinar si estamos en producción
const isProduction = process.env.NODE_ENV === 'production';

// Configuración simplificada
const API_BASE_URL = isProduction 
  ? `${NGROK_URL}/api`  // Producción: usar ngrok
  : 'http://localhost:3001/api';  // Desarrollo: usar localhost

console.log('🔧 [API Config] Modo:', isProduction ? 'PRODUCCIÓN' : 'DESARROLLO');
console.log('🔧 [API Config] API_BASE_URL:', API_BASE_URL);

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/events?limit=50`,
  EVENTS_BASE: `${API_BASE_URL}/events`,
  HEALTH: `${API_BASE_URL}/health`,
  SALES: `${API_BASE_URL}/sales`,
  SALES_BY_USER: (email: string) => `${API_BASE_URL}/sales/user/${encodeURIComponent(email)}`,
  ADD_PRODUCTS_TO_SALE: (saleNumber: string) => `${API_BASE_URL}/sales/${encodeURIComponent(saleNumber)}/add-products`,
  USERS_WEB: `${API_BASE_URL}/usersweb`,
  LOGIN: `${API_BASE_URL}/usersweb/login`,
} as const;

console.log('🔧 [API Config] Endpoints configurados:', API_ENDPOINTS);

export default API_BASE_URL;

