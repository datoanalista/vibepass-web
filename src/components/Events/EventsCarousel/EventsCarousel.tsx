import React, { useState } from 'react';
import { getImagePath } from '@/utils/getImagePath';
import styles from './EventsCarousel.module.css';

interface Event {
  informacionGeneral: {
    nombreEvento: string;
    descripcion: string;
    fechaEvento: string;
    horaInicio: string;
    horaTermino: string;
    lugarEvento: string;
    bannerPromocional: string;
    fechaCreacion: string;
    estado: string;
  };
}

interface EventsCarouselProps {
  events: Event[];
}

const EventsCarousel: React.FC<EventsCarouselProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const formatDate = (fechaEvento: string, horaInicio: string) => {
    // Parsear la fecha correctamente para evitar problemas de zona horaria
    const [year, month, day] = fechaEvento.split('-').map(Number);
    const months = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ];
    
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = months[month - 1]; // month es 1-indexed en el array
    
    return `${dayStr} de ${monthStr}. ${year} a las ${horaInicio}`;
  };

  const getEventStatus = (fechaEvento: string, horaInicio: string, horaTermino: string) => {
    const now = new Date();
    
    // Parsear la fecha correctamente para evitar problemas de zona horaria
    const [year, month, day] = fechaEvento.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day); // month es 0-indexed en Date constructor
    const startTime = new Date(year, month - 1, day, ...horaInicio.split(':').map(Number));
    const endTime = new Date(year, month - 1, day, ...horaTermino.split(':').map(Number));
    
    // Si es el mismo día
    if (now.toDateString() === eventDate.toDateString()) {
      if (now < startTime) {
        return 'programado';
      } else if (now >= startTime && now <= endTime) {
        return 'en_curso';
      } else {
        return 'finalizado';
      }
    }
    
    // Si es un día futuro
    if (now < eventDate) {
      return 'programado';
    }
    
    // Si es un día pasado
    return 'finalizado';
  };

  if (events.length === 0) {
    return (
      <div className={styles.carouselContainer}>
        <div className={styles.noEvents}>
          <p>No hay eventos disponibles</p>
        </div>
      </div>
    );
  }

  const currentEvent = events[currentIndex];
  const eventStatus = getEventStatus(
    currentEvent.informacionGeneral.fechaEvento,
    currentEvent.informacionGeneral.horaInicio,
    currentEvent.informacionGeneral.horaTermino
  );

  return (
    <div className={styles.carouselContainer}>
      {/* Botones de navegación - Fuera de la imagen */}
      <button 
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={prevSlide}
        aria-label="Evento anterior"
      >
        <img 
          src={getImagePath("/images/icon_left.svg")} 
          alt="Anterior" 
          className={styles.arrowIcon}
        />
      </button>
      
      <button 
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={nextSlide}
        aria-label="Siguiente evento"
      >
        <img 
          src={getImagePath("/images/icon_right.svg")} 
          alt="Siguiente" 
          className={styles.arrowIcon}
        />
      </button>

      {/* Imagen principal */}
      <div className={styles.imageContainer}>
        <img
          src={currentEvent.informacionGeneral.bannerPromocional}
          alt={currentEvent.informacionGeneral.nombreEvento}
          className={styles.eventImage}
        />
      </div>

      {/* Barra de información */}
      <div className={styles.infoBar}>
        <div className={styles.eventInfo}>
          <h2 className={styles.eventName}>
            {currentEvent.informacionGeneral.nombreEvento}
          </h2>
          <p className={styles.eventDate}>
            {formatDate(currentEvent.informacionGeneral.fechaEvento, currentEvent.informacionGeneral.horaInicio)}
          </p>
          <p className={styles.eventLocation}>
            {currentEvent.informacionGeneral.lugarEvento}
          </p>
        </div>
        
        <div className={styles.rightSection}>
          {eventStatus === 'en_curso' && (
            <p className={styles.eventStatusEnCurso}>
              ¡EVENTO EN CURSO!
            </p>
          )}
          {eventStatus === 'finalizado' && (
            <p className={styles.eventStatusFinalizado}>
              EVENTO FINALIZADO
            </p>
          )}
          <div className={styles.actionButton}>
            <button className={styles.qrButton}>
              Comprar QR
            </button>
          </div>
        </div>
      </div>

      {/* Indicadores de puntos */}
      <div className={styles.dotsContainer}>
        {events.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir al evento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsCarousel;
