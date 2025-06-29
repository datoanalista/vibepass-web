"use client";
import React from "react";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: {
    id: number;
    name: string;
    email: string;
    price: string;
    paymentMethod: string;
    attendees: number;
    location?: string;
    phone?: string;
    rut?: string;
    date?: string;
    time?: string;
    image: string;
    status: string;
  };
  showDetails: boolean;
}

export default function EventCard({ event, showDetails }: EventCardProps) {
  return (
    <div className={styles.card}>
      {showDetails && (
        <>
          <div className={styles.detailsHeader}>
            <div className={styles.statusColumn}>
              <div className={styles.statusIndicator}>
                <div className={styles.activeStatus} />
                <img
                  src={event.image}
                  alt="Event"
                  className={styles.eventImage}
                />
              </div>
              <div className={styles.locationLabel}>Lugar</div>
            </div>

            <div className={styles.eventInfo}>
              <div className={styles.eventName}>{event.name}</div>
              <div className={styles.eventEmail}>{event.email}</div>
            </div>

            <div className={styles.priceColumn}>
              <div className={styles.price}>{event.price}</div>
              <div className={styles.phoneLabel}>Teléfono</div>
            </div>

            <div className={styles.paymentMethod}>{event.paymentMethod}</div>

            <div className={styles.attendeesColumn}>
              <div className={styles.attendeesBadge}>
                <img
                  src="/images/users-icon.png"
                  alt="Users"
                  className={styles.usersIcon}
                />
                <div className={styles.attendeesInfo}>
                  <span className={styles.attendeesLabel}>Asistentes</span>
                  <span className={styles.attendeesCount}>
                    {event.attendees}
                  </span>
                </div>
              </div>
              <div className={styles.rutLabel}>Rut</div>
            </div>

            <div className={styles.dateColumn}>
              <div className={styles.dateLabel}>Fecha</div>
            </div>

            <div className={styles.periodColumn}>
              <img
                src="/images/more-icon.png"
                alt="More options"
                className={styles.moreIcon}
              />
              <div className={styles.periodLabel}>Periodo</div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.detailsRow}>
            <div className={styles.location}>{event.location}</div>
            <div className={styles.phone}>{event.phone}</div>
            <div className={styles.rut}>{event.rut}</div>
            <div className={styles.date}>{event.date}</div>
            <div className={styles.time}>{event.time}</div>
          </div>
        </>
      )}

      {!showDetails && (
        <div className={styles.simpleCard}>
          <div className={styles.simpleContent}>
            <div className={styles.statusIndicator}>
              <div className={styles.activeStatus} />
              <img
                src={event.image}
                alt="Event"
                className={styles.eventImage}
              />
            </div>

            <div className={styles.eventInfo}>
              <div className={styles.eventName}>{event.name}</div>
              <div className={styles.eventEmail}>{event.email}</div>
            </div>

            <div className={styles.price}>{event.price}</div>
            <div className={styles.paymentMethod}>{event.paymentMethod}</div>

            <div className={styles.attendeesBadge}>
              <img
                src="/images/users-icon.png"
                alt="Users"
                className={styles.usersIcon}
              />
              <div className={styles.attendeesInfo}>
                <span className={styles.attendeesLabel}>Asistentes</span>
                <span className={styles.attendeesCount}>{event.attendees}</span>
              </div>
            </div>
          </div>

          <img
            src="/images/more-icon.png"
            alt="More options"
            className={styles.moreIcon}
          />
        </div>
      )}
    </div>
  );
}
