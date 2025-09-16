// Configuración de API para producción
// Este archivo se puede modificar directamente cuando cambie la URL de ngrok

// INSTRUCCIONES:
// 1. Cambia la URL_NGROK por tu nueva URL de ngrok
// 2. Haz commit y push
// 3. El deploy automático usará esta configuración

const URL_NGROK = "https://e6ef5d8c3fd3.ngrok-free.app"; // 👈 CAMBIA ESTA URL

export const PRODUCTION_API_CONFIG = {
  BASE_URL: `${URL_NGROK}/api`,
  EVENTS: `${URL_NGROK}/api/events?limit=50`,
  HEALTH: `${URL_NGROK}/api/health`,
  USERS_WEB: `${URL_NGROK}/api/usersweb`,
  LOGIN: `${URL_NGROK}/api/usersweb/login`,
};

console.log('🔧 [Production Config] Configuración cargada:', PRODUCTION_API_CONFIG);
