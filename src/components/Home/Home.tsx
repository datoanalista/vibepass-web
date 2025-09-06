"use client";
import React from "react";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Universal Header */}
      <UniversalHeader />
      
      {/* Hero GIF debajo del header */}
      <div className={styles.heroGifContainer}>
        <img
          src="/gif/heroGif.gif"
          alt="Decoración de encabezado"
          className={styles.heroGif}
        />
      </div>

      {/* Contenido temporal */}
      <main className={styles.mainContent}>
        <div className={styles.constructionSection}>
          <h1 className={styles.constructionTitle}>Sitio en construcción</h1>
          <p className={styles.constructionText}>
            Estamos trabajando en una nueva experiencia para ti.
          </p>
          <div className={styles.constructionIcon}>
            🚧
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
