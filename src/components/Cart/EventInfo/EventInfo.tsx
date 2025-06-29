"use client";
import React from "react";
import styles from "./EventInfo.module.css";

const EventInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.eventDetails}>
          <div className={styles.eventTitle}>
            <span style={{ fontWeight: 700 }}>SALTO FEST</span> - Evento escolar
          </div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/758105684429123437fc2fedd682961483aace15?placeholderIfAbsent=true"
          alt="Vibepass Logo"
          className={styles.logo}
        />
      </div>
    </div>
  );
};

export default EventInfo;
