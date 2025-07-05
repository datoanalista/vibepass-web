"use client";
import React from "react";
import styles from "./EventCardsSection.module.css";
import EventCard from "../EventCard/EventCard";

const EventCardsSection: React.FC = () => {
  const apoderadosFeatures = [
    {
      icon: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.2978 18.2084H15.612C16.277 18.2084 16.8232 17.6938 16.9024 17.0446L18.2087 3.99794H14.2503V0.791687H12.6907V3.99794H8.75616L8.99366 5.85044C10.3474 6.22252 11.6141 6.89544 12.3741 7.6396C13.5141 8.76377 14.2978 9.92752 14.2978 11.8275V18.2084ZM0.791992 17.4167V16.625H12.6907V17.4167C12.6907 17.8442 12.3345 18.2084 11.8753 18.2084H1.58366C1.14824 18.2084 0.791992 17.8442 0.791992 17.4167ZM12.6907 11.875C12.6907 5.54169 0.791992 5.54169 0.791992 11.875H12.6907ZM0.791992 13.4584H12.667V15.0417H0.791992V13.4584Z"
            fill="black"
          />
        </svg>
      ),
      text: "Cena o cóctel",
    },
    {
      icon: (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6670058ffdbae08345d945d6e5ea1f4b2ad2e27?width=48"
          alt="mdi:music"
          className={styles.featureIcon}
        />
      ),
      text: "Música en vivo",
    },
    {
      icon: (
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.10164 4.3125C6.74989 4.9215 6.74989 5.73875 6.74989 7.375V10.0236C7.12614 10 7.54964 10 8.00552 10H14.2443C14.6993 10 15.1236 10 15.4999 10.0236V7.375C15.4999 5.73875 15.4999 4.9215 15.1481 4.3125C14.9178 3.91348 14.5864 3.58213 14.1874 3.35175C13.5784 3 12.7611 3 11.1249 3C9.48864 3 8.67139 3 8.06239 3.35175C7.66337 3.58213 7.33202 3.91348 7.10164 4.3125ZM6.09364 14.3671C5.65439 14.3496 5.38839 14.2901 5.20639 14.0915C4.94652 13.808 4.98064 13.4143 5.04889 12.6259C5.09702 12.0571 5.20726 11.6739 5.45751 11.3878C5.90551 10.875 6.62564 10.875 8.06677 10.875H14.183C15.6241 10.875 16.3443 10.875 16.7923 11.3878C17.0425 11.673 17.1528 12.0563 17.2018 12.6259C17.2691 13.4134 17.3033 13.808 17.0434 14.0915C16.8614 14.2901 16.5954 14.3496 16.1561 14.3671V18.75C16.1561 18.924 16.087 19.091 15.9639 19.214C15.8409 19.3371 15.6739 19.4062 15.4999 19.4062C15.3258 19.4062 15.1589 19.3371 15.0359 19.214C14.9128 19.091 14.8436 18.924 14.8436 18.75V14.375H7.40614V18.75C7.40614 18.924 7.337 19.091 7.21393 19.214C7.09086 19.3371 6.92394 19.4062 6.74989 19.4062C6.57584 19.4062 6.40892 19.3371 6.28585 19.214C6.16278 19.091 6.09364 18.924 6.09364 18.75V14.3671Z"
            fill="black"
          />
        </svg>
      ),
      text: "Espacios reservados",
    },
    {
      icon: (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/96aa079eef8725378a631f69bd3f38a9a0722c19?width=44"
          alt="mdi:present"
          className={styles.featureIcon}
        />
      ),
      text: "Actividades especiales",
    },
  ];

  const kermesseFeatures = [
    {
      icon: (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cfec5fc373f43d67938e7f8410ecafeafeff4e9d?width=48"
          alt="mdi:food"
          className={styles.featureIcon}
        />
      ),
      text: "Comida y bebestibles",
    },
    {
      icon: (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/890544bca4d050673d246b2f9767595323993a36?width=48"
          alt="material-symbols:person-play"
          className={styles.featureIcon}
        />
      ),
      text: "Juegos",
    },
    {
      icon: (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff018151220735c6d945fcd8e29aacbc3d4aec5d?width=48"
          alt="mdi:art"
          className={styles.featureIcon}
        />
      ),
      text: "Actividades creativas",
    },
    {
      icon: (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c7a8c33fbe36041853ecfd6b63b948866cd4299?width=48"
          alt="mdi:present"
          className={styles.featureIcon}
        />
      ),
      text: "Rifas",
    },
  ];

  const cineFeatures = [
    {
      icon: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.2978 18.2084H15.612C16.277 18.2084 16.8232 17.6938 16.9024 17.0446L18.2087 3.99794H14.2503V0.791687H12.6907V3.99794H8.75616L8.99366 5.85044C10.3474 6.22252 11.6141 6.89544 12.3741 7.6396C13.5141 8.76377 14.2978 9.92752 14.2978 11.8275V18.2084ZM0.791992 17.4167V16.625H12.6907V17.4167C12.6907 17.8442 12.3345 18.2084 11.8753 18.2084H1.58366C1.14824 18.2084 0.791992 17.8442 0.791992 17.4167ZM12.6907 11.875C12.6907 5.54169 0.791992 5.54169 0.791992 11.875H12.6907ZM0.791992 13.4584H12.667V15.0417H0.791992V13.4584Z"
            fill="black"
          />
        </svg>
      ),
      text: "Snack y bebidas",
    },
    {
      icon: (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e1da83e80daeae4db3acf51987d74412c04f9f9?width=34"
          alt="icon-park-solid:movie"
          className={styles.featureIcon}
        />
      ),
      text: "Películas para todos",
    },
    {
      icon: (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4ade97f0562ebca5a1c802e7b4ec795628b096f?width=42"
          alt="solar:chair-bold"
          className={styles.featureIcon}
        />
      ),
      text: "Espacios cómodos y seguros",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.76754 6.84C2.70524 6.77316 2.62975 6.71998 2.54583 6.68383C2.46192 6.64768 2.37141 6.62935 2.28004 6.63C1.97254 6.63 1.74004 6.7725 1.59004 7.065C1.44004 7.3575 1.47754 7.635 1.71754 7.8975C2.60254 8.6925 3.16504 9.255 3.40504 9.585C3.71254 10.005 3.86254 10.62 3.86254 11.415C3.86254 12.3975 4.23754 13.125 4.98754 13.6275C5.40754 13.9575 5.86504 14.205 6.37504 14.37V11.4525C6.37504 10.7475 6.12754 10.1625 5.65504 9.69M12.345 9.7275C11.88 10.1925 11.625 10.77 11.625 11.4525V14.4C12.345 14.145 12.945 13.7475 13.44 13.2225C13.9275 12.6975 14.175 12.12 14.175 11.415C14.175 10.5675 14.3175 9.96 14.6025 9.585C14.67 9.465 14.7975 9.315 15 9.1275C15.1725 8.94 15.3525 8.76 15.5325 8.595C15.705 8.4375 15.8775 8.2725 16.0425 8.1075L16.29 7.8975C16.3571 7.83378 16.4103 7.75696 16.4465 7.67181C16.4826 7.58666 16.5008 7.49499 16.5 7.4025C16.5 7.1925 16.4325 7.005 16.29 6.855C16.1475 6.705 15.975 6.63 15.75 6.63C15.525 6.63 15.375 6.6975 15.2325 6.84M9.00004 15C9.51754 15 10.02 14.9325 10.5 14.79V12.1125C10.5 11.67 10.365 11.325 10.0575 10.995C9.75004 10.665 9.39754 10.5 9.00004 10.5C8.60254 10.5 8.25004 10.65 7.96504 10.9575C7.66504 11.25 7.50004 11.595 7.50004 12.045V14.79C7.98004 14.9325 8.48254 15 9.00004 15ZM6.75004 6.375C6.75004 6.9975 6.24754 7.5 5.62504 7.5C5.00254 7.5 4.50004 6.9975 4.50004 6.375C4.50004 5.7525 5.00254 5.25 5.62504 5.25C6.24754 5.25 6.75004 5.7525 6.75004 6.375ZM13.5 6.375C13.5 6.9975 12.9975 7.5 12.375 7.5C11.7525 7.5 11.25 6.9975 11.25 6.375C11.25 5.7525 11.7525 5.25 12.375 5.25C12.9975 5.25 13.5 5.7525 13.5 6.375ZM10.125 4.125C10.125 4.7475 9.62254 5.25 9.00004 5.25C8.37754 5.25 7.87504 4.7475 7.87504 4.125C7.87504 3.5025 8.37754 3 9.00004 3C9.62254 3 10.125 3.5025 10.125 4.125ZM10.125 8.25C10.125 8.8725 9.62254 9.375 9.00004 9.375C8.37754 9.375 7.87504 8.8725 7.87504 8.25C7.87504 7.6275 8.37754 7.125 9.00004 7.125C9.62254 7.125 10.125 7.6275 10.125 8.25Z"
            fill="black"
          />
        </svg>
      ),
      text: "Actividad familiar",
    },
  ];

  return (
    <div className={styles.eventCardsContainer}>
      <EventCard
        type="apoderados"
        title="Apoderados"
        description="Encuentro organizado por la institución para que apoderados disfruten de una evento especial con buena compañía."
        features={apoderadosFeatures}
        ctaText="¿Listo para una gran experiencia?"
      />
      <EventCard
        type="kermesse"
        title="Kermesse"
        description="Evento escolar que reúne la comunidad en un día de juegos, comida y actividades para disfrutar en familia."
        features={kermesseFeatures}
        ctaText="¿Listo para vivir una kermés?"
      />
      <EventCard
        type="cine"
        title="Cine"
        description="Evento familias disfrutan de una función de cine en un ambiente cómodo, seguro y adaptado a la comunidad."
        features={cineFeatures}
        ctaText="¿Listo para entrar al cine?"
      />
    </div>
  );
};

export default EventCardsSection;
