"use client";
import React from "react";
import styles from "./ServiceSection.module.css";
import { getImagePath } from "@/utils/getImagePath";

const ServiceSection: React.FC = () => {
  const serviceOptions = [
    {
      id: 1,
      title: "Fiesta papás",
      isSelected: false,
      icon: "no_select.png",
      background: "#01A8E2"
    },
    {
      id: 2,
      title: "KOT - Kermesse On Tour",
      isSelected: true,
      icon: "derecha_select.png", 
      background: "#424040"
    },
    {
      id: 3,
      title: "Cine bajo las estrellas",
      isSelected: true,
      icon: "derecha_select.png",
      background: "#424040"
    }
  ];

  return (
    <section className={styles.serviceSection}>
      <div className={styles.container}>
        {/* Lado izquierdo - Contenido */}
        <div className={styles.leftContent}>
          {/* Título principal con barra */}
          <div className={styles.titleContainer}>
            <div className={styles.titleBar}>
              <h2 className={styles.sectionTitle}>CONOCE NUESTRO SERVICIO</h2>
            </div>
          </div>
          
          {/* Subtítulo */}
          <h3 className={styles.subtitle}>¿Qué hacemos?</h3>
          
          {/* Lista de servicios */}
          <div className={styles.servicesList}>
            {serviceOptions.map((service) => (
              <div 
                key={service.id} 
                className={styles.serviceItem}
                style={{ backgroundColor: service.background }}
              >
                <span className={styles.serviceText}>{service.title}</span>
                <img
                  src={getImagePath(`/images/${service.icon}`)}
                  alt={service.isSelected ? "Seleccionado" : "No seleccionado"}
                  className={styles.serviceIcon}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Lado derecho - Imagen */}
        <div className={styles.rightContent}>
          <img
            src={getImagePath("/images/familia.png")}
            alt="Imagen familiar"
            className={styles.familyImage}
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
