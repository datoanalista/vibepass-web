"use client";
import React from "react";
import styles from "./EventsGrid.module.css";
import { eventsData, Event } from "@/data/Landing/eventsData";

interface EventCardProps extends Omit<Event, "id"> {}

const EventCard: React.FC<EventCardProps> = ({
  ticketsAvailable,
  imageUrl,
  date,
  month,
  location,
  title,
  time,
}) => {
  return (
    <div className={styles.eventCard}>
      <div className={styles.ticketStatus}>
        {ticketsAvailable} ticket disponible
      </div>
      <img src={imageUrl} alt={title} className={styles.eventImage} />
      <div className={styles.eventDetails}>
        <div className={styles.dateSection}>
          <div className={styles.dateNumber}>{date}</div>
          <div className={styles.dateMonth}>{month}</div>
        </div>
        <div className={styles.eventInfo}>
          <div className={styles.locationRow}>
            <div className={styles.locationIcon}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.00006 1.5C5.69181 1.5 3.00006 4.19175 3.00006 7.49625C2.97831 12.33 8.77206 16.338 9.00006 16.5C9.00006 16.5 15.0218 12.33 15.0001 7.5C15.0001 4.19175 12.3083 1.5 9.00006 1.5ZM9.00006 10.5C7.34256 10.5 6.00006 9.1575 6.00006 7.5C6.00006 5.8425 7.34256 4.5 9.00006 4.5C10.6576 4.5 12.0001 5.8425 12.0001 7.5C12.0001 9.1575 10.6576 10.5 9.00006 10.5Z"
                  fill="black"
                />
              </svg>
            </div>
            <span className={styles.locationText}>{location}</span>
          </div>
          <div className={styles.eventTitle}>{title}</div>
          <div className={styles.eventTime}>{time}</div>
          <button className={styles.buyTicketButton}>Comprar ticket</button>
        </div>
        <div className={styles.checkIcon}>
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.6458 10.3407C11.5454 28.0969 0 9.41798 0 9.41798L0.933409 8.61486C4.98651 12.6394 12.2575 16.9388 19.9228 7.31201L23.644 10.3407H23.6458Z"
              fill="#04C400"
            />
            <path
              d="M16.5522 4.5671L10.9178 9.41797L5.30664 4.85266L10.9428 0L16.5522 4.5671Z"
              fill="#04C400"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const EventsGrid: React.FC = () => {
  return (
    <div className={styles.eventsSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Próximos eventos</span>
        <div className={styles.sectionArrow}>
          <svg
            width="21"
            height="10"
            viewBox="0 0 21 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4842 9.97277L0.565781 0.239384L20.4577 0.295845L10.4842 9.97277Z"
              fill="#12C70E"
            />
          </svg>
        </div>
      </div>

      <div className={styles.eventsGrid}>
        {eventsData.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      <div className={styles.viewMoreButton}>
        <span>Ver más eventos</span>
        <div className={styles.viewMoreArrow}>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.9992 22.4617C17.7992 22.4617 17.6117 22.4307 17.4367 22.3687C17.2617 22.3067 17.0992 22.2002 16.9492 22.0492L10.0492 15.1492C9.77422 14.8742 9.63672 14.5242 9.63672 14.0992C9.63672 13.6742 9.77422 13.3242 10.0492 13.0492C10.3242 12.7742 10.6742 12.6367 11.0992 12.6367C11.5242 12.6367 11.8742 12.7742 12.1492 13.0492L17.9992 18.8992L23.8492 13.0492C24.1242 12.7742 24.4742 12.6367 24.8992 12.6367C25.3242 12.6367 25.6742 12.7742 25.9492 13.0492C26.2242 13.3242 26.3617 13.6742 26.3617 14.0992C26.3617 14.5242 26.2242 14.8742 25.9492 15.1492L19.0492 22.0492C18.8992 22.1992 18.7367 22.3057 18.5617 22.3687C18.3867 22.4317 18.1992 22.4627 17.9992 22.4617Z"
              fill="#424040"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EventsGrid;
