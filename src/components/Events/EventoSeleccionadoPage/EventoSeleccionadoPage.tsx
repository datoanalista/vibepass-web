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

  const handleEntradaSelect = (tipo: string) => {
    setSelectedEntrada(selectedEntrada === tipo ? null : tipo);
  };

  // Obtener todos los items para el carrusel
  const getAllItems = () => {
    if (!event) return [];
    
    const allItems: any[] = [];
    
    // Agregar alimentos/bebidas
    if (event.alimentosBebestibles) {
      event.alimentosBebestibles
        .filter((item: any) => item.activo)
        .forEach((item: any) => {
          allItems.push({
            ...item,
            type: 'alimento',
            displayName: item.nombre,
            displayPrice: item.precioUnitario
          });
        });
    }
    
    // Agregar actividades
    if (event.actividades) {
      event.actividades
        .filter((actividad: any) => actividad.activa)
        .forEach((actividad: any) => {
          allItems.push({
            ...actividad,
            type: 'actividad',
            displayName: actividad.nombreActividad,
            displayPrice: actividad.precioUnitario
          });
        });
    }
    
    return allItems;
  };

  const allItems = getAllItems();
  const itemsPerPage = 3; // Siempre 3 cards por página
  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentItems = () => {
    const startIndex = carouselIndex * itemsPerPage;
    return allItems.slice(startIndex, startIndex + itemsPerPage);
  };

  // Carrusel automático cada 4 segundos
  useEffect(() => {
    if (totalPages > 1) {
      const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % totalPages);
      }, 4000); // 4 segundos

      return () => clearInterval(interval);
    }
  }, [totalPages]);
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
              {/* Carrusel informativo sobre la imagen */}
              <div className={styles.infoOverlay}>
                <div className={styles.infoContainer}>
                  {/* Contenido del carrusel automático */}
                  <div className={styles.carouselContent}>
                    {getCurrentItems().map((item: any) => (
                      <div key={item.id || item._id} className={styles.infoCard}>
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
      )}
    </main>
  );
};

export default EventoSeleccionadoPage;
