"use client";
import React from "react";
import styles from "./DifferencesSection.module.css";
import { getImagePath } from "@/utils/getImagePath";

const DifferencesSection: React.FC = () => {
  const differences = [
    {
      id: 1,
      title: "PRÁCTICO",
      icon: "icon2_fluent_phone.svg",
      backgroundCircle: "icon2_Ellipse1.svg",
      backgroundRect: "icon3_Rectangle.svg"
    },
    {
      id: 2,
      title: "RÁPIDO",
      icon: "icon2_rapido.svg",
      backgroundCircle: "icon2_Ellipse1.svg",
      backgroundRect: "icon3_Rectangle.svg"
    },
    {
      id: 3,
      title: "ORGANIZADO",
      icon: "icon2_organizado.svg",
      backgroundCircle: "icon2_Ellipse1.svg",
      backgroundRect: "icon3_Rectangle.svg"
    }
  ];

  return (
    <section className={styles.differencesSection}>
      <div className={styles.container}>
        {/* Título principal */}
        <div className={styles.titleContainer}>
          <h2 className={styles.sectionTitle}>NUESTRA DIFERENCIA</h2>
          <div className={styles.titleUnderline}></div>
        </div>
        
        {/* Íconos de diferencias */}
        <div className={styles.differencesGrid}>
          {differences.map((item) => (
            <div key={item.id} className={styles.differenceItem}>
              {/* Círculo con ícono */}
              <div className={styles.iconContainer}>
                <img
                  src={getImagePath(`/images/${item.backgroundCircle}`)}
                  alt="Background Circle"
                  className={styles.circleBackground}
                />
                <img
                  src={getImagePath(`/images/${item.icon}`)}
                  alt={item.title}
                  className={styles.icon}
                />
              </div>
              
              {/* Rectángulo con texto */}
              <div className={styles.textContainer}>
                <img
                  src={getImagePath(`/images/${item.backgroundRect}`)}
                  alt="Background Rectangle"
                  className={styles.rectangleBackground}
                />
                <span className={styles.text}>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferencesSection;