import React from 'react';
import { useRouter } from 'next/navigation';
import { getImagePath } from '@/utils/getImagePath';
import styles from './UpcomingEvents.module.css';

interface Event {
  _id: string;
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
}

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const router = useRouter();

  const handleEventClick = (eventId: string) => {
    router.push(`/evento-seleccionado?eventoId=${eventId}`);
  };

  const formatDate = (fechaEvento: string) => {
    const [year, month, day] = fechaEvento.split('-').map(Number);
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    return {
      day: day.toString(),
      month: months[month - 1]
    };
  };

  const formatTime = (horaInicio: string, horaTermino: string) => {
    return `${horaInicio} - ${horaTermino}`;
  };

  const calculateAvailableTickets = (entradas: Event['entradas']) => {
    if (!entradas || entradas.length === 0) return 0;
    
    // Sumar todos los cupos disponibles menos las entradas vendidas
    const totalAvailable = entradas.reduce((total, entrada) => {
      if (entrada.activa) {
        return total + (entrada.cuposDisponibles - entrada.entradasVendidas);
      }
      return total;
    }, 0);
    
    return totalAvailable;
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  if (events.length === 0) {
    return null;
  }

  return (
    <section className={styles.upcomingEvents}>
      <h2 className={styles.sectionTitle}>Próximos eventos</h2>
      <div className={styles.separator}></div>
      
      <div className={styles.eventsGrid}>
        {events.map((event, index) => {
          const { day, month } = formatDate(event.informacionGeneral.fechaEvento);
          const timeRange = formatTime(event.informacionGeneral.horaInicio, event.informacionGeneral.horaTermino);
          const availableTickets = calculateAvailableTickets(event.entradas);
          
          // Debug: verificar la estructura del evento
          console.log('🔍 Event data:', event);
          console.log('🆔 Event ID (_id):', event._id);
          console.log('🆔 Event ID (id):', event.id);
          console.log('🔑 All event keys:', Object.keys(event));
          
          // Buscar cualquier campo que contenga 'id'
          const idFields = Object.keys(event).filter(key => key.toLowerCase().includes('id'));
          console.log('🔍 Fields containing "id":', idFields);
          
          return (
            <div 
              key={index} 
              className={styles.eventCard}
              onClick={() => {
                // Intentar diferentes campos de ID
                const eventId = event._id || event.id || `event-${index}`;
                console.log('🖱️ Clicking event with ID:', eventId);
                console.log('🖱️ Event object:', event);
                handleEventClick(eventId);
              }}
            >
              {/* Cantidad de tickets */}
              <div className={styles.ticketsInfo}>
                <span className={styles.ticketsText}>{formatNumber(availableTickets)} tickets disponibles</span>
                <div className={styles.ticketsBar}></div>
              </div>
              
              {/* Imagen del evento */}
              <div className={styles.eventImageContainer}>
                <img
                  src={event.informacionGeneral.bannerPromocional}
                  alt={event.informacionGeneral.nombreEvento}
                  className={styles.eventImage}
                />
              </div>
              
              {/* Información del evento */}
              <div className={styles.eventInfo}>
                {/* Barra de fecha */}
                <div className={styles.dateBox}>
                  <div className={styles.dateNumber}>{day}</div>
                  <div className={styles.dateMonth}>{month}</div>
                  <img 
                    src={getImagePath("/images/fecha_icon.png")} 
                    alt="Fecha" 
                    className={styles.dateIcon}
                  />
                </div>
                
                {/* Barra de información */}
                <div className={styles.infoBox}>
                  <div className={styles.locationInfo}>
                    <img 
                      src={getImagePath("/images/ubicacion_card.png")} 
                      alt="Ubicación" 
                      className={styles.locationIcon}
                    />
                    <span className={styles.locationText}>{event.informacionGeneral.lugarEvento}</span>
                  </div>
                  
                  <div className={styles.eventName}>{event.informacionGeneral.nombreEvento}</div>
                  
                  <div className={styles.eventTime}>{timeRange}</div>
                  
                  <button className={styles.buyButton}>
                    <span className={styles.buttonText}>Comprar ticket</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UpcomingEvents;
