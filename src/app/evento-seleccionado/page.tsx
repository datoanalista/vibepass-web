"use client";
import React from "react";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import Footer from "@/components/Shared/Footer/Footer";
import EventoSeleccionadoPage from "@/components/Events/EventoSeleccionadoPage/EventoSeleccionadoPage";
import styles from "./page.module.css";

const EventoSeleccionadoPageComponent: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />
      <EventoSeleccionadoPage />
      <Footer />
    </div>
  );
};

export default EventoSeleccionadoPageComponent;
