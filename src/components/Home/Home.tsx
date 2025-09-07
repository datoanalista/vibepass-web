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
      
      {/* Sección QR - Simple */}
      <section style={{ 
        width: '100%', 
        margin: '80px 0 60px 0', 
        padding: '0',
        backgroundColor: '#FFFFFF'
      }}>
        <img
          src={getImagePath("/images/QRsection.svg")}
          alt="¿Cómo utilizar tu código QR?"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </section>
      
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
