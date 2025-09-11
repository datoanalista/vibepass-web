import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getImagePath } from '@/utils/getImagePath';
import { EventAPI } from '@/types/events';
import styles from './EventsCarousel.module.css';

interface EventsCarouselProps {
  events: EventAPI[];
}

const EventsCarousel: React.FC<EventsCarouselProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(1); // 1 para adelante, -1 para atrás

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  // Movimiento automático con efecto ping-pong
  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = events.length - 1;
          
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
      }, 6000); // 6 segundos para que sea más lento

      return () => clearInterval(interval);
    }
  }, [events.length, direction]);

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
      {/* Botones de navegación */}
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

      {/* Contenedor del carrusel con overflow */}
      <div className={styles.carouselWrapper} ref={carouselRef}>
        <div 
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${currentIndex * (100 / events.length)}%)`,
            transition: 'transform 0.8s ease-in-out',
            width: `${events.length * 100}%`
          }}
        >
          {events.map((event, index) => (
            <div 
              key={event.id || event._id || index} 
              className={styles.carouselSlide}
              style={{ width: `${100 / events.length}%` }}
            >
              {/* Imagen del evento */}
              <div className={styles.imageContainer}>
                <img
                  src={event.informacionGeneral.bannerPromocional}
                  alt={event.informacionGeneral.nombreEvento}
                  className={styles.eventImage}
                />
              </div>

              {/* Barra de información */}
              <div className={styles.infoBar}>
                <div className={styles.eventInfo}>
                  <h2 className={styles.eventName}>
                    {event.informacionGeneral.nombreEvento}
                  </h2>
                  <p className={styles.eventDate}>
                    {formatDate(event.informacionGeneral.fechaEvento, event.informacionGeneral.horaInicio)}
                  </p>
                  <p className={styles.eventLocation}>
                    {event.informacionGeneral.lugarEvento}
                  </p>
                </div>
                
                <div className={styles.rightSection}>
                  {getEventStatus(event.informacionGeneral.fechaEvento, event.informacionGeneral.horaInicio, event.informacionGeneral.horaTermino) === 'en_curso' && (
                    <p className={styles.eventStatusEnCurso}>
                      ¡EVENTO EN CURSO!
                    </p>
                  )}
                  {getEventStatus(event.informacionGeneral.fechaEvento, event.informacionGeneral.horaInicio, event.informacionGeneral.horaTermino) === 'finalizado' && (
                    <p className={styles.eventStatusFinalizado}>
                      EVENTO FINALIZADO
                    </p>
                  )}
                  <div className={styles.actionButton}>
                    <Link 
                      href={`/evento-seleccionado?eventoId=${event.id || event._id}`}
                      className={styles.qrButton}
                    >
                      Comprar QR
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
