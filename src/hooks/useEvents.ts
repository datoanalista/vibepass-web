import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/config/api';

interface Event {
  informacionGeneral: {
    nombreEvento: string;
    descripcion: string;
    fechaEvento: string;
    horaInicio: string;
    horaTermino: string;
    lugarEvento: string;
    bannerPromocional: string;
    fechaCreacion: string;
    estado: string;
  };
  entradas: Array<{
    cuposDisponibles: number;
    entradasVendidas: number;
    tipoEntrada: string;
    precio: number;
    activa: boolean;
  }>;
  // Agregar más campos según la respuesta de la API
}

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useEvents = (): UseEventsReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🌍 Fetching events from:', API_ENDPOINTS.EVENTS);
      
      const response = await fetch(API_ENDPOINTS.EVENTS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Agregar headers de ngrok si es necesario
          ...(API_ENDPOINTS.EVENTS.includes('ngrok') && {
            'ngrok-skip-browser-warning': 'true',
          }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('🎪 Events API Response:', data);
      
      // La API devuelve { status, message, data: { events: [...] } }
      const allEvents = data?.data?.events || data?.events || (Array.isArray(data) ? data : []);
      console.log('📋 All events from API:', allEvents);
      
      // Filtrar eventos con estado "programado" o "en_curso"
      const activeEvents = allEvents.filter((event: Event) => 
        event.informacionGeneral?.estado === 'programado' || 
        event.informacionGeneral?.estado === 'en_curso'
      );
      console.log('🎯 Active events (programado/en_curso):', activeEvents);
      
      setEvents(activeEvents);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ Error fetching events:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
  };
};
