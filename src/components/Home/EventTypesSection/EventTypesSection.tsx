"use client";
import React from "react";
import styles from "./EventTypesSection.module.css";
import EventCard from "./EventCard/EventCard";
import { getImagePath } from "@/utils/getImagePath";

const EventTypesSection: React.FC = () => {
  const eventTypes = [
    {
      id: 1,
      type: "left",
      title: "Fiestas Papás",
      description: "Encuentro organizado por la institución para que apoderados disfruten de un evento especial con buena compañía.",
      ctaText: "Ver eventos",
      buttonGradient: "linear-gradient(90deg, #E68572 36.54%, rgba(29, 171, 225, 0.8) 100%)",
      cardGradient: "linear-gradient(114.1deg, #E68572 31.17%, rgba(22, 170, 225, 0.8) 100%)",
      features: [
        { icon: "dinner.svg", text: "Cena o cóctel" },
        { icon: "music.svg", text: "Música en vivo" },
        { icon: "spaces.svg", text: "Espacios reservados" },
        { icon: "specials.svg", text: "Actividades especiales" }
      ],
      bottomText: "¿Listo para una gran experiencia?",
      isCenter: false
    },
    {
      id: 2,
      type: "center",
      title: "KOT - Kermesse On Tour",
      description: "Evento escolar que reúne la comunidad en un día de juegos, comida y actividades para disfrutar en familia.",
      ctaText: "Ver eventos",
      buttonGradient: "linear-gradient(90.11deg, #01A8E2 0.1%, #B0BBDB 72.97%)",
      cardGradient: "linear-gradient(113.44deg, #019ACF 0.82%, #B0BBDB 100%)",
      features: [
        { icon: "food.svg", text: "Comida y bebestibles" },
        { icon: "games.svg", text: "Juegos" },
        { icon: "activities.svg", text: "Actividades creativas" },
        { icon: "raffle.svg", text: "Rifas" }
      ],
      bottomText: "¿Listo para vivir una Kermés?",
      isCenter: true
    },
    {
      id: 3,
      type: "right",
      title: "Cine bajo las estrellas",
      description: "Evento familiar disfrutan de una función de cine en un ambiente cómodo, seguro y adaptado a la comunidad.",
      ctaText: "Ver eventos",
      buttonGradient: "linear-gradient(90deg, #B0BBDB 46.15%, #E68572 100%)",
      cardGradient: "linear-gradient(113.9deg, #B0BBDB 42.33%, #E68572 97.83%)",
      features: [
        { icon: "snack.svg", text: "Snack y bebidas" },
        { icon: "movies.svg", text: "Películas para todos" },
        { icon: "spaces.svg", text: "Espacios cómodos y seguros" },
        { icon: "family.svg", text: "Actividad familiar" }
      ],
      bottomText: "¿Listo para entrar al cine?",
      isCenter: false
    }
  ];

  return (
    <section className={styles.eventTypesSection}>
      <div className={styles.container}>
        {/* Título principal */}
        <h2 className={styles.sectionTitle}>¿Qué tipo de evento buscas?</h2>
        
        {/* Cards de eventos */}
        <div className={styles.eventsGrid}>
          {/* Flecha izquierda */}
          <button className={styles.arrowButton} aria-label="Evento anterior">
            <img
              src={getImagePath("/images/icon_left.svg")}
              alt="Anterior"
              className={styles.arrowIcon}
            />
          </button>

          {/* Event Cards */}
          <div className={styles.cardsContainer}>
            {eventTypes.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Flecha derecha */}
          <button className={styles.arrowButton} aria-label="Siguiente evento">
            <img
              src={getImagePath("/images/icon_right.svg")}
              alt="Siguiente"
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventTypesSection;
