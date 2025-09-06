"use client";
import React from "react";
import styles from "./EventCard.module.css";

interface FeatureItem {
  icon: React.ReactNode;
  text: string;
}

interface EventCardProps {
  type: "apoderados" | "kermesse" | "cine";
  title: string;
  description: string;
  features: FeatureItem[];
  ctaText: string;
}

const EventCard: React.FC<EventCardProps> = ({
  type,
  title,
  description,
  features,
  ctaText,
}) => {
  const cardClasses = [
    styles.eventCard,
    type === "kermesse" ? styles.kermesseCard : "",
  ]
    .filter(Boolean)
    .join(" ");

  const backgroundClasses = [
    styles.eventCardBackground,
    type === "kermesse" ? styles.kermesseBackground : "",
  ]
    .filter(Boolean)
    .join(" ");

  const buttonClasses = [
    styles.eventCardButton,
    type === "kermesse" ? styles.kermesseButton : "",
  ]
    .filter(Boolean)
    .join(" ");

  const buttonTextClasses = [
    styles.eventCardButtonText,
    type === "kermesse" ? styles.kermesseButtonText : "",
  ]
    .filter(Boolean)
    .join(" ");

  const featuresClasses = [
    styles.eventCardFeatures,
    type === "kermesse" ? styles.kermesseFeatures : "",
  ]
    .filter(Boolean)
    .join(" ");

  const getIcon = () => {
    switch (type) {
      case "apoderados":
        return (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3968c44c895b26c8e5c79f94baaf39e91d19497b?width=44"
            alt="fluent:person-24-filled"
            className={styles.eventCardIcon}
          />
        );
      case "kermesse":
        return (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/37cf61ec3fd17dbcd74e1d38033107fe8e406d61?width=48"
            alt="tabler:building-circus"
            className={styles.eventCardIcon}
          />
        );
      case "cine":
        return (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8180e284ad26a50cb3d1a1f9ab996cc57c71a52?width=46"
            alt="Group 183"
            className={styles.eventCardIcon}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cardClasses}>
      <div className={backgroundClasses} />
      <div className={styles.eventCardHeader}>
        {getIcon()}
        <div className={styles.eventCardTitle}>{title}</div>
      </div>
      <div className={styles.eventCardDescription}>{description}</div>
      <div className={buttonClasses}>
        <div className={buttonTextClasses}>Ver eventos</div>
      </div>
      <div className={featuresClasses}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            {feature.icon}
            <div
              className={`${styles.featureText} ${type === "kermesse" ? styles.kermesseFeatureText : ""}`}
            >
              {feature.text}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.eventCardCta}>{ctaText}</div>
    </div>
  );
};

export default EventCard;
