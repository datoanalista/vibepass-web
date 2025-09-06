"use client";
import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection: React.FC = () => {
  return (
    <>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8454ad5eccea9619e5f5b366c0edeef60cc93fc?width=3047"
        alt="Diseño sin título (6) 1"
        className={styles.heroImage}
      />

      <div className={styles.eventTypeTitle}>¿Qué tipo de evento buscai?</div>
    </>
  );
};

export default HeroSection;
