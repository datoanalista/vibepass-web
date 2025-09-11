import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_ENDPOINTS } from '@/config/api';
import { EventContextType } from '@/types/events';

interface EventsContextType {
  events: EventContextType[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<EventContextType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🌍 [EventsContext] Fetching events from:', API_ENDPOINTS.EVENTS);
      
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
      console.log('🎪 [EventsContext] Events API Response:', data);
      
      // La API devuelve { status, message, data: { events: [...] } }
      const allEvents = data?.data?.events || data?.events || (Array.isArray(data) ? data : []);
      console.log('📋 [EventsContext] All events from API:', allEvents);
      
      // Filtrar eventos con estado "programado" o "en_curso" Y fecha futura
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Establecer a medianoche para comparación de fechas
      
      const activeEvents = allEvents.filter((event: EventContextType) => {
        const isActiveStatus = event.informacionGeneral?.estado === 'programado' || 
                              event.informacionGeneral?.estado === 'en_curso';
        
        // Verificar si la fecha del evento es hoy o futura
        const eventDate = new Date(event.informacionGeneral?.fechaEvento || '');
        eventDate.setHours(0, 0, 0, 0);
        const isFutureOrToday = eventDate >= today;
        
        console.log(`📅 [EventsContext] Event: ${event.informacionGeneral?.nombreEvento}, Date: ${event.informacionGeneral?.fechaEvento}, Status: ${event.informacionGeneral?.estado}, Future: ${isFutureOrToday}`);
        
        return isActiveStatus && isFutureOrToday;
      });
      
      console.log('🎯 [EventsContext] Active and future events:', activeEvents);
      
      setEvents(activeEvents);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ [EventsContext] Error fetching events:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const value: EventsContextType = {
    events,
    loading,
    error,
    refetch: fetchEvents,
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEventsContext = (): EventsContextType => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEventsContext must be used within an EventsProvider');
  }
  return context;
};
