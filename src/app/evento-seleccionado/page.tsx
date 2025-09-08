"use client";
import React, { Suspense } from "react";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import Footer from "@/components/Shared/Footer/Footer";
import EventoSeleccionadoPage from "@/components/Events/EventoSeleccionadoPage/EventoSeleccionadoPage";
import styles from "./page.module.css";

// Forzar renderizado dinámico para evitar errores de prerendering
export const dynamic = 'force-dynamic';

const EventoSeleccionadoPageComponent: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />
      <Suspense fallback={<div>Cargando...</div>}>
        <EventoSeleccionadoPage />
      </Suspense>
      <Footer />
    </div>
  );
};

export default EventoSeleccionadoPageComponent;
