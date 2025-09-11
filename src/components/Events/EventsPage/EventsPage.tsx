import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEventsContext } from '@/contexts/EventsContext';
import EventsCarousel from '../EventsCarousel/EventsCarousel';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import styles from './EventsPage.module.css';
import { getImagePath } from '@/utils/getImagePath';

const EventsPage: React.FC = () => {
  const { events, loading, error, refetch } = useEventsContext();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const router = useRouter();

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
    console.log('🎪 Events loaded:', events);
    console.log('⏳ Loading state:', loading);
    console.log('❌ Error state:', error);
  }, [events, loading, error]);

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
              {events.length > 0 ? (
                <>
                  {events.slice(0, 15).map((event: any) => (
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
                          {new Date(event.informacionGeneral?.fechaEvento).toLocaleDateString('es-CL')} - {event.informacionGeneral?.lugarEvento}
                        </p>
                      </div>
                    </div>
                  ))}
                  {events.length > 15 && (
                    <div className={styles.dropdownFooter}>
                      Mostrando 15 de {events.length} eventos
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
      {events.length > 0 && (
        <div className={styles.carouselSection}>
          <EventsCarousel events={events} />
        </div>
      )}

      {/* Próximos eventos */}
      {events.length > 0 && (
        <UpcomingEvents events={events} />
      )}

    </main>
  );
};

export default EventsPage;
