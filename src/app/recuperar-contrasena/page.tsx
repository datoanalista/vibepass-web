"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import { API_ENDPOINTS } from "@/config/api";
import { getImagePath } from "@/utils/getImagePath";
import styles from "./page.module.css";

const buildHeaders = (endpoint: string) => ({
  "Content-Type": "application/json",
  ...(endpoint.includes("ngrok") && {
    "ngrok-skip-browser-warning": "true",
  }),
});

const backgroundStyles = {
  "--login-bg-1": `url('${getImagePath("/images/cine_stgo_college.png")}')`,
  "--login-bg-2": `url('${getImagePath("/images/KERMESSE_SAN_BENITO.png")}')`,
  "--login-bg-3": `url('${getImagePath("/images/navidad_2025.png")}')`,
} as React.CSSProperties;

function RecoveryPageFallback() {
  return (
    <div className={styles.container} style={backgroundStyles}>
      <UniversalHeader />
      <div className={styles.mainContent}>
        <div className={styles.recoveryCard}>
          <div className={styles.formHeader}>
            <span className={styles.badge}>Recuperar acceso</span>
            <h1 className={styles.title}>Cargando recuperación</h1>
            <p className={styles.description}>Estamos preparando tu formulario.</p>
          </div>
        </div>
      </div>
      <div className={styles.footerBar}>
        <div className={styles.footerIcons}>
          <span className={styles.footerIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" className={styles.footerSvg}>
              <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
            </svg>
          </span>
          <span className={styles.footerIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" className={styles.footerSvg}>
              <path
                d="M14 4v8.2a3.8 3.8 0 1 1-2-3.3V6.2l7 1.4V5.2l-5-1.2Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function RecoveryPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const isResetMode = Boolean(token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRequestReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: "POST",
        headers: buildHeaders(API_ENDPOINTS.FORGOT_PASSWORD),
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setSuccessMessage(
          result.message ||
            "Si encontramos tu cuenta, te enviaremos un correo con instrucciones para recuperar tu acceso."
        );
        setEmail("");
      } else {
        setErrorMessage(result.message || "No pudimos procesar la solicitud. Inténtalo nuevamente.");
      }
    } catch (error) {
      setErrorMessage("Error de conexión. Verifica tu internet e inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
        method: "POST",
        headers: buildHeaders(API_ENDPOINTS.RESET_PASSWORD),
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setSuccessMessage(
          result.message || "Tu contraseña fue actualizada. Ya puedes iniciar sesión."
        );
        setPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(result.message || "No pudimos actualizar tu contraseña.");
      }
    } catch (error) {
      setErrorMessage("Error de conexión. Verifica tu internet e inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={styles.container}
      style={backgroundStyles}
    >
      <UniversalHeader />

      <div className={styles.mainContent}>
        <div className={styles.recoveryCard}>
          <div className={styles.formHeader}>
            <span className={styles.badge}>
              {isResetMode ? "Nueva contraseña" : "Recuperar acceso"}
            </span>
            <h1 className={styles.title}>
              {isResetMode ? "Crea una nueva contraseña" : "Recupera tu cuenta"}
            </h1>
            <p className={styles.description}>
              {isResetMode
                ? "Ingresa una nueva contraseña para volver a entrar a Vibepass."
                : "Te enviaremos un correo con un enlace seguro para restablecer tu contraseña."}
            </p>
          </div>

          <div className={styles.infoBox}>
            {isResetMode
              ? "Por seguridad, este enlace vence en poco tiempo. Si expiró, puedes solicitar uno nuevo."
              : "Usa el mismo correo con el que creaste tu cuenta en Vibepass."}
          </div>

          <form
            onSubmit={isResetMode ? handleResetPassword : handleRequestReset}
            className={styles.form}
          >
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

            {!isResetMode ? (
              <div className={styles.inputGroup}>
                <label className={styles.label}>Correo</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={styles.input}
                  placeholder="jose@gmail.com"
                  required
                />
              </div>
            ) : (
              <>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Nueva contraseña</label>
                  <div className={styles.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className={styles.passwordInput}
                      placeholder="••••••••"
                      minLength={6}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={styles.eyeButton}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Confirmar contraseña</label>
                  <div className={styles.passwordContainer}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      className={styles.passwordInput}
                      placeholder="••••••••"
                      minLength={6}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={styles.eyeButton}
                    >
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className={`${styles.submitButton} ${isLoading ? styles.loading : ""}`}
              disabled={isLoading}
            >
              {isLoading
                ? isResetMode
                  ? "Actualizando..."
                  : "Enviando..."
                : isResetMode
                  ? "Guardar nueva contraseña"
                  : "Enviar correo de recuperación"}
            </button>

            <div className={styles.secondaryAction}>
              <Link href="/login" className={styles.backLink}>
                Volver al inicio de sesión
              </Link>

              {isResetMode && successMessage && (
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={() => router.push("/login")}
                >
                  Ir a iniciar sesión
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className={styles.footerBar}>
        <div className={styles.footerIcons}>
          <span className={styles.footerIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" className={styles.footerSvg}>
              <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
            </svg>
          </span>
          <span className={styles.footerIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" className={styles.footerSvg}>
              <path
                d="M14 4v8.2a3.8 3.8 0 1 1-2-3.3V6.2l7 1.4V5.2l-5-1.2Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RecuperarContrasenaPage() {
  return (
    <Suspense fallback={<RecoveryPageFallback />}>
      <RecoveryPageContent />
    </Suspense>
  );
}
