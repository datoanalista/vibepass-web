"use client";
import React from "react";
import styles from "./BenefitsSection.module.css";
import BenefitCard from "./BenefitCard";

const benefits = [
  {
    title: "Accede fácilmente a tus tickets",
    description:
      "Guarda y descarga tus entradas cuando quieras,\ndesdetu perfil.",
    backgroundColor: "rgba(0, 168, 163, 1)",
  },
  {
    title: "Historial de compras y acceso rápido",
    description:
      "Revisa tus eventos anteriores y recupera tickets\nen segundos.",
    backgroundColor: "rgba(189, 197, 14, 1)",
  },
  {
    title: "Mayor seguridad y respaldo",
    description:
      "Protege tus entradas con un registro seguro y\nevita pérdidas por errores en el correo.",
    backgroundColor: "rgba(188, 40, 170, 1)",
  },
];

export default function BenefitsSection() {
  return (
    <div className={styles.benefitsContainer}>
      <h2 className={styles.benefitsTitle}>
        beneficios al
        <br />
        registrarte
      </h2>

      <div className={styles.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            title={benefit.title}
            description={benefit.description}
            backgroundColor={benefit.backgroundColor}
          />
        ))}
      </div>
    </div>
  );
}
