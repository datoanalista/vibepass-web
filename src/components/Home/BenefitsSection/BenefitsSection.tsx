"use client";
import React from "react";
import styles from "./BenefitsSection.module.css";
import BenefitCard from "./BenefitCard";
import { benefitsData } from "@/data/Home/benefitsData";

const BenefitsSection: React.FC = () => {
  const colors = ["#00A8A3", "#BDC50E", "#BC28AA"];

  return (
    <section className={styles.benefitsSection}>
      <h2 className={styles.sectionTitle}>Nuestra diferencia</h2>

      <div className={styles.benefitsContainer}>
        {benefitsData.map((benefit, index) => (
          <BenefitCard
            key={index}
            label={benefit.label}
            icon={benefit.icon}
            description={benefit.description}
            backgroundColor={colors[index % colors.length]}
          />
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;