"use client";
import React from "react";
import styles from "./styles.module.css";
import ComprehensiveFooter from "@/components/Home/ComprehensiveFooter/ComprehensiveFooter";
import HeroSection from "@/components/Home/HeroSection/HeroSection";
import EventCardsSection from "@/components/Home/EventCardsSection/EventCardsSection";
import NavigationArrows from "@/components/Home/NavigationArrows/NavigationArrows";
import QRInstructionsSection from "@/components/Home/QRInstructionsSection/QRInstructionsSection";
import DifferenceSection from "@/components/Home/DifferenceSection/DifferenceSection";
import OurServiceSection from "@/components/Home/OurServiceSection/OurServiceSection";
import BottomCTASection from "@/components/Home/BottomCTASection/BottomCTASection";
import HeaderElements from "@/components/Home/HeaderElements/HeaderElements";
import HeroGif from "@/components/Home/HeroGif/HeroGif";

export default function Home() {
  return (
    <div className={styles.container}>
      <HeaderElements />
      <HeroGif />
      <HeroSection />
      <EventCardsSection />
      <NavigationArrows />
      <QRInstructionsSection />
      <DifferenceSection />
      <OurServiceSection />
      <BottomCTASection />
      <ComprehensiveFooter />
    </div>
  );
}
