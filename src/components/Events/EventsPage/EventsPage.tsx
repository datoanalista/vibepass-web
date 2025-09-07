import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEvents } from '@/hooks/useEvents';
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
      {/* Navegación breadcrumb */}
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

      {/* Filtros dropdown */}
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

      {/* Título principal */}
      <h1 className={styles.mainTitle}>VER EVENTOS</h1>

      {/* Banner en construcción */}
      <div className={styles.constructionBanner}>
        <h2 className={styles.constructionTitle}>Página en Construcción</h2>
        <p className={styles.constructionText}>
          Estamos trabajando en la funcionalidad de eventos. Pronto podrás ver todos los eventos disponibles.
        </p>
        
        {/* Debug Info */}
        <div className={styles.debugInfo}>
          <h3>🔍 Debug Info:</h3>
          <p><strong>Loading:</strong> {loading ? '⏳ Sí' : '✅ No'}</p>
          <p><strong>Error:</strong> {error ? `❌ ${error}` : '✅ Ninguno'}</p>
          <p><strong>Events Count:</strong> {events.length}</p>
          {events.length > 0 && (
            <div className={styles.eventsPreview}>
              <h4>📋 First Event Preview:</h4>
              <p><strong>Name:</strong> {events[0].informacionGeneral.nombreEvento}</p>
              <p><strong>Date:</strong> {events[0].informacionGeneral.fechaEvento}</p>
              <p><strong>Location:</strong> {events[0].informacionGeneral.lugarEvento}</p>
            </div>
          )}
          <button onClick={refetch} className={styles.refetchButton}>
            🔄 Refetch Events
          </button>
        </div>
        
        <div className={styles.constructionIcon}>🚧</div>
      </div>
    </main>
  );
};

export default EventsPage;
