"use client";
import React from "react";
import styles from "./ServiceSection.module.css";
import {
  ServiceLeft,
  ServiceRight,
  AppPromo,
  Partners,
} from "./ServiceSection.parts";

const ServiceSection: React.FC = () => {
  return (
    <section className={styles.serviceSection}>
      <div className={styles.serviceInfo}>
        <ServiceLeft />
        <ServiceRight />
      </div>
      <AppPromo />
      <Partners />
    </section>
  );
};

export default ServiceSection;
