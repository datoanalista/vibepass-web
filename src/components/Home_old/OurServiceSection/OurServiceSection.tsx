"use client";
import React from "react";
import styles from "./OurServiceSection.module.css";

const OurServiceSection: React.FC = () => {
  return (
    <div className={styles.serviceSection}>
      <div className={styles.serviceTitle}>Nuestro servicio</div>
      <div className={styles.serviceSubtitle}>¿Qué hacemos?</div>
      <div className={styles.serviceList}>
        <div className={styles.serviceItem}>
          <div className={styles.serviceItemText}>Fiesta de apoderados</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/75c89fb727e88680b72f4694c87e01083878b24f?width=41"
            alt="Vector"
            className={styles.serviceArrow}
          />
        </div>
        <div className={styles.serviceDivider} />
        <div className={styles.serviceItem}>
          <div className={styles.serviceItemText}>Kermesse</div>
          <svg
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.serviceArrowInactive}
          >
            <path
              d="M11.4856 29.5869L25.2545 13.4754L11.8705 14.5247L11.6265 11.4122L30.3018 9.948L31.7659 28.6232L28.6534 28.8673L27.6041 15.4833L13.8352 31.5949L11.4856 29.5869Z"
              fill="#424040"
            />
          </svg>
        </div>
        <div className={styles.serviceDivider} />
        <div className={styles.serviceItem}>
          <div className={styles.serviceItemText}>Cine</div>
          <svg
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.serviceArrowInactive}
          >
            <path
              d="M11.4856 29.5869L25.2545 13.4754L11.8705 14.5247L11.6265 11.4122L30.3018 9.948L31.7659 28.6232L28.6534 28.8673L27.6041 15.4833L13.8352 31.5949L11.4856 29.5869Z"
              fill="#424040"
            />
          </svg>
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed94816b68d099904614001babc35b83b2575fdc?width=960"
        alt="Mask group"
        className={styles.serviceImage}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4390587cdb994ca9c897205b3f16f0f35f7fefc3?width=3456"
        alt="Diseño sin título (10) 1"
        className={styles.serviceBackgroundImage}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc2f98c619c7216d5b44838939ada86899f661c3?width=381"
        alt="paper-transparent-sticky-tape-png 5"
        className={styles.serviceTape1}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/13bf74d51dbe135bd5ea65d1b70bf3edfe31bc14?width=381"
        alt="paper-transparent-sticky-tape-png 4"
        className={styles.serviceTape2}
      />
    </div>
  );
};

export default OurServiceSection;
