import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEventDetails } from '@/hooks/useEventDetails';
import { getImagePath } from '@/utils/getImagePath';
import styles from './EventoSeleccionadoPage.module.css';

const EventoSeleccionadoPage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventoId = searchParams.get('eventoId');
  const { event, loading, error } = useEventDetails(eventoId);
  return (
    <main className={styles.eventoSeleccionadoPage}>
      {/* Navegación breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/eventos" className={styles.breadcrumbLink}>
          <img 
            src={getImagePath("/images/flecha_home.svg")} 
            alt="<" 
            className={styles.breadcrumbArrow}
          />
          Regresar a todos los eventos
        </Link>
      </div>

      {/* Banner en construcción bonito */}
      <div className={styles.constructionBanner}>
        <div className={styles.constructionContent}>
          <div className={styles.constructionIcon}>🚧</div>
          <h1 className={styles.constructionTitle}>Página en Construcción</h1>
          <p className={styles.constructionText}>
            Estamos trabajando en los detalles del evento. Pronto podrás ver toda la información, 
            comprar tickets y disfrutar de la mejor experiencia.
          </p>

          {/* Vista del evento */}
          {eventoId && loading && (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>Cargando evento...</p>
            </div>
          )}
          
          {eventoId && error && (
            <div className={styles.errorContainer}>
              <p><strong>❌ Error:</strong> {error}</p>
            </div>
          )}
          
          {eventoId && event && (
            <div className={styles.eventView}>
              {/* Imagen del evento */}
              <div className={styles.eventImageContainer}>
                <img
                  src={event.informacionGeneral?.bannerPromocional || event.imagenPrincipal}
                  alt={event.informacionGeneral?.nombreEvento || 'Evento'}
                  className={styles.eventImage}
                />
              </div>
              
              {/* Descripción del evento */}
              <div className={styles.eventDescription}>
                <p className={styles.descriptionText}>
                  {event.informacionGeneral?.descripcion || 'Descripción no disponible'}
                </p>
              </div>
            </div>
          )}

          <div className={styles.constructionFeatures}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎫</span>
              <span className={styles.featureText}>Compra de tickets</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📅</span>
              <span className={styles.featureText}>Información detallada</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📍</span>
              <span className={styles.featureText}>Ubicación y mapas</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💳</span>
              <span className={styles.featureText}>Pagos seguros</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventoSeleccionadoPage;
