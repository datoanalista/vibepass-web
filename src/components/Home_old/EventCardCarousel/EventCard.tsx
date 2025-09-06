"use client";
import React from "react";
import styles from "./EventCard.module.css";
import CardHeader from "./CardHeader";
import FeatureList, { FeatureItem } from "./FeatureList";

interface EventCardProps {
  type: string;
  icon: React.ReactNode;
  description: string;
  features: FeatureItem[];
  ctaText: string;
  ctaColor: string;
  readyText: string;
}

const EventCard: React.FC<EventCardProps> = ({
  type,
  icon,
  description,
  features,
  ctaText,
  ctaColor,
  readyText,
}) => (
  <div className={styles.card}>
    <CardHeader icon={icon} type={type} />
    <div className={styles.cardContent}>
      <p className={styles.description}>{description}</p>
      <FeatureList features={features} />
      <p className={styles.readyText}>{readyText}</p>
      <button
        className={styles.ctaButton}
        style={{ backgroundColor: ctaColor }}
      >
        {ctaText}
      </button>
    </div>
  </div>
);

export default EventCard;
