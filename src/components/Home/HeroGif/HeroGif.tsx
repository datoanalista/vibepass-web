"use client";
import React from "react";
import styles from "./HeroGif.module.css";

const HeroGif: React.FC = () => {
  return (
    <div className={styles.container}>
      <img
        src="/gif/heroGif.gif"
        alt="Decoración de encabezado"
        className={styles.heroGif}
      />
    </div>
  );
};

export default HeroGif;
