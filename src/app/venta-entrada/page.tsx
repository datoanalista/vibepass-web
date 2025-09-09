"use client";
import React, { Suspense } from "react";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import Footer from "@/components/Shared/Footer/Footer";
import VentaEntradaPage from "@/components/Events/VentaEntradaPage/VentaEntradaPage";
import styles from "./page.module.css";

// Forzar renderizado dinámico para evitar errores de prerendering
export const dynamic = 'force-dynamic';

const VentaEntradaPageComponent: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />
      <Suspense fallback={<div>Cargando...</div>}>
        <VentaEntradaPage />
      </Suspense>
      <Footer />
    </div>
  );
};

export default VentaEntradaPageComponent;
