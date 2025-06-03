"use client";
import React from "react";
import styles from "./QrSection.module.css";
import { InstructionItem } from "./InstructionItem";
import { QrImage } from "./QrImage";

// Componente principal
const QrSection: React.FC = () => {
  const instructions = [
    "Compra tu acceso en la plataforma para el evento elegido.",
    "Llega al evento y muestra tu QR al personal encargado de la verificación.",
    "Disfruta de todas las experiencias y servicios que adquiriste, sin complicaciones.",
  ];

  return (
    <section className={styles.qrSection}>
      <h2 className={styles.sectionTitle}>¿CÓMO UTILIZAR TU CÓDIGO QR?</h2>

      <div className={styles.qrContent}>
        <QrImage />

        <div className={styles.qrInstructions}>
          {instructions.map((text, index) => (
            <InstructionItem key={index} number={index + 1} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QrSection;
