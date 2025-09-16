"use client";
import React from "react";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";

export default function CrearCuentaSimplePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <UniversalHeader />
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "80vh",
        flexDirection: "column"
      }}>
        <h1 style={{ fontSize: "2rem", color: "#333", marginBottom: "1rem" }}>
          ¡Página Crear Cuenta Funciona!
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          Esta es una página de prueba para verificar el routing.
        </p>
        <button 
          onClick={() => window.location.href = '/vibepass-web/login/'}
          style={{
            padding: "10px 20px",
            backgroundColor: "#12C70E",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "1rem"
          }}
        >
          Volver a Login
        </button>
      </div>
    </div>
  );
}
