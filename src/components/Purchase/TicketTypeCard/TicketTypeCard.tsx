"use client";
import React from "react";
import styles from "./TicketTypeCard.module.css";

interface TicketTypeCardProps {
  title: string;
  isAvailable: boolean;
  iconUrl: string;
}

export default function TicketTypeCard({
  title,
  isAvailable,
  iconUrl,
}: TicketTypeCardProps) {
  return (
    <div className={styles.cardColumn}>
      <div className={styles.cardContainer}>
        {!isAvailable && <div className={styles.soldOutLabel}>AGOTADO</div>}
        <div
          className={`${styles.card} ${!isAvailable ? styles.soldOut : styles.available}`}
        >
          <div
            className={`${styles.cardContent} ${!isAvailable ? styles.soldOutContent : styles.availableContent}`}
          >
            <div className={styles.cardTitle}>{title}</div>
            <img
              src={iconUrl}
              alt="Ticket Icon"
              className={`${styles.cardIcon} ${!isAvailable ? "" : styles.availableIcon}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
