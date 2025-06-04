"use client";
import React from "react";
import styles from "./BenefitCard.module.css";

interface BenefitCardProps {
  title: string;
  description: string;
  backgroundColor: string;
}

export default function BenefitCard({
  title,
  description,
  backgroundColor,
}: BenefitCardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.titleContainer}>{title}</div>
      <div className={styles.descriptionContainer} style={{ backgroundColor }}>
        {description.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < description.split("\n").length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
