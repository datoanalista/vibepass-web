"use client";
import React, { useState } from "react";
import styles from "./ServiceSection.module.css";
import { getImagePath } from "@/utils/getImagePath";

const serviceOptions = [
  {
    id: 1,
    title: "Fiesta papás",
    content: [
      <>
        “Fiesta Papás” es un evento exclusivo diseñado para los apoderados de
        los colegios más destacados de Chile.
      </>,
      <>
        Una noche de <strong>música, diversión y encuentro</strong>, pensada
        para que los asistentes disfruten de un ambiente seguro, cómodo y
        confiable, ideal para generar comunidad entre padres y madres. Es una
        instancia única para relajarse, compartir y vivir una experiencia
        distinta dentro del contexto escolar.
      </>,
    ],
  },
  {
    id: 2,
    title: "KOT - Kermesse On Tour",
    content: [
      <>
        “KOT” es una experiencia itinerante que lleva la clásica kermesse
        escolar a un nuevo nivel. Con{" "}
        <strong>
          juegos interactivos, música, concursos, activaciones y actividades
        </strong>{" "}
        para toda la familia, visitamos los colegios más exclusivos de Chile
        creando jornadas llenas de energía y conexión.
      </>,
      <>
        Es una plataforma que combina entretenimiento, comunidad y
        participación, transformando los patios escolares en verdaderos
        espacios de celebración.{" "}
        <strong>
          Su objetivo principal es fomentar la comunidad y fortalecer los lazos
          dentro del entorno escolar.
        </strong>
      </>,
    ],
  },
  {
    id: 3,
    title: "Cine bajo las estrellas",
    content: [
      <>
        “Cine Bajo las Estrellas” es una experiencia única que transforma los
        patios de los colegios más prestigiosos del país en un cine al aire
        libre. La iniciativa reúne a familias, alumnos y comunidades escolares
        para compartir una noche diferente,{" "}
        <strong>
          disfrutando de películas, actividades y sorpresas bajo un ambiente
          relajado y cercano.
        </strong>
      </>,
    ],
  },
];

const ServiceSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState(2);

  const activeService =
    serviceOptions.find((service) => service.id === activeServiceId) ??
    serviceOptions[0];

  return (
    <section id="servicio" className={styles.serviceSection}>
      <div className={styles.container}>
        {/* Lado izquierdo - Contenido */}
        <div className={styles.leftContent}>
          {/* Título principal con barra */}
          <div className={styles.titleContainer}>
            <div className={styles.titleBar}>
              <span className={styles.titleEyebrow}>¿Qué hacemos?</span>
              <h2 className={styles.sectionTitle}>Conoce nuestros servicios</h2>
            </div>
          </div>

          {/* Lista de servicios */}
          <div className={styles.servicesList}>
            {serviceOptions.map((service) => (
              <button
                key={service.id}
                type="button"
                className={`${styles.serviceItem} ${
                  service.id === activeServiceId ? styles.serviceItemActive : ""
                }`}
                onClick={() => setActiveServiceId(service.id)}
              >
                <span className={styles.serviceText}>{service.title}</span>
                <img
                  src={getImagePath(
                    `/images/${
                      service.id === activeServiceId
                        ? "derecha_select.png"
                        : "no_select.png"
                    }`,
                  )}
                  alt={
                    service.id === activeServiceId
                      ? "Seleccionado"
                      : "No seleccionado"
                  }
                  className={styles.serviceIcon}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Lado derecho - Ticket Card */}
        <div className={styles.rightContent}>
          <div className={styles.ticketCard}>
            <img
              src={getImagePath("/images/ticketCard.png")}
              alt="Ticket del servicio"
              className={styles.ticketImage}
            />
            <div className={styles.ticketContent}>
              {activeService.content.map((paragraph, index) => (
                <p key={index} className={styles.ticketParagraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
