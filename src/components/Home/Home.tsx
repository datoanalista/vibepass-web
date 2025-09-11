"use client";
import React, { useEffect } from "react";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import Footer from "@/components/Shared/Footer/Footer";
import EventTypesSection from "./EventTypesSection/EventTypesSection";
import DifferencesSection from "./DifferencesSection/DifferencesSection";
import ServiceSection from "./ServiceSection/ServiceSection";
import QuoteSection from "./QuoteSection/QuoteSection";
import PartnersSection from "./PartnersSection/PartnersSection";
import styles from "./Home.module.css";
import { getImagePath } from "@/utils/getImagePath";

const Home: React.FC = () => {
  // Manejar scroll a sección específica cuando se navega con hash
  useEffect(() => {
    const hash = window.location.hash;
    const sectionMap: { [key: string]: string } = {
      '#cotizacion': 'cotizacion',
      '#servicio': 'servicio',
      '#qr': 'qr'
    };
    
    const sectionId = sectionMap[hash];
    if (sectionId) {
      // Pequeño delay para asegurar que el DOM esté renderizado
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, []);
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
      <section id="qr" style={{ 
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
      
      {/* Sección Nuestra Diferencia */}
      <DifferencesSection />
      
      {/* Sección Conoce Nuestro Servicio */}
      <ServiceSection />
      
      {/* Sección Cotiza con Nosotros */}
      <QuoteSection />
      
      {/* Sección Ellos Confían en Nosotros */}
      <PartnersSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
