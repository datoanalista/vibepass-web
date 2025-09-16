# API Configuration Setup

## Variables de Entorno

Para configurar la conexión con la API de eventos, necesitas crear un archivo `.env.local` en la raíz del proyecto:

### Archivo `.env.local`

```bash
# API Configuration
# SOLO necesitas configurar esta variable:
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# Para producción (ngrok) - SOLO cambia esta línea:
# NEXT_PUBLIC_API_BASE_URL=https://tu-ngrok-url.ngrok-free.app/api
```

## Configuración por Ambiente

### Desarrollo Local
- **Backend**: `http://localhost:3001`
- **Frontend**: `http://localhost:3000`
- **Variable**: `NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api`

### Producción (GitHub Pages)
- **Backend**: ngrok URL (cambia cada reinicio)
- **Frontend**: GitHub Pages
- **Variable**: `NEXT_PUBLIC_API_BASE_URL=https://tu-ngrok-url.ngrok-free.app/api`

**IMPORTANTE**: Solo necesitas cambiar la variable `NEXT_PUBLIC_API_BASE_URL` en GitHub Secrets cuando cambie tu ngrok URL.

## Cómo Cambiar la URL de Ngrok

### Configuración Simplificada (Hardcodeada)

Cuando cambie tu URL de ngrok, solo necesitas:

1. Edita el archivo `src/config/api.ts`
2. Cambia la línea: `const NGROK_URL = 'https://tu-nueva-ngrok-url.ngrok-free.app';`
3. Haz commit y push
4. El deploy automático usará la nueva URL

### Ejemplo:
```typescript
// ⚠️ CAMBIAR SOLO ESTA URL CUANDO CAMBIE NGROK:
const NGROK_URL = 'https://5a5c56347372.ngrok-free.app';  // 👈 Cambiar aquí
```

## Verificación

### En Producción:
- En la consola: `🔧 [API Config] Modo: PRODUCCIÓN`
- Todas las rutas funcionan: `/eventos`, `/login`, `/crear-cuenta`, etc.

### En Desarrollo:
- En la consola: `🔧 [API Config] Modo: DESARROLLO`
- Usará automáticamente `http://localhost:3001/api`

## Rutas Estáticas Generadas

El proyecto genera automáticamente todas estas rutas para GitHub Pages:
- `/` - Página principal
- `/home` - Home
- `/eventos` - Lista de eventos
- `/login` - Iniciar sesión
- `/crear-cuenta` - Registro de usuarios (generada manualmente)
- `/evento-seleccionado` - Detalles del evento
- `/venta-entrada` - Compra de entradas
- `/venta-exitosa` - Confirmación de compra
- Y todas las páginas de admin

**Nota**: La página `/crear-cuenta` se genera manualmente en el workflow debido a limitaciones del static export con páginas client-side complejas.

## Debug

La página de eventos muestra información de debug:
- Estado de carga
- Errores de conexión
- Cantidad de eventos recibidos
- Botón para refetch manual

## Estructura de la API

La API debe devolver un array de eventos con la siguiente estructura:

```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  institution: string;
}
```
