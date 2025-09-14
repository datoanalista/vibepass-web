# API Configuration Setup

## Variables de Entorno

Para configurar la conexión con la API de eventos, necesitas crear un archivo `.env.local` en la raíz del proyecto:

### Archivo `.env.local`

```bash
# API Configuration
# Para desarrollo local (puerto 3001)
NEXT_PUBLIC_API_EVENTS_URL=http://localhost:3001/api/events
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# Para producción (ngrok)
# NEXT_PUBLIC_API_EVENTS_URL=https://e6ef5d8c3fd3.ngrok-free.app/api/events
# NEXT_PUBLIC_API_BASE_URL=https://e6ef5d8c3fd3.ngrok-free.app/api
```

## Configuración por Ambiente

### Desarrollo Local
- **Backend**: `http://localhost:3001`
- **Frontend**: `http://localhost:3000`
- **API Events**: `http://localhost:3001/api/events`
- **API Users**: `http://localhost:3001/api/usersweb`
- **API Login**: `http://localhost:3001/api/usersweb/login`

### Producción (GitHub Pages)
- **Backend**: ngrok URL
- **Frontend**: GitHub Pages
- **API Events**: `https://e6ef5d8c3fd3.ngrok-free.app/api/events`
- **API Users**: `https://e6ef5d8c3fd3.ngrok-free.app/api/usersweb`
- **API Login**: `https://e6ef5d8c3fd3.ngrok-free.app/api/usersweb/login`

## Cómo Cambiar entre Ambientes

1. **Para desarrollo local**: Usa `http://localhost:3001/api/events`
2. **Para producción**: Cambia a la URL de ngrok
3. **Reinicia el servidor** después de cambiar las variables

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
