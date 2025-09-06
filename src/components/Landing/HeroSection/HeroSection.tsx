"use client";
import React from "react";
import styles from "./HeroSection.module.css";
import { getImagePath } from "@/utils/getImagePath";

const HeroSection: React.FC = () => {
  return (
    <div className={styles.heroContainer}>
      <img
        src={getImagePath("/images/landing/Salto-fest.png")}
        alt="Brown White Modern Professional Real Estate Banner 1"
        className={styles.heroImage}
      />
    </div>
  );
};

export default HeroSection;
