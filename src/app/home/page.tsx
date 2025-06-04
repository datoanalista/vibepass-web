"use client";
import React from "react";
import styles from "./styles.module.css";
import QrSection from "@/components/Home/QrSection/QrSection";
import BenefitsSection from "@/components/Home/BenefitsSection/BenefitsSection";
import ServiceSection from "@/components/Home/ServiceSection/ServiceSection";
import Header from "@/components/Shared/Header/Header";
import HeroGif from "@/components/Home/HeroGif/HeroGif";
import EventCardCarousel from "@/components/Home/EventCardCarousel/EventCardCarousel";
import Footer from "@/components/Shared/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <HeroGif />

      <section className={styles.eventsSection}>
        <EventCardCarousel />
        <div className={styles.eventTypeHeading}>
          ¿Qué tipo de evento buscas?
        </div>
      </section>

      <QrSection />
      <BenefitsSection />
      <ServiceSection />
      <Footer />
    </div>
  );
}
