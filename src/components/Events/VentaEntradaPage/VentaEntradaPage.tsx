"use client";
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEventDetails } from '@/hooks/useEventDetails';
import { getImagePath } from '@/utils/getImagePath';
import styles from './VentaEntradaPage.module.css';

const VentaEntradaPage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventoId = searchParams.get('eventoId');
  const tipoEntrada = searchParams.get('tipoEntrada');
  const { event, loading, error } = useEventDetails(eventoId);

  return (
    <main className={styles.ventaEntradaPage}>
      {/* Línea gradiente pegada al header */}
      <div className={styles.gradientLine}></div>
      
      {/* Navegación breadcrumb con imagen del evento */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink} title="Ir a Home">
            HOME
          </Link>
          <img 
            src={getImagePath("/images/triangulo.png")} 
            alt=">" 
            className={styles.breadcrumbSeparator}
          />
          <Link href="/eventos" className={styles.breadcrumbLink} title="Volver a eventos">
            EVENTOS
          </Link>
          <img 
            src={getImagePath("/images/triangulo.png")} 
            alt=">" 
            className={styles.breadcrumbSeparator}
          />
          <Link 
            href={`/evento-seleccionado?eventoId=${eventoId}`} 
            className={styles.breadcrumbLink} 
            title="Volver al evento"
          >
            {event?.informacionGeneral?.nombreEvento || 'Evento'}
          </Link>
          <img 
            src={getImagePath("/images/triangulo.png")} 
            alt=">" 
            className={styles.breadcrumbSeparator}
          />
          <span className={styles.breadcrumbCurrent} title="Compra de entrada">
            Compra de entrada
          </span>
        </div>
        
        {/* Imagen del evento a la derecha */}
        {event && (
          <div className={styles.eventImagePreview}>
            <img 
              src={event.informacionGeneral?.bannerPromocional || event.imagenPrincipal}
              alt={event.informacionGeneral?.nombreEvento || 'Evento'}
              className={styles.previewImage}
            />
          </div>
        )}
      </div>
      
      {/* Línea separadora debajo del breadcrumb */}
      <div className={styles.separatorLine}></div>

      {/* Vista de venta */}
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
        <div className={styles.ventaContent}>
          {/* Banner "Estamos trabajando" */}
          <div className={styles.constructionBanner}>
            <div className={styles.constructionContent}>
              <div className={styles.iconContainer}>
                <img
                  src={getImagePath("/images/activities.svg")}
                  alt="En construcción"
                  className={styles.constructionIcon}
                />
              </div>
              <h2 className={styles.constructionTitle}>¡Estamos trabajando en esta funcionalidad!</h2>
              <p className={styles.constructionText}>
                Pronto podrás comprar tus entradas de forma rápida y segura. 
                Mientras tanto, aquí tienes la información del evento:
              </p>
            </div>
          </div>

          {/* Información del evento */}
          <div className={styles.eventInfo}>
            <div className={styles.eventDetails}>
              <h3 className={styles.eventTitle}>{event.informacionGeneral?.nombreEvento}</h3>
              <div className={styles.eventMetadata}>
                <p className={styles.eventDate}>
                  📅 {new Date(event.informacionGeneral?.fechaEvento + 'T00:00:00').toLocaleDateString('es-CL', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })} a las {event.informacionGeneral?.horaInicio}
                </p>
                <p className={styles.eventLocation}>📍 {event.informacionGeneral?.lugarEvento}</p>
                <p className={styles.eventStatus}>
                  🎫 Estado: {event.informacionGeneral?.estado}
                </p>
                {tipoEntrada && (
                  <p className={styles.selectedEntry}>
                    ✨ Entrada seleccionada: <strong>{tipoEntrada}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default VentaEntradaPage;
