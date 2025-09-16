"use client";
import React, { useState } from "react";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import styles from "./page.module.css";
import { getImagePath } from "@/utils/getImagePath";
import { API_ENDPOINTS } from "@/config/api";

export default function CrearCuentaPage() {
  
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    rut: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: ""
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormComplete = () => {
    return formData.nombreCompleto.trim() !== "" &&
           formData.rut.trim() !== "" &&
           formData.email.trim() !== "" &&
           formData.telefono.trim() !== "" &&
           formData.password.trim() !== "" &&
           formData.confirmPassword.trim() !== "" &&
           formData.password === formData.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete()) {
      setIsLoading(true);
      setErrorMessage("");
      
      try {
        const dataToSend = {
          nombreCompleto: formData.nombreCompleto,
          rut: formData.rut,
          email: formData.email,
          telefono: formData.telefono,
          password: formData.password // Solo enviar un password
        };
        
        const response = await fetch(API_ENDPOINTS.USERS_WEB, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Agregar headers de ngrok si es necesario
            ...(API_ENDPOINTS.USERS_WEB.includes('ngrok') && {
              'ngrok-skip-browser-warning': 'true',
            }),
          },
          body: JSON.stringify(dataToSend)
        });
        
        const result = await response.json();
        
        if (response.ok) {
          // Usuario creado exitosamente - mostrar modal y redirigir a login
          setShowSuccessModal(true);
        } else {
          // Error del servidor - mostrar mensaje específico
          let errorMsg = "Hubo un problema al crear la cuenta. Inténtalo de nuevo.";
          
          if (response.status === 400 && result.message) {
            // Errores específicos del backend (RUT duplicado, email duplicado, etc.)
            errorMsg = result.message;
          } else if (result.error) {
            errorMsg = result.error;
          } else if (result.message) {
            errorMsg = result.message;
          }
          
          setErrorMessage(errorMsg);
        }
      } catch (error) {
        setErrorMessage("Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <UniversalHeader />
      
      {/* Main Content - 50/50 split */}
      <div className={styles.mainContent}>
        {/* Left Section - Form */}
        <div className={styles.leftSection}>
          <div className={styles.formContainer}>
            {/* Form Header */}
            <div className={styles.formHeader}>
              <h1 className={styles.title}>¡Bienvenido a vibepass!</h1>
              <p className={styles.description}>Crea tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Mensaje de Error */}
              {errorMessage && (
                <div className={styles.errorMessage}>
                  {errorMessage}
                </div>
              )}

              {/* Nombre Completo */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nombre completo</label>
                <input
                  type="text"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ingresa tu nombre completo"
                  required
                />
              </div>

              {/* RUT */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>RUT</label>
                <input
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ingresa tu RUT"
                  required
                />
              </div>

              {/* Email */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              {/* Teléfono */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Teléfono de contacto</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="+56 9 1234 5678"
                  required
                />
              </div>

              {/* Password */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Confirmar Password */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Confirmar Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`${styles.submitButton} ${!isFormComplete() || isLoading ? styles.disabledButton : ''}`}
                disabled={!isFormComplete() || isLoading}
              >
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section - Phone Image */}
        <div className={styles.rightSection}>
          <img
            src={getImagePath("/images/crearcuenta_phone.png")}
            alt="Crear cuenta"
            className={styles.phoneImage}
          />
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footerSection}>
        <img
          src={getImagePath("/images/footer_crear_cuenta.png")}
          alt="Footer"
          className={styles.footerImage}
        />
      </div>

      {/* Modal de Éxito */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>¡Cuenta creada exitosamente!</h2>
              <p className={styles.modalMessage}>
                Tu cuenta ha sido registrada correctamente. Ya puedes iniciar sesión.
              </p>
                      <div className={styles.modalButtons}>
                        <button 
                          className={styles.modalButton}
                          onClick={() => window.location.href = '/vibepass-web/login/'}
                        >
                          Ir a Iniciar Sesión
                        </button>
                      </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
