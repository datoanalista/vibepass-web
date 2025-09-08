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

  const handleEntradaSelect = (tipo: string) => {
    setSelectedEntrada(selectedEntrada === tipo ? null : tipo);
  };

  // Extraer nombres de alimentos/bebidas y actividades
  const getRandomItems = () => {
    if (!event) return [];
    
    const items: string[] = [];
    
    // Agregar alimentos/bebidas
    if (event.alimentosBebestibles) {
      event.alimentosBebestibles.forEach((item: any) => {
        if (item.activo && item.nombre) {
          items.push(item.nombre);
        }
      });
    }
    
    // Agregar actividades
    if (event.actividades) {
      event.actividades.forEach((actividad: any) => {
        if (actividad.activa && actividad.nombreActividad) {
          items.push(actividad.nombreActividad);
        }
      });
    }
    
    return items;
  };

  const randomItems = getRandomItems();
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
              {/* Elementos de texto flotantes */}
              <div className={styles.floatingItems}>
                {randomItems.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className={styles.floatingItem}
                    style={{
                      left: `${Math.random() * 85 + 5}%`, // 5% a 90% del ancho
                      top: `${Math.random() * 80 + 10}%`, // 10% a 90% de la altura
                      animationDelay: `${Math.random() * 5}s`, // Delay aleatorio 0-5s
                      animationDuration: `${3 + Math.random() * 4}s`, // Duración 3-7s
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EventoSeleccionadoPage;
