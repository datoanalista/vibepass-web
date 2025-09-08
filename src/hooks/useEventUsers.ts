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

export const useEventUsers = (eventoId: string | null) => {
  const [users, setUsers] = useState<User[]>([]);
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔍 useEventUsers - eventoId:', eventoId);
    
    if (!eventoId) {
      console.log('❌ No eventoId provided');
      setUsers([]);
      setEvent(null);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        // Usar la misma lógica que useEvents para determinar la URL base
        const eventsUrl = process.env.NEXT_PUBLIC_API_EVENTS_URL || 'http://localhost:3001/api/events';
        const apiUrl = eventsUrl.replace('/api/events', '');
        
        console.log('🌍 Fetching users from:', `${apiUrl}/api/users?eventoId=${eventoId}`);
        
        const response = await fetch(`${apiUrl}/api/users?eventoId=${eventoId}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        if (data.status === 'success') {
          setUsers(data.data.users);
          setEvent(data.data.event);
        } else {
          throw new Error(data.message || 'Error al obtener usuarios');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [eventoId]);

  return { users, event, loading, error };
};
