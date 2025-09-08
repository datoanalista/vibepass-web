import { useState, useEffect } from 'react';

interface User {
  _id: string;
  nombreCompleto: string;
  correoElectronico: string;
  rutOId: string;
  telefonoContacto: string;
  rol: string;
  eventoId: string;
  activo: boolean;
  emailVerificado: boolean;
  fechaUltimoAcceso: string | null;
  creadoPor: string | null;
  permisos: {
    crearEventos: boolean;
    gestionarUsuarios: boolean;
    verReportes: boolean;
    configurarSistema: boolean;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface EventData {
  id: string;
  name: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface Filters {
  eventoId: string;
  rol: string;
  activo: string;
  search: string | null;
}

interface ApiResponse {
  status: string;
  message: string;
  data: {
    users: User[];
    event: EventData;
    pagination: Pagination;
    filters: Filters;
  };
}

export const useEventDetails = (eventoId: string | null) => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventoId) {
      setEvent(null);
      return;
    }

    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Usar la misma lógica que useEvents para determinar la URL base
        const eventsUrl = process.env.NEXT_PUBLIC_API_EVENTS_URL || 'http://localhost:3001/api/events';
        const apiUrl = eventsUrl.replace('/api/events', '');
        
        const response = await fetch(`${apiUrl}/api/events/${eventoId}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('🎪 Event Details API Response:', data);
        
        // La API devuelve { status, message, data: { event: {...} } }
        if (data.status === 'success' && data.data?.event) {
          setEvent(data.data.event);
        } else {
          throw new Error(data.message || 'Error al obtener el evento');
        }
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventoId]);

  return { event, loading, error };
};
