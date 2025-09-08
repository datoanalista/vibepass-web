import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEvents } from '@/hooks/useEvents';
import EventsCarousel from '../EventsCarousel/EventsCarousel';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import styles from './EventsPage.module.css';
import { getImagePath } from '@/utils/getImagePath';

const EventsPage: React.FC = () => {
  const { events, loading, error, refetch } = useEvents();

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
          <div className={styles.dropdown}>
            <span className={styles.dropdownText}>Institución</span>
            <span className={styles.dropdownArrow}>▼</span>
          </div>
          <div className={styles.dropdown}>
            <span className={styles.dropdownText}>Lugar</span>
            <span className={styles.dropdownArrow}>▼</span>
          </div>
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
