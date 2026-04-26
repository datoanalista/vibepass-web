// API Configuration
// Produccion por defecto en mismo origen (ej. http://IP/api)
const isProduction = process.env.NODE_ENV === 'production';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (isProduction ? '/api' : 'http://localhost:3001/api');

console.log('🔧 [API Config] Modo:', isProduction ? 'PRODUCCIÓN' : 'DESARROLLO');
console.log('🔧 [API Config] API_BASE_URL:', API_BASE_URL);

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/events?limit=50`,
  EVENTS_BASE: `${API_BASE_URL}/events`,
  HEALTH: `${API_BASE_URL}/health`,
  SALES: `${API_BASE_URL}/sales`,
  SALES_BY_USER: (email: string) => `${API_BASE_URL}/sales/user/${encodeURIComponent(email)}`,
  ADD_PRODUCTS_TO_SALE: (saleNumber: string) => `${API_BASE_URL}/sales/${encodeURIComponent(saleNumber)}/add-products`,
  FLOW_CREATE: `${API_BASE_URL}/payments/flow/create`,
  FLOW_CONFIRM: `${API_BASE_URL}/payments/flow/confirm`,
  USERS_WEB: `${API_BASE_URL}/usersweb`,
  LOGIN: `${API_BASE_URL}/usersweb/login`,
} as const;

console.log('🔧 [API Config] Endpoints configurados:', API_ENDPOINTS);

export default API_BASE_URL;
