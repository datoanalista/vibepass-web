"use client";
import React from "react";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import Footer from "@/components/Shared/Footer/Footer";
import EventsPage from "@/components/Events/EventsPage/EventsPage";
import styles from "./page.module.css";

const EventosPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />
      <EventsPage />
      <Footer />
    </div>
  );
};

export default EventosPage;
