"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import { useAuth } from "@/contexts/AuthContext";
import { API_ENDPOINTS } from "@/config/api";
import { getImagePath } from "@/utils/getImagePath";
import styles from "./page.module.css";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const loginData = {
        email: email,
        password: password
      };

      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Agregar headers de ngrok si es necesario
          ...(API_ENDPOINTS.LOGIN.includes('ngrok') && {
            'ngrok-skip-browser-warning': 'true',
          }),
        },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // Login exitoso - extraer datos del usuario
        const backendUser = result.data.user;
        const userData = {
          id: backendUser._id,
          nombreCompleto: backendUser.nombreCompleto,
          email: backendUser.email,
          rut: backendUser.rut,
          telefono: backendUser.telefono
        };

        // Hacer login
        login(userData);
        
        // Redirigir a eventos
        router.push('/eventos');
        
        } else {
          // Error de login
          const errorMsg = result.message || "Credenciales inválidas";
          setErrorMessage(errorMsg);
        }
      
    } catch (error) {
      setErrorMessage("Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={styles.container}
      style={{
        backgroundImage: `url('${getImagePath('/images/backgorundLogin.png')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Header */}
      <UniversalHeader />
      
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Login Form */}
        <div className={styles.loginForm}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>¡Bienvenido a vibepass!</h1>
            <p className={styles.description}>Ingresa a tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Error Message */}
            {errorMessage && (
              <div className={styles.errorMessage}>
                {errorMessage}
              </div>
            )}

            {/* Email Field */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Correo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="jose@gmail.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Contraseña</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.passwordInput}
                  placeholder="••••••••"
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

            {/* Forgot Password */}
            <div className={styles.forgotPassword}>
              <a href="#" className={styles.forgotPasswordLink}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Remember Me */}
            <div className={styles.rememberContainer}>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="remember" className={styles.checkboxLabel}>
                  Recordar cuenta
                </label>
              </div>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className={`${styles.loginButton} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>

            {/* Create Account */}
            <div className={styles.createAccountContainer}>
              <span className={styles.noAccountText}>¿No tienes cuenta?</span>
              <Link href="/crear-cuenta" className={styles.createAccountLink} prefetch={false}>
                Crear cuenta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}