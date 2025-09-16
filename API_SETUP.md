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

## Cómo Configurar en GitHub Pages

### OPCIÓN 1: Variable de Entorno (Recomendado)

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en la pestaña **"Secrets"** (NO "Variables")
4. Haz clic en **"New repository secret"**
5. Name: `NEXT_PUBLIC_API_BASE_URL`
6. Secret: `https://tu-nueva-ngrok-url.ngrok-free.app/api`
7. Haz clic en **"Add secret"**
8. Haz un nuevo deploy (push o manual)

### OPCIÓN 2: Archivo de Configuración (Respaldo)

Si la Opción 1 no funciona, usa esta alternativa:

1. Edita el archivo `src/config/production-api.ts`
2. Cambia la línea: `const URL_NGROK = "https://tu-nueva-ngrok-url.ngrok-free.app";`
3. Haz commit y push
4. El deploy automático usará esta configuración

### Verificar en GitHub Actions

Después del deploy, ve a **Actions** → último workflow → **build** → **Debug environment variables**
Deberías ver:
```
🔍 DEBUG: NEXT_PUBLIC_API_BASE_URL = https://tu-ngrok-url.ngrok-free.app/api
```

## Debug en Producción

Revisa la consola del navegador para ver:
- `🔧 [API Config] NEXT_PUBLIC_API_BASE_URL:` - Debe mostrar tu ngrok URL
- `🔧 [API Config] API_BASE_URL final:` - URL final que se usará
- `🔧 [API Config] Endpoints configurados:` - Todos los endpoints

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
