import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEventDetails } from '@/hooks/useEventDetails';
import { getImagePath } from '@/utils/getImagePath';
import styles from './EventoSeleccionadoPage.module.css';

const EventoSeleccionadoPage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventoId = searchParams.get('eventoId');
  const { event, loading, error } = useEventDetails(eventoId);
  const [selectedEntrada, setSelectedEntrada] = useState<string | null>(null);

  const handleEntradaSelect = (tipo: string) => {
    setSelectedEntrada(selectedEntrada === tipo ? null : tipo);
  };
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
          {/* Imagen del evento - 80% del ancho como en el Figma */}
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

          {/* Sección de entradas */}
          <div className={styles.entradasSection}>
            <h3 className={styles.entradasTitle}>Selecciona tu tipo de entrada</h3>
            <div className={styles.entradasGrid}>
              <div 
                className={`${styles.entradaCard} ${selectedEntrada === 'VIP' ? styles.selected : ''}`}
                onClick={() => handleEntradaSelect('VIP')}
              >
                <div className={styles.entradaCardInner}>
                  <img 
                    src={getImagePath("/images/icon_information.png")} 
                    alt="Información" 
                    className={styles.infoIcon}
                  />
                  <span className={styles.entradaText}>VIP</span>
                  <img 
                    src={getImagePath("/images/solar_ticket-bold.png")} 
                    alt="Ticket" 
                    className={styles.ticketIcon}
                  />
                </div>
              </div>

              <div 
                className={`${styles.entradaCard} ${selectedEntrada === 'General' ? styles.selected : ''}`}
                onClick={() => handleEntradaSelect('General')}
              >
                <div className={styles.entradaCardInner}>
                  <img 
                    src={getImagePath("/images/icon_information.png")} 
                    alt="Información" 
                    className={styles.infoIcon}
                  />
                  <span className={styles.entradaText}>General</span>
                  <img 
                    src={getImagePath("/images/solar_ticket-bold.png")} 
                    alt="Ticket" 
                    className={styles.ticketIcon}
                  />
                </div>
              </div>

              <div 
                className={`${styles.entradaCard} ${selectedEntrada === 'Estudiantes' ? styles.selected : ''}`}
                onClick={() => handleEntradaSelect('Estudiantes')}
              >
                <div className={styles.entradaCardInner}>
                  <img 
                    src={getImagePath("/images/icon_information.png")} 
                    alt="Información" 
                    className={styles.infoIcon}
                  />
                  <span className={styles.entradaText}>Estudiantes</span>
                  <img 
                    src={getImagePath("/images/solar_ticket-bold.png")} 
                    alt="Ticket" 
                    className={styles.ticketIcon}
                  />
                </div>
              </div>

              <div 
                className={`${styles.entradaCard} ${selectedEntrada === 'Profesores' ? styles.selected : ''}`}
                onClick={() => handleEntradaSelect('Profesores')}
              >
                <div className={styles.entradaCardInner}>
                  <img 
                    src={getImagePath("/images/icon_information.png")} 
                    alt="Información" 
                    className={styles.infoIcon}
                  />
                  <span className={styles.entradaText}>Profesores</span>
                  <img 
                    src={getImagePath("/images/solar_ticket-bold.png")} 
                    alt="Ticket" 
                    className={styles.ticketIcon}
                  />
                </div>
              </div>

              <div 
                className={`${styles.entradaCard} ${selectedEntrada === 'Tercera Edad' ? styles.selected : ''}`}
                onClick={() => handleEntradaSelect('Tercera Edad')}
              >
                <div className={styles.entradaCardInner}>
                  <img 
                    src={getImagePath("/images/icon_information.png")} 
                    alt="Información" 
                    className={styles.infoIcon}
                  />
                  <span className={styles.entradaText}>Tercera Edad</span>
                  <img 
                    src={getImagePath("/images/solar_ticket-bold.png")} 
                    alt="Ticket" 
                    className={styles.ticketIcon}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EventoSeleccionadoPage;
