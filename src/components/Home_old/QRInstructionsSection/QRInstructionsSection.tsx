"use client";
import React from "react";
import styles from "./QRInstructionsSection.module.css";

const QRInstructionsSection: React.FC = () => {
  return (
    <div className={styles.qrSection}>
      <div className={styles.qrBackground}>
        <svg
          width="797"
          height="781"
          viewBox="0 0 797 781"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.bgShape1}
        >
          <path
            d="M-71 144.963L511.337 0L797.001 25.5491L671 703.5L-58.5 781L-71 144.963Z"
            fill="#B0BBDB"
          />
        </svg>
        <svg
          width="236"
          height="626"
          viewBox="0 0 236 626"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.bgShape2}
        >
          <path
            d="M0.817383 59.4007L251.001 0.5L234.192 625.924L9.4185 605.166L0.817383 59.4007Z"
            fill="#B0BBDB"
          />
        </svg>
        <svg
          width="658"
          height="695"
          viewBox="0 0 658 695"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.bgShape3}
        >
          <path
            d="M6 129L513.492 0.442017L658 694.5H-22L6 129Z"
            fill="#1B2735"
          />
        </svg>
        <svg
          width="1240"
          height="695"
          viewBox="0 0 1240 695"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.bgShape4}
        >
          <path
            d="M0.941406 0.442017L1239.62 62.6485L1220.5 695H137L0.941406 0.442017Z"
            fill="#1B2735"
          />
        </svg>
        <svg
          width="242"
          height="676"
          viewBox="0 0 242 676"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.bgShape5}
        >
          <path
            d="M0.822266 43.6485L258.5 0.5V645.5L54.5 676L0.822266 43.6485Z"
            fill="#1B2735"
          />
        </svg>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/860388819c7222a6f5759134d8f5090e0a314484?width=2810"
        alt=""
        className={styles.qrBackgroundImage}
      />
      <div className={styles.qrContent}>
        <div className={styles.qrTitle}>¿Cómo utilizar tu código QR?</div>
        <div className={styles.qrUnderline} />
        <div className={styles.qrSteps}>
          <div className={styles.qrStep}>
            <div className={styles.stepNumber}>
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="23.0396"
                  cy="22.9634"
                  rx="22.5669"
                  ry="22.772"
                  fill="#01A8E2"
                />
              </svg>
              <div className={styles.stepNumberText}>1</div>
            </div>
            <div className={styles.stepText}>
              Compra tu acceso en la plataforma para el evento elegido.
            </div>
          </div>
          <div className={styles.qrStep}>
            <div className={styles.stepNumber}>
              <svg
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="23.0396"
                  cy="23.4872"
                  rx="22.5669"
                  ry="22.772"
                  fill="#01A8E2"
                />
              </svg>
              <div className={styles.stepNumberText}>2</div>
            </div>
            <div className={styles.stepText}>
              Llega al evento y muestra tu QR al personal encargado de la
              verificación.
            </div>
          </div>
          <div className={styles.qrStep}>
            <div className={styles.stepNumber}>
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="23.0396"
                  cy="23.1217"
                  rx="22.5669"
                  ry="22.772"
                  fill="#01A8E2"
                />
              </svg>
              <div className={styles.stepNumberText}>3</div>
            </div>
            <div className={styles.stepText}>
              Disfruta de todas las experiencias y servicios que adquiriste, sin
              complicaciones.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRInstructionsSection;
