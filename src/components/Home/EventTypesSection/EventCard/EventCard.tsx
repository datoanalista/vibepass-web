"use client";
import React from "react";
import styles from "./EventCard.module.css";
import { getImagePath } from "@/utils/getImagePath";

interface Feature {
  icon: string;
  text: string;
}

interface EventCardProps {
  event: {
    id: number;
    type: string;
    title: string;
    description: string;
    ctaText: string;
    buttonGradient: string;
    cardGradient: string;
    features: Feature[];
    bottomText: string;
    isCenter: boolean;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className={`${styles.eventCard} ${event.isCenter ? styles.centerCard : styles.sideCard}`}>
      {/* Background de la card */}
      <div className={`${styles.cardBackground} ${event.isCenter ? styles.centerBackground : styles.sideBackground}`} />

      {/* Header con título del evento */}
      <div className={`${styles.cardHeader} ${event.isCenter ? styles.centerHeader : styles.sideHeader}`}>
        <div className={styles.eventIcon}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z"
              fill={event.isCenter ? "#1B2735" : "#666"}
            />
          </svg>
        </div>
        <span className={styles.eventTitle}>{event.title}</span>
      </div>

      {/* Descripción */}
      <p className={styles.eventDescription}>{event.description}</p>

      {/* Botón Ver eventos */}
      <button className={styles.ctaButton}>
        <span className={styles.buttonText}>{event.ctaText}</span>
      </button>

      {/* Card de features */}
      <div className={styles.featuresCard}>
        {event.features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <img
                src={getImagePath(`/images/${feature.icon}`)}
                alt={feature.text}
                className={styles.iconImage}
              />
            </div>
            <span className={styles.featureText}>{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Texto inferior */}
      <div className={styles.bottomTextContainer}>
        <p className={styles.bottomText}>{event.bottomText}</p>
        {event.isCenter && <div className={styles.bottomLine} />}
      </div>
    </div>
  );
};

export default EventCard;
