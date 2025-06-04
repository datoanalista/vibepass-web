"use client";
import React from "react";
import styles from "./styles.module.css";
import LoginForm from "@/components/Login/LoginForm/LoginForm";
import BenefitsSection from "@/components/Login/BenefitsSection/BenefitsSection";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header} />

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/014a8ad2fbf77f580b01eefe9061a3c77423e149?placeholderIfAbsent=true"
            alt="Icon"
            className={styles.topIcon}
          />
          <LoginForm />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b916b45693aa84529c1c699ff8bde3981a2accfe?placeholderIfAbsent=true"
            alt="Bottom Icon"
            className={styles.bottomIcon}
          />
        </div>
        <div className={styles.rightColumn}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/09305a6ee552d88d618cff80f1e50a4e1bcc8302?placeholderIfAbsent=true"
            alt="Login illustration"
            className={styles.mainImage}
          />
        </div>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/81cc57f96cdb06d350d236a45f8a621bc86089be?placeholderIfAbsent=true"
        alt="Divider"
        className={styles.divider}
      />

      <div className={styles.footerSection}>
        <div className={styles.contactInfo}>
          <h2 className={styles.contactTitle}>¿Tienes alguna pregunta?</h2>
          <p className={styles.contactText}>
            Escríbenos{" "}
            <span className={styles.emailHighlight}>contato@vibepass.cl</span>
          </p>
        </div>

        <BenefitsSection />

        <footer className={styles.footer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bbdb876d9c3d40bb01a6fc8741bd8c1cb9c067a?placeholderIfAbsent=true"
            alt="Vibepass Logo"
            className={styles.footerLogo}
          />
          <div className={styles.copyright}>Copyright © 2025 Vibepass.</div>
        </footer>
      </div>
    </div>
  );
}
