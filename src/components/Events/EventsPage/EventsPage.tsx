import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './EventsPage.module.css';
import { getImagePath } from '@/utils/getImagePath';

const EventsPage: React.FC = () => {
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
        <div className={styles.constructionIcon}>🚧</div>
      </div>
    </main>
  );
};

export default EventsPage;
