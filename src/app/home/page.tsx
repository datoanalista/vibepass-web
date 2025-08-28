"use client";
import React from "react";
import styles from "./styles.module.css";
import Footer from "@/components/Shared/Footer/Footer";
import HeroSection from "@/components/Home/HeroSection/HeroSection";
import EventCardsSection from "@/components/Home/EventCardsSection/EventCardsSection";
import NavigationArrows from "@/components/Home/NavigationArrows/NavigationArrows";
import QRInstructionsSection from "@/components/Home/QRInstructionsSection/QRInstructionsSection";
import DifferenceSection from "@/components/Home/DifferenceSection/DifferenceSection";
import OurServiceSection from "@/components/Home/OurServiceSection/OurServiceSection";
import BottomCTASection from "@/components/Home/BottomCTASection/BottomCTASection";
import HeroGif from "@/components/Shared/HeroGif/HeroGif";
import Header from "@/components/Shared/Header/Header";
import TrustSection from "@/components/Home/TrustSection/TrustSection";

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
