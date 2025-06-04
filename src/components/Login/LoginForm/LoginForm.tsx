"use client";
import React, { useState } from "react";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formContent}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Rut</label>
          <input type="text" className={styles.inputField} placeholder="" />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Contraseña</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.passwordInput}
              placeholder=""
            />
            <div className={styles.passwordToggle}>
              <div className={styles.divider} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfa6a0e7abe6268a1055e1fa17c830b8d5bdcf96?placeholderIfAbsent=true"
                  alt="Toggle password visibility"
                  className={styles.eyeIcon}
                />
              </button>
            </div>
          </div>
        </div>

        <button className={styles.loginButton}>Ingresar</button>
      </div>

      <div className={styles.separator} />

      <div className={styles.footerLinks}>
        <div className={styles.forgotPassword}>¿Olvidaste tu contraseña?</div>
        <div className={styles.createAccount}>
          <span className={styles.noAccountText}>¿No tienes cuenta?</span>
          <span className={styles.createAccountLink}>Crear cuenta</span>
        </div>
      </div>
    </div>
  );
}
