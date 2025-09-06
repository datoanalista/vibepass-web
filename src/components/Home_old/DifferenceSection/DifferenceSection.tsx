"use client";
import React from "react";
import styles from "./DifferenceSection.module.css";

const DifferenceSection: React.FC = () => {
  return (
    <div className={styles.benefitsSection}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e457bf1db6fd200e5fe94db56507617a60e0af7b?width=3456"
        alt="Diseño sin título (7) 1"
        className={styles.benefitsBackground}
      />
      <div className={styles.benefitsTitle}>Nuestra diferencia</div>
      <svg
        width="148"
        height="9"
        viewBox="0 0 148 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.benefitsUnderline}
      >
        <path
          d="M0 4.5C0 2.01472 2.01472 0 4.5 0H143.5C145.985 0 148 2.01472 148 4.5C148 6.98528 145.985 9 143.5 9H4.5C2.01472 9 0 6.98528 0 4.5Z"
          fill="url(#paint0_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="0"
            y1="4.5"
            x2="148"
            y2="4.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#05A9E2" />
            <stop offset="1" stopColor="#A5B9DB" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.benefitsCards}>
        <div className={styles.benefitCard}>
          <div
            className={`${styles.benefitBackground} ${styles.benefitBackground1}`}
          />
          <div className={styles.benefitHeader}>
            <div className={styles.benefitTag}>Práctico</div>
            <div className={styles.benefitIconWrapper}>
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="22" cy="22" r="22" fill="white" />
              </svg>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6fc278d3f9bdc3d98b87a8a237790c8634c305e?width=70"
                alt="fluent:phone-screen-time-20-filled"
                className={styles.benefitIcon}
              />
            </div>
          </div>
          <div className={styles.benefitContent}>
            <span className={styles.benefitStrong}>
              Tu QR maestro lo guarda todo:
            </span>
            Desde tu entrada hasta cada producto que compraste. Olvídate de
            tickets perdidos y vive una experiencia sin errores.
          </div>
        </div>
        <div className={styles.benefitCard}>
          <div
            className={`${styles.benefitBackground} ${styles.benefitBackground2}`}
          />
          <div className={styles.benefitHeader}>
            <div className={styles.benefitTag}>Rápido</div>
            <div className={styles.benefitIconWrapper}>
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="22" cy="22" r="22" fill="white" />
              </svg>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9491a33db92b66df7403bee29196e3e310a29e28?width=78"
                alt="material-symbols:fast-forward"
                className={styles.benefitIcon}
              />
            </div>
          </div>
          <div className={styles.benefitContent}>
            <span className={styles.benefitStrong}>
              El ingreso sucede en segundos:
            </span>
            Al escanear tu QR, el sistema valida tu entrada y registra tus
            productos al instante.
          </div>
        </div>
        <div className={styles.benefitCard}>
          <div
            className={`${styles.benefitBackground} ${styles.benefitBackground3}`}
          />
          <div className={styles.benefitHeader}>
            <div className={styles.benefitTag}>Organizado</div>
            <div className={styles.benefitIconWrapper}>
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="22" cy="22" r="22" fill="white" />
              </svg>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c407159c998897afc8386ac47e8a70c24204d07?width=56"
                alt="material-symbols:category"
                className={styles.benefitIcon}
              />
            </div>
          </div>
          <div className={styles.benefitContent}>
            <span className={styles.benefitStrong}>
              Una experiencia sin estrés:
            </span>
            Con tu QR maestro accedes al evento, canjeas tus productos y evitas
            filas. Una experiencia sin complicaciones.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferenceSection;
