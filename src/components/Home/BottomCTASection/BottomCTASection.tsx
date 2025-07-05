"use client";
import React from "react";
import styles from "./BottomCTASection.module.css";

const BottomCTASection: React.FC = () => {
  return (
    <div className={styles.bottomSection}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/21f85fb053c985e6ba127d02a5c9932d3f00a096?width=5212"
        alt="Group 293"
        className={styles.bottomBackground}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f28e747f805adb2d3fabd2170090984ac862af41?width=2372"
        alt="Diseño sin título (1) 2"
        className={styles.bottomBackgroundImage}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f0b79d30084af44839a0d716a5ea985f35a8e25?width=547"
        alt="Clip path group"
        className={styles.bottomLogo}
      />
      <div className={styles.bottomContent}>
        <div className={styles.bottomTitle}>
          Rápido, digital y totalmente tuyo
        </div>
        <div className={styles.bottomDescription}>
          Transformamos la forma de vivir los eventos.
          <div className={styles.bottomHighlight}>
            Sin filas, solo un código QR
          </div>
          y la mejor experiencia. Ayudamos a empresas y marcas a gestionar sus
          eventos de forma rápida y sin complicaciones.
        </div>
        <div className={styles.bottomButton}>
          <div className={styles.bottomButtonText}>Cotiza con nosotros</div>
        </div>
      </div>
    </div>
  );
};

export default BottomCTASection;
