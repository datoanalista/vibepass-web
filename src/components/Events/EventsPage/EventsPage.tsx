import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEventsContext } from '@/contexts/EventsContext';
import { EventAPI, EventContextType } from '@/types/events';
import EventsCarousel from '../EventsCarousel/EventsCarousel';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import styles from './EventsPage.module.css';
import { getImagePath } from '@/utils/getImagePath';

const EventsPage: React.FC = () => {
  const { events, loading, error, refetch } = useEventsContext();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const router = useRouter();

  // Función para transformar eventos del contexto al formato esperado por los componentes
  const transformEvents = (contextEvents: EventContextType[]): EventAPI[] => {
    return contextEvents.filter(event => 
      event.informacionGeneral?.nombreEvento &&
      event.informacionGeneral?.descripcion &&
      event.informacionGeneral?.fechaEvento &&
      event.informacionGeneral?.horaInicio &&
      event.informacionGeneral?.horaTermino &&
      event.informacionGeneral?.lugarEvento &&
      event.informacionGeneral?.bannerPromocional &&
      event.informacionGeneral?.fechaCreacion &&
      event.informacionGeneral?.estado
    ).map(event => ({
      id: event.id,
      _id: event._id,
      informacionGeneral: {
        nombreEvento: event.informacionGeneral!.nombreEvento!,
        descripcion: event.informacionGeneral!.descripcion!,
        fechaEvento: event.informacionGeneral!.fechaEvento!,
        horaInicio: event.informacionGeneral!.horaInicio!,
        horaTermino: event.informacionGeneral!.horaTermino!,
        lugarEvento: event.informacionGeneral!.lugarEvento!,
        bannerPromocional: event.informacionGeneral!.bannerPromocional!,
        fechaCreacion: event.informacionGeneral!.fechaCreacion!,
        estado: event.informacionGeneral!.estado!,
      },
      entradas: event.entradas?.map(entrada => ({
        cuposDisponibles: entrada.cuposDisponibles || 0,
        entradasVendidas: entrada.entradasVendidas || 0,
        tipoEntrada: entrada.tipoEntrada || '',
        precio: entrada.precio || 0,
        activa: entrada.activa || false,
      })) || []
    }));
  };

  const transformedEvents = transformEvents(events);

  // Cerrar dropdown al hacer click fuera
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.filtersContainer')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Log para debugging
  React.useEffect(() => {
    console.log('🎪 Events loaded:', transformedEvents);
    console.log('⏳ Loading state:', loading);
    console.log('❌ Error state:', error);
  }, [transformedEvents, loading, error]);

  return (
    <main className={styles.eventsPage}>
      {/* Loading overlay */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner}></div>
            <h2 className={styles.loadingTitle}>Cargando eventos...</h2>
            <p className={styles.loadingText}>Obteniendo la mejor experiencia para ti</p>
          </div>
        </div>
      )}

      {/* Navegación breadcrumb y filtros en la misma fila */}
      <div className={styles.topRow}>
        <div className={styles.breadcrumb}>
          <Link href="/home" className={styles.breadcrumbItem}>
            HOME
          </Link>
          <img 
            src={getImagePath("/images/flecha_home.svg")} 
            alt=">" 
            className={styles.breadcrumbArrow}
          />
          <span className={styles.breadcrumbItem}>EVENTOS</span>
        </div>

        <div className={styles.filtersContainer}>
          <div className={styles.eventsDropdown} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className={styles.eventsDropdownText}>Ver más</span>
            <span className={styles.eventsDropdownArrow}>▼</span>
          </div>
          
          {/* Dropdown con lista de eventos */}
          {isDropdownOpen && (
            <div className={styles.eventsDropdownMenu}>
              {transformedEvents.length > 0 ? (
                <>
                  {transformedEvents.slice(0, 15).map((event: any) => (
                    <div
                      key={event.id || event._id}
                      className={styles.eventDropdownItem}
                      onClick={() => {
                        router.push(`/evento-seleccionado?eventoId=${event.id || event._id}`);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className={styles.eventDropdownInfo}>
                        <h4 className={styles.eventDropdownName}>{event.informacionGeneral?.nombreEvento}</h4>
                        <p className={styles.eventDropdownDetails}>
                          {event.informacionGeneral?.fechaEvento ? new Date(event.informacionGeneral.fechaEvento).toLocaleDateString('es-CL') : 'Fecha no disponible'} - {event.informacionGeneral?.lugarEvento || 'Lugar no disponible'}
                        </p>
                      </div>
                    </div>
                  ))}
                  {transformedEvents.length > 15 && (
                    <div className={styles.dropdownFooter}>
                      Mostrando 15 de {transformedEvents.length} eventos
                    </div>
                  )}
                </>
              ) : (
                <div className={styles.noEventsMessage}>
                  No hay eventos disponibles
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Carrusel de eventos */}
      {transformedEvents.length > 0 && (
        <div className={styles.carouselSection}>
          <EventsCarousel events={transformedEvents} />
        </div>
      )}

      {/* Próximos eventos */}
      {transformedEvents.length > 0 && (
        <UpcomingEvents events={transformedEvents} />
      )}

    </main>
  );
};

export default EventsPage;
