"use client";
import React, { useState } from "react";
import styles from "./EventCardCarousel.module.css";
import EventCard from "./EventCard";
import { eventCardsData } from "@/data/Home/eventCardsData";

const EventCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? eventCardsData.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === eventCardsData.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.arrowLeft} onClick={handlePrev}>
        ◀
      </button>

      <div className={styles.cardsWrapper}>
        {eventCardsData.map((event, index) => {
          const position =
            index === currentIndex
              ? "active"
              : index === (currentIndex + 1) % eventCardsData.length
                ? "right"
                : index ===
                    (currentIndex - 1 + eventCardsData.length) %
                      eventCardsData.length
                  ? "left"
                  : "hidden";

          return (
            <div key={index} className={`${styles.card} ${styles[position]}`}>
              <EventCard
                type={event.type}
                icon={
                  <img
                    src={event.icon}
                    alt={`${event.type} icon`}
                    width={24}
                    height={24}
                  />
                }
                description={event.description}
                features={event.features.map((f, i) => ({
                  icon: (
                    <img
                      src={f.icon}
                      alt={`feature ${i}`}
                      width={20}
                      height={20}
                    />
                  ),
                  text: f.text,
                }))}
                ctaText={event.ctaText}
                ctaColor={event.ctaColor}
                readyText={event.readyText}
              />
            </div>
          );
        })}
      </div>

      <button className={styles.arrowRight} onClick={handleNext}>
        ▶
      </button>
    </div>
  );
};

export default EventCardCarousel;
