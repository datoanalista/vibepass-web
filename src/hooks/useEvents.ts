import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/config/api';

interface Event {
  id: string;
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
      
      
      // Filtrar eventos con estado "programado" o "en_curso" Y fecha futura
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Establecer a medianoche para comparación de fechas
      
      const activeEvents = allEvents.filter((event: Event) => {
        const isActiveStatus = event.informacionGeneral?.estado === 'programado' || 
                              event.informacionGeneral?.estado === 'en_curso';
        
        // Verificar si la fecha del evento es hoy o futura
        const eventDate = new Date(event.informacionGeneral?.fechaEvento);
        eventDate.setHours(0, 0, 0, 0);
        const isFutureOrToday = eventDate >= today;
        
        console.log(`📅 Event: ${event.informacionGeneral?.nombreEvento}, Date: ${event.informacionGeneral?.fechaEvento}, Status: ${event.informacionGeneral?.estado}, Future: ${isFutureOrToday}`);
        
        return isActiveStatus && isFutureOrToday;
      });
      console.log('🎯 Active and future events:', activeEvents);
      
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
