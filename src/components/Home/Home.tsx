"use client";
import React from "react";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import EventTypesSection from "./EventTypesSection/EventTypesSection";
import styles from "./Home.module.css";
import { getImagePath } from "@/utils/getImagePath";

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Universal Header */}
      <UniversalHeader />
      
      {/* Hero GIF debajo del header */}
      <div className={styles.heroGifContainer}>
        <img
          src={getImagePath("/gif/heroGif.gif")}
          alt="Decoración de encabezado"
          className={styles.heroGif}
        />
      </div>

      {/* Sección de tipos de eventos */}
      <EventTypesSection />
      
      {/* Contenido temporal para otras secciones */}
      <main className={styles.mainContent}>
        <div className={styles.constructionSection}>
          <h1 className={styles.constructionTitle}>Más secciones próximamente</h1>
          <p className={styles.constructionText}>
            Continuaremos construyendo el resto de la página.
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
