"use client";
import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <>

      {/* Footer */}
      <div className={styles.footerSection}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cb9f5c21fead88b4c6bd1cd170d2b200261ace6?width=6770"
          alt="Group 296"
          className={styles.footerBackground}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9580be391e8c795c434c9e84b350a3f15475513?width=902"
          alt="Untitled design 1"
          className={styles.footerLogo}
        />
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.footerBrandBackground} />
            <div className={styles.footerBrandText}>Vibepass</div>
          </div>
          <div className={styles.footerInfo}>
            <div className={styles.footerInfoTitle}>Sigue los eventos</div>
            <div className={styles.footerInfoDescription}>
              Si te interesa cómo transformamos la experiencia en los eventos,
              síguenos en nuestras redes y entérate de todo lo que viene.
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6983c09774d88868afa1ac2f45af8a0377355ea9?width=448"
              alt="Group 176"
              className={styles.footerSocialIcons}
            />
          </div>
          <div className={styles.footerContact}>
            <div className={styles.footerContactTitle}>Contacto</div>
            <div className={styles.footerContactEmail}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/534eed49a94adeea1480017af993fa0add071181?width=64"
                alt="Group 160"
                className={styles.footerContactIcon}
              />
              <div className={styles.footerContactEmailText}>
                Vibepass@ticketera.cl
              </div>
            </div>
            <div className={styles.footerPaymentLogos}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/90f27cab9437ea6abd9cccaea43ea4c929123012?width=332"
                alt="mercado-pago-logo-0 1"
                className={styles.footerPaymentLogo}
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb828c2b527764586650f0fa2b062ac8d3be26e1?width=226"
                alt="logo-webpay-transparente 1"
                className={styles.footerPaymentLogo}
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bc00f39ae645f8e7364af3df5ebd69f4299477d?width=224"
                alt="226456 1"
                className={styles.footerPaymentLogo}
              />
            </div>
          </div>
        </div>
        <div className={styles.footerCopyright}>
          <div className={styles.footerCopyrightText}>
            Copyright © 2025 Vibepass.
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
