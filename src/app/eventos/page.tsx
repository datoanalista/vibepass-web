"use client";
import React from "react";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import Footer from "@/components/Shared/Footer/Footer";
import SearchBar from "@/components/Events/SearchBar/SearchBar";
import EventsPage from "@/components/Events/EventsPage/EventsPage";
import styles from "./page.module.css";

const EventosPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />
      <SearchBar />
      <EventsPage />
      <Footer />
    </div>
  );
};

export default EventosPage;
