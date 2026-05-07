import React from 'react';
import { useRouter } from 'next/navigation';
import { getImagePath } from '@/utils/getImagePath';
import { EventAPI } from '@/types/events';
import styles from './UpcomingEvents.module.css';

interface UpcomingEventsProps {
  events: EventAPI[];
}

const CARDS_PER_VIEW = 2;

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);

  const handleEventClick = (eventId: string) => {
    router.push(`/evento-seleccionado?eventoId=${eventId}`);
  };

  const formatDate = (fechaEvento: string) => {
    const [year, month, day] = fechaEvento.split('-').map(Number);
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return {
      day: day.toString(),
      month: months[month - 1]
    };
  };

  const formatTime = (horaInicio: string, horaTermino: string) => {
    return `${horaInicio} - ${horaTermino}`;
  };

  const calculateAvailableTickets = (entradas: EventAPI['entradas']) => {
    if (!entradas || entradas.length === 0) return 0;

    return entradas.reduce((total, entrada) => {
      if (entrada.activa) {
        return total + (entrada.cuposDisponibles - entrada.entradasVendidas);
      }
      return total;
    }, 0);
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const pages = React.useMemo(() => {
    const chunks: EventAPI[][] = [];

    for (let index = 0; index < events.length; index += CARDS_PER_VIEW) {
      chunks.push(events.slice(index, index + CARDS_PER_VIEW));
    }

    return chunks;
  }, [events]);

  React.useEffect(() => {
    if (currentPage > pages.length - 1) {
      setCurrentPage(0);
    }
  }, [currentPage, pages.length]);

  if (events.length === 0) {
    return null;
  }

  const canNavigate = pages.length > 1;

  return (
    <section className={styles.upcomingEvents}>
      <h2 className={styles.sectionTitle}>Próximos eventos</h2>
      <div className={styles.separator}></div>

      <div className={styles.sliderShell}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.prevButton} ${!canNavigate || currentPage === 0 ? styles.navButtonDisabled : ''}`}
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
          disabled={!canNavigate || currentPage === 0}
          aria-label="Ver eventos anteriores"
        >
          <img
            src={getImagePath('/images/icon_left.svg')}
            alt=""
            className={styles.arrowIcon}
          />
        </button>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {pages.map((pageEvents, pageIndex) => (
              <div key={pageIndex} className={styles.page}>
                <div className={styles.eventsGrid}>
                  {pageEvents.map((event, index) => {
                    const { day, month } = formatDate(event.informacionGeneral.fechaEvento);
                    const timeRange = formatTime(event.informacionGeneral.horaInicio, event.informacionGeneral.horaTermino);
                    const availableTickets = calculateAvailableTickets(event.entradas);
                    const eventId = event.id || event._id || `event-${pageIndex}-${index}`;

                    return (
                      <div
                        key={eventId}
                        className={styles.eventCard}
                        onClick={() => handleEventClick(eventId)}
                      >
                        <div className={styles.ticketsInfo}>
                          <span className={styles.ticketsText}>{formatNumber(availableTickets)} tickets disponibles</span>
                          <div className={styles.ticketsBar}></div>
                        </div>

                        <div className={styles.eventImageContainer}>
                          <img
                            src={event.informacionGeneral.bannerPromocional}
                            alt={event.informacionGeneral.nombreEvento}
                            className={styles.eventImage}
                          />
                        </div>

                        <div className={styles.eventInfo}>
                          <div className={styles.dateBox}>
                            <div className={styles.dateNumber}>{day}</div>
                            <div className={styles.dateMonth}>{month}</div>
                            <img
                              src={getImagePath('/images/fecha_icon.png')}
                              alt="Fecha"
                              className={styles.dateIcon}
                            />
                          </div>

                          <div className={styles.infoBox}>
                            <div className={styles.locationInfo}>
                              <img
                                src={getImagePath('/images/ubicacion_card.png')}
                                alt="Ubicación"
                                className={styles.locationIcon}
                              />
                              <span className={styles.locationText}>{event.informacionGeneral.lugarEvento}</span>
                            </div>

                            <div className={styles.eventName}>{event.informacionGeneral.nombreEvento}</div>

                            <div className={styles.eventTime}>{timeRange}</div>

                            <button type="button" className={styles.buyButton}>
                              <span className={styles.buttonText}>Comprar ticket</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.navButton} ${styles.nextButton} ${!canNavigate || currentPage >= pages.length - 1 ? styles.navButtonDisabled : ''}`}
          onClick={() => setCurrentPage((page) => Math.min(page + 1, pages.length - 1))}
          disabled={!canNavigate || currentPage >= pages.length - 1}
          aria-label="Ver más próximos eventos"
        >
          <img
            src={getImagePath('/images/icon_right.svg')}
            alt=""
            className={styles.arrowIcon}
          />
        </button>
      </div>

      {canNavigate && (
        <div className={styles.dots}>
          {pages.map((_, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              className={`${styles.dot} ${pageIndex === currentPage ? styles.activeDot : ''}`}
              onClick={() => setCurrentPage(pageIndex)}
              aria-label={`Ir al grupo ${pageIndex + 1} de próximos eventos`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
