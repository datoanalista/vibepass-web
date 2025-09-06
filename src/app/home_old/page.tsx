"use client";
import React from "react";
import styles from "./styles.module.css";
import Footer from "@/components/Shared/Footer/Footer";
import HeroSection from "@/components/Home_old/HeroSection/HeroSection";
import EventCardsSection from "@/components/Home_old/EventCardsSection/EventCardsSection";
import NavigationArrows from "@/components/Home_old/NavigationArrows/NavigationArrows";
import QRInstructionsSection from "@/components/Home_old/QRInstructionsSection/QRInstructionsSection";
import DifferenceSection from "@/components/Home_old/DifferenceSection/DifferenceSection";
import OurServiceSection from "@/components/Home_old/OurServiceSection/OurServiceSection";
import BottomCTASection from "@/components/Home_old/BottomCTASection/BottomCTASection";
import HeroGif from "@/components/Shared/HeroGif/HeroGif";
import Header from "@/components/Shared/Header/Header";
import TrustSection from "@/components/Home_old/TrustSection/TrustSection";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <HeroGif />
      <HeroSection />
      <EventCardsSection />
      <NavigationArrows />
      <QRInstructionsSection />
      <DifferenceSection />
      <OurServiceSection />
      <BottomCTASection />
      <TrustSection />
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
}
