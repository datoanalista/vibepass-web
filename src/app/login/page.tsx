"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Header from "@/components/Shared/Header/Header";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      {/* Header Section */}
        <Header />


      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          {/* Top Arrow Icon */}
          <div className={styles.topArrowIcon}>
            <svg
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrowIcon}
            >
              <path
                d="M14.435 17.9449C14.2809 18.0977 14.2033 18.2763 14.2024 18.481C14.2014 18.6856 14.2773 18.865 14.4301 19.0191L18.7074 23.3358C18.962 23.5928 19.243 23.658 19.5506 23.5315C19.8581 23.405 20.0127 23.1627 20.0143 22.8047L20.0537 14.2107C20.0553 13.8526 19.903 13.6089 19.5966 13.4796C19.2903 13.3504 19.0086 13.413 18.7517 13.6676L14.435 17.9449ZM3.15299 18.4303C3.16271 16.3074 3.57495 14.3142 4.3897 12.4508C5.20445 10.5874 6.30507 8.96821 7.69154 7.59336C9.07802 6.21851 10.7072 5.13278 12.579 4.33617C14.4509 3.53955 16.4478 3.1456 18.5697 3.1543C20.6916 3.163 22.6847 3.57523 24.5492 4.39101C26.4137 5.20679 28.0328 6.3074 29.4066 7.69285C30.7805 9.0783 31.8662 10.7075 32.6638 12.5803C33.4615 14.4532 33.8554 16.4501 33.8457 18.571C33.836 20.6918 33.4237 22.685 32.609 24.5505C31.7942 26.416 30.6936 28.0351 29.3071 29.4079C27.9207 30.7807 26.2915 31.867 24.4196 32.6667C22.5478 33.4664 20.5509 33.8598 18.429 33.847C16.3072 33.8342 14.314 33.422 12.4495 32.6103C10.585 31.7986 8.96586 30.698 7.59205 29.3085C6.21824 27.9189 5.132 26.2897 4.33332 24.4209C3.53465 22.5522 3.14121 20.5553 3.15299 18.4303Z"
                fill="#1B2735"
              />
            </svg>
          </div>

          {/* Form Header */}
          <div className={styles.formHeader}>
            <div className={styles.formHeaderText}>Ingrese sus datos</div>
          </div>

          {/* Form Container */}
          <div className={styles.formContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Rut</label>
              <div className={styles.inputField}>
                <div className={styles.inputPlaceholder}>Escriba su RUT</div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Contraseña</label>
              <div className={styles.passwordInputContainer}>
                <div className={styles.inputPlaceholder}>
                  Escriba su contraseña
                </div>
                <div className={styles.eyeIconContainer}>
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.eyeIcon}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.5 20.025C18.0382 20.025 22.1468 17.4937 24.354 13.5C22.1468 9.50625 18.0382 6.975 13.5 6.975C8.96175 6.975 4.85325 9.50625 2.646 13.5C4.85325 17.4937 8.96175 20.025 13.5 20.025ZM13.5 5.625C18.909 5.625 23.5935 8.829 25.875 13.5C23.5935 18.171 18.909 21.375 13.5 21.375C8.091 21.375 3.4065 18.171 1.125 13.5C3.4065 8.829 8.091 5.625 13.5 5.625ZM13.5 16.65C14.3354 16.65 15.1366 16.3181 15.7274 15.7274C16.3181 15.1366 16.65 14.3354 16.65 13.5C16.65 12.6646 16.3181 11.8634 15.7274 11.2726C15.1366 10.6819 14.3354 10.35 13.5 10.35C12.6646 10.35 11.8634 10.6819 11.2726 11.2726C10.6819 11.8634 10.35 12.6646 10.35 13.5C10.35 14.3354 10.6819 15.1366 11.2726 15.7274C11.8634 16.3181 12.6646 16.65 13.5 16.65ZM13.5 18C12.3065 18 11.1619 17.5259 10.318 16.682C9.47411 15.8381 9 14.6935 9 13.5C9 12.3065 9.47411 11.1619 10.318 10.318C11.1619 9.47411 12.3065 9 13.5 9C14.6935 9 15.8381 9.47411 16.682 10.318C17.5259 11.1619 18 12.3065 18 13.5C18 14.6935 17.5259 15.8381 16.682 16.682C15.8381 17.5259 14.6935 18 13.5 18Z"
                      fill="#747272"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button className={styles.loginButton}>
              <div className={styles.loginButtonText}>Ingresar</div>
            </button>
          </div>

          {/* Footer Links */}
          <div className={styles.footerLinks}>
            <div className={styles.forgotPasswordText}>
              ¿Olvidaste tu contraseña?
            </div>
            <div className={styles.noAccountText}>¿No tienes cuenta?</div>
            <div className={styles.createAccountText}>Crear cuenta</div>
          </div>

          {/* Bottom Arrow Icon */}
          <div className={styles.bottomArrowIcon}>
            <svg
              width="37"
              height="37"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrowIconBottom}
            >
              <path
                d="M17.9561 22.5791C18.1087 22.7334 18.2873 22.8111 18.492 22.8122C18.6966 22.8133 18.876 22.7376 19.0303 22.5849L23.3505 18.3112C23.6077 18.0569 23.6732 17.7758 23.5469 17.4682C23.4207 17.1606 23.1786 17.0058 22.8205 17.0039L14.2265 16.9574C13.8685 16.9555 13.6247 17.1076 13.4951 17.4138C13.3656 17.7201 13.428 18.0018 13.6824 18.2589L17.9561 22.5791ZM18.4322 33.8616C16.3093 33.8501 14.3164 33.4362 12.4537 32.6199C10.5909 31.8036 8.97265 30.7016 7.59895 29.314C6.22525 27.9264 5.14087 26.2963 4.34581 24.4238C3.55075 22.5513 3.15845 20.5541 3.16891 18.4322C3.17937 16.3103 3.59326 14.3175 4.41059 12.4537C5.22791 10.5899 6.32987 8.9717 7.71646 7.59902C9.10304 6.22634 10.7331 5.14196 12.6066 4.34588C14.4802 3.5498 16.4774 3.1575 18.5982 3.16898C20.7191 3.18046 22.7119 3.59435 24.5768 4.41065C26.4416 5.22696 28.0598 6.32892 29.4315 7.71652C30.8031 9.10413 31.888 10.7342 32.6861 12.6067C33.4843 14.4793 33.876 16.4765 33.8615 18.5983C33.8469 20.7202 33.4331 22.713 32.6198 24.5768C31.8066 26.4406 30.7046 28.0589 29.314 29.4315C27.9233 30.8042 26.2932 31.8891 24.4238 32.6862C22.5543 33.4833 20.5571 33.8751 18.4322 33.8616Z"
                fill="#1B2735"
              />
            </svg>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/237729148aaeef14694839154b977fc06214719f?width=2320"
            alt="Login illustration"
            className={styles.mainImage}
          />
        </div>
      </div>

      {/* Wave Divider */}
      <div className={styles.waveDivider}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/43a2bb6529733878f0c7b639d3bcc5d19a591219?width=6759"
          alt="Wave divider"
          className={styles.waveImage}
        />
      </div>

      {/* Benefits Section */}
      <div className={styles.benefitsSection}>
        <div className={styles.contactInfo}>
          <div className={styles.contactTitle}>¿Tienes alguna pregunta?</div>
          <div className={styles.contactText}>
            Escríbenos
            <div className={styles.emailHighlight}>contato@vibepass.cl</div>
          </div>
        </div>

        <div className={styles.benefitsSectionTitle}>
          ¿Cuáles son mis beneficios al registrarme?
        </div>

        <div className={styles.benefitsGrid}>
          {/* Benefit 1 */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitHeader}>
              <div className={styles.benefitHeaderText}>
                Accede fácilmente a tus tickets
              </div>
            </div>
            <div className={styles.benefitContent}>
              Guarda y descarga tus entradas cuando quieras, desde tu perfil.
            </div>
          </div>

          {/* Benefit 2 */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitHeader}>
              <div className={styles.benefitHeaderText}>
                Historial de compras y acceso rápido
              </div>
            </div>
            <div className={styles.benefitContentBlue}>
              Revisa tus eventos anteriores y recupera tickets en segundos.
            </div>
          </div>

          {/* Benefit 3 */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitHeader}>
              <div className={styles.benefitHeaderText}>
                Mayor seguridad y respaldo
              </div>
            </div>
            <div className={styles.benefitContentOrange}>
              Protege tus entradas con un registro seguro y evita pérdidas por
              errores en el correo.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fb49b451d4ecf5080ed6dda05deddb126270c20?width=552"
          alt="Vibepass Logo"
          className={styles.footerLogo}
        />
        <div className={styles.copyright}>Copyright © 2025 Vibepass.</div>
      </div>
    </div>
  );
}
