import React, { useState, useEffect } from 'react';
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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 para adelante, -1 para atrás

  const handleEntradaSelect = (tipo: string) => {
    setSelectedEntrada(selectedEntrada === tipo ? null : tipo);
  };

  // Obtener items alternados (actividad, alimento, actividad, alimento...)
  const getAlternatingItems = () => {
    if (!event) return [];
    
    const alimentos = event.alimentosBebestibles 
      ? event.alimentosBebestibles
          .filter((item: any) => item.activo)
          .map((item: any) => ({
            ...item,
            type: 'alimento',
            displayName: item.nombre,
            displayPrice: item.precioUnitario
          }))
      : [];
    
    const actividades = event.actividades 
      ? event.actividades
          .filter((actividad: any) => actividad.activa)
          .map((actividad: any) => ({
            ...actividad,
            type: 'actividad',
            displayName: actividad.nombreActividad,
            displayPrice: actividad.precioUnitario
          }))
      : [];
    
    // Alternar entre actividades y alimentos
    const alternatingItems: any[] = [];
    const maxLength = Math.max(alimentos.length, actividades.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (actividades[i]) {
        alternatingItems.push(actividades[i]);
      }
      if (alimentos[i]) {
        alternatingItems.push(alimentos[i]);
      }
    }
    
    return alternatingItems;
  };

  const allItems = getAlternatingItems();

  // Carrusel automático ping-pong cada 4 segundos
  useEffect(() => {
    if (allItems.length > 1) {
      const interval = setInterval(() => {
        setCarouselIndex((prev) => {
          const maxIndex = allItems.length - 1; // Máximo índice para mostrar 1 card
          
          if (direction === 1) {
            // Yendo hacia adelante
            if (prev >= maxIndex) {
              setDirection(-1); // Cambiar dirección a atrás
              return prev - 1;
            }
            return prev + 1;
          } else {
            // Yendo hacia atrás
            if (prev <= 0) {
              setDirection(1); // Cambiar dirección a adelante
              return prev + 1;
            }
            return prev - 1;
          }
        });
      }, 4000); // 4 segundos

      return () => clearInterval(interval);
    }
  }, [allItems.length, direction]);
  return (
    <main className={styles.eventoSeleccionadoPage}>
      {/* Navegación breadcrumb */}
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
        <span className={styles.breadcrumbCurrent} title="Evento actual">
          {event?.informacionGeneral?.nombreEvento || 'Evento'}
        </span>
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
              {/* Carrusel informativo sobre la imagen */}
              <div className={styles.infoOverlay}>
                <div className={styles.infoContainer}>
                  {/* Contenido del carrusel automático */}
                  <div className={styles.carouselContent}>
                    <div 
                      className={styles.carouselTrack}
                      style={{
                        transform: `translateX(-${carouselIndex * 332}px)`, // 312px card + 20px gap = 332px
                        transition: 'transform 0.5s ease'
                      }}
                    >
                      {allItems.map((item: any, index: number) => (
                        <div key={`${item.id || item._id}-${index}`} className={styles.infoCard}>
                          <span className={styles.cardCategory}>
                            {item.type === 'alimento' ? 'Alimento y Bebida' : 'Actividad'}
                          </span>
                          <img 
                            src={getImagePath(item.type === 'alimento' ? "/images/fastfood.png" : "/images/person-play.png")} 
                            alt={item.type === 'alimento' ? 'Alimento' : 'Actividad'}
                            className={styles.cardIcon}
                          />
                          <div className={styles.cardContent}>
                            <h4 className={styles.cardTitle}>{item.displayName}</h4>
                            <p className={styles.cardDescription}>{item.descripcion}</p>
                            <p className={styles.cardPrice}>
                              ${item.displayPrice.toLocaleString('es-CL')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
