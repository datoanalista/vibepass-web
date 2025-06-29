"use client";
import React from "react";
import styles from "./PastEventsList.module.css";

interface PastEvent {
  id: number;
  name: string;
  school: string;
  date: string;
  ticketsSold: number;
  totalRevenue: string;
  image: string;
}

interface PastEventsListProps {
  events: PastEvent[];
}

export default function PastEventsList({ events }: PastEventsListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.headerRow}>
            <div className={styles.eventColumn}>Fecha</div>
            <div className={styles.ticketsColumn}>Entradas vendidas</div>
            <div className={styles.revenueColumn}>Ingresos totales</div>
            <div className={styles.moreColumn}>Ver más</div>
          </div>
        </div>

        <div className={styles.tableBody}>
          {events.map((event, index) => (
            <React.Fragment key={event.id}>
              <div className={styles.eventRow}>
                <div className={styles.eventInfo}>
                  <img
                    src={event.image}
                    alt="Event"
                    className={styles.eventImage}
                  />
                  <div className={styles.eventDetails}>
                    <div className={styles.eventName}>{event.name}</div>
                    <div className={styles.schoolName}>{event.school}</div>
                  </div>
                </div>

                <div className={styles.eventData}>
                  <div className={styles.dateInfo}>
                    <div className={styles.date}>{event.date}</div>
                    <div className={styles.ticketsSold}>
                      {event.ticketsSold}
                    </div>
                  </div>

                  <div className={styles.revenueInfo}>
                    <div className={styles.revenue}>{event.totalRevenue}</div>
                    <img
                      src="/images/eye-icon.png"
                      alt="View details"
                      className={styles.viewIcon}
                    />
                  </div>
                </div>
              </div>

              {index < events.length - 1 && (
                <div className={styles.rowDivider} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={styles.pagination}>
        <div className={styles.rowsPerPage}>
          <div className={styles.rowsLabel}>Filas por páginas</div>
          <div className={styles.rowsSelector}>
            <div className={styles.rowsValue}>4</div>
            <img
              src="/images/dropdown-arrow.png"
              alt="Dropdown"
              className={styles.dropdownIcon}
            />
          </div>
        </div>

        <div className={styles.pageInfo}>
          <div className={styles.pageText}>1 - 4 de 20</div>
          <img
            src="/images/arrow-left.png"
            alt="Previous page"
            className={styles.pageArrow}
          />
        </div>

        <img
          src="/images/arrow-right.png"
          alt="Next page"
          className={styles.pageArrow}
        />
      </div>
    </div>
  );
}
