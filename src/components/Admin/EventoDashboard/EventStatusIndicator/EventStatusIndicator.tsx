"use client";
import React from "react";
import styles from "./EventStatusIndicator.module.css";

interface EventStatusIndicatorProps {
  isActive?: boolean;
  text?: string;
}

export default function EventStatusIndicator({
  isActive = true,
  text = "Evento activo",
}: EventStatusIndicatorProps) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.indicator} ${isActive ? styles.active : styles.inactive}`}
      />
      <div className={styles.text}>{text}</div>
    </div>
  );
}
