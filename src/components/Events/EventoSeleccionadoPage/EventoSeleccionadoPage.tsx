import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEventDetails } from '@/hooks/useEventDetails';
import { getImagePath } from '@/utils/getImagePath';
import styles from './EventoSeleccionadoPage.module.css';

interface Entrada {
  id?: string;
  _id?: string;
  tipoEntrada: string;
  precio: number;
  cuposDisponibles: number;
  entradasVendidas: number;
  activa: boolean;
  limitePorPersona?: number;
  fechasVenta?: {
    inicio: string;
    fin: string;
  };
}

const EventoSeleccionadoPage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventoId = searchParams.get('eventoId');
  const { event, loading, error } = useEventDetails(eventoId);
  const [selectedEntrada, setSelectedEntrada] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const handleEntradaSelect = (tipo: string) => {
    setSelectedEntrada(selectedEntrada === tipo ? null : tipo);
  };

  // Contar total de items activos
  const getTotalItems = () => {
    if (!event) return 0;
    
    let total = 0;
    
    if (event.alimentosBebestibles) {
      total += event.alimentosBebestibles.filter((item: any) => item.activo).length;
    }
    
    if (event.actividades) {
      total += event.actividades.filter((actividad: any) => actividad.activa).length;
    }
    
    return total;
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
              {event.entradas && event.entradas.filter((entrada: Entrada) => entrada.activa).map((entrada: Entrada) => (
                <div 
                  key={entrada.id || entrada._id}
                  className={`${styles.entradaCard} ${selectedEntrada === entrada.tipoEntrada ? styles.selected : ''}`}
                  onClick={() => handleEntradaSelect(entrada.tipoEntrada)}
                >
                  <div className={styles.entradaCardInner}>
                    <img 
                      src={getImagePath("/images/icon_information.png")} 
                      alt="Información" 
                      className={styles.infoIcon}
                    />
                    <div className={styles.entradaInfo}>
                      <span className={styles.entradaText}>
                        {entrada.tipoEntrada.charAt(0).toUpperCase() + entrada.tipoEntrada.slice(1)}
                      </span>
                      <span className={styles.entradaPrecio}>
                        ${entrada.precio.toLocaleString('es-CL')}
                      </span>
                      <span className={styles.entradaDisponibles}>
                        {entrada.cuposDisponibles - entrada.entradasVendidas} disponibles
                      </span>
                    </div>
                    <img 
                      src={getImagePath("/images/solar_ticket-bold.png")} 
                      alt="Ticket" 
                      className={styles.ticketIcon}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección características con barra y imagen */}
          <div className={styles.caracteristicasSection}>
            {/* Barra azul posicionada sobre la imagen */}
            <div className={styles.caracteristicasBar}>
              <h3 className={styles.caracteristicasTitle}>Conoce las características de nuestro evento</h3>
            </div>
            
            <div className={styles.caracteristicasContent}>
              <img 
                src={getImagePath("/images/childrens.png")} 
                alt="Niños" 
                className={styles.childrenImage}
              />
              {/* Contenido informativo sobre la imagen */}
              <div className={styles.infoOverlay}>
                <div className={styles.infoContainer}>
                  {/* Sección Alimentos y Bebidas */}
                  {event.alimentosBebestibles && event.alimentosBebestibles.filter((item: any) => item.activo).length > 0 && (
                    <div className={styles.infoSection}>
                      <h3 className={styles.sectionTitle}>Alimentos y Bebidas</h3>
                      <div className={`${styles.infoGrid} ${
                        event.alimentosBebestibles.filter((item: any) => item.activo).slice(0, showMore ? undefined : 9).length === 1 
                          ? styles.singleCard 
                          : styles.multipleCards
                      }`}>
                        {event.alimentosBebestibles
                          .filter((item: any) => item.activo)
                          .slice(0, showMore ? undefined : 9)
                          .map((item: any) => (
                            <div key={item.id || item._id} className={styles.infoCard}>
                              <img 
                                src={getImagePath("/images/fastfood.png")} 
                                alt="Alimento" 
                                className={styles.cardIcon}
                              />
                              <div className={styles.cardContent}>
                                <h4 className={styles.cardTitle}>{item.nombre}</h4>
                                <p className={styles.cardDescription}>{item.descripcion}</p>
                                <p className={styles.cardPrice}>
                                  ${item.precioUnitario.toLocaleString('es-CL')}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Sección Actividades */}
                  {event.actividades && event.actividades.filter((actividad: any) => actividad.activa).length > 0 && (
                    <div className={styles.infoSection}>
                      <h3 className={styles.sectionTitle}>Actividades</h3>
                      <div className={`${styles.infoGrid} ${
                        event.actividades.filter((actividad: any) => actividad.activa).slice(0, showMore ? undefined : 9).length === 1 
                          ? styles.singleCard 
                          : styles.multipleCards
                      }`}>
                        {event.actividades
                          .filter((actividad: any) => actividad.activa)
                          .slice(0, showMore ? undefined : 9)
                          .map((actividad: any) => (
                            <div key={actividad.id || actividad._id} className={styles.infoCard}>
                              <img 
                                src={getImagePath("/images/person-play.png")} 
                                alt="Actividad" 
                                className={styles.cardIcon}
                              />
                              <div className={styles.cardContent}>
                                <h4 className={styles.cardTitle}>{actividad.nombreActividad}</h4>
                                <p className={styles.cardDescription}>{actividad.descripcion}</p>
                                <p className={styles.cardPrice}>
                                  ${actividad.precioUnitario.toLocaleString('es-CL')}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Botón Ver más */}
                {getTotalItems() > 9 && (
                  <button 
                    className={styles.verMasBtn}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? 'Ver menos' : 'Ver más'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EventoSeleccionadoPage;
