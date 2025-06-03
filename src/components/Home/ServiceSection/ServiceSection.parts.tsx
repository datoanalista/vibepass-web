import React from "react";
import styles from "./ServiceSection.module.css";
import { logosPartners } from "@/data/Home/logosPartners";

// Imagen con cintas
export const ServiceImage = () => (
  <div className={styles.serviceImageContainer}>
    <img
      src="/images/bannerKermesse.png"
      alt="Banner Kermesse"
      className={styles.servicePlaceholder}
    />
    <div className={styles.tapePlaceholder}></div>
    <div className={styles.tapePlaceholder}></div>
  </div>
);

// Lado izquierdo
export const ServiceRight = () => (
  <div className={styles.serviceRight}>
    <h3 className={styles.subheading}>¿Qué hacemos?</h3>
    <h2 className={styles.headingService}>Nuestro servicio</h2>
    <ServiceImage />
  </div>
);

// Lado derecho
export const ServiceLeft = () => (
  <div className={styles.serviceLeft}>
    <div className={styles.experienceList}>
      <div className={styles.experienceItemActive}>Fiesta de apoderados</div>
      <div className={styles.experienceItem}>Kermesse</div>
      <div className={styles.experienceItem}>Cine</div>
    </div>
  </div>
);

// Sección app
export const AppPromo = () => (
  <div className={styles.appPromoSection}>
        <div className={styles.appPreviewContainer}>
    <img
      src="/images/bannerPhone.png"
      alt="Banner Phone"
      className={styles.appPreviewPlaceholder}
    />
    </div>
    <div className={styles.promoContent}>
      <h2 className={styles.headingPromo}>Rápido, digital y totalmente tuyo</h2>
      <p className={styles.promoText}>
        Transformamos la forma de vivir los eventos. Sin filas, solo un código
        QR y la mejor experiencia. Ayudamos a empresas y marcas a gestionar sus
        eventos de forma rápida y sin complicaciones.
      </p>
      <button className={styles.ctaButton}>Cotiza con nosotros</button>
    </div>
  </div>
);

// Sección partners
export const Partners = () => (
  <div className={styles.partnersSection}>
    <h2 className={styles.heading}>Ellos confían en nosotros</h2>
    <div className={styles.partnersLogos}>
      {logosPartners.map((logo, index) => (
        <img
          key={index}
          src={logo}
          alt={`Logo ${index + 1}`}
          className={styles.partnerLogo}
        />
      ))}
    </div>
  </div>
);
