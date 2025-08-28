"use client";
import React from "react";
import styles from "./EventHeader.module.css";

interface EventHeaderProps {
  eventName?: string;
  schoolName?: string;
  schoolFlag?: string;
}

export default function EventHeader({
  eventName = "Salto Fest",
  schoolName = "British Royal",
  schoolFlag = "https://cdn.builder.io/api/v1/image/assets/TEMP/68fdc1bd58d7c9a2a4c66d83b2e3a4b2af4e3f98?placeholderIfAbsent=true",
}: EventHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.eventTitle}>
        <span className={styles.eventLabel}>Evento</span> - ''{eventName}''
      </div>

      <div className={styles.schoolSection}>
        <div className={styles.flagContainer}>
          <img
            src={schoolFlag}
            alt="School Flag"
            className={styles.flagImage}
          />
        </div>
        <div className={styles.schoolName}>{schoolName}</div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1a7cfb859473bf7b7c94c59b10ce7e5b6f2c8aa?placeholderIfAbsent=true"
          alt="Dropdown"
          className={styles.dropdownIcon}
        />
      </div>
    </div>
  );
}
