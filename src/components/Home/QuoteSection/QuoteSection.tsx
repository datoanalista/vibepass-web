import React from 'react';
import { getImagePath } from '@/utils/getImagePath';
import styles from './QuoteSection.module.css';

const QuoteSection: React.FC = () => {
  return (
    <section className={styles.quoteSection}>
      <img 
        src={getImagePath("/images/fondo_section.png")} 
        alt="Fondo decorativo" 
        className={styles.backgroundImage}
      />
      
      <div className={styles.content}>
        <div className={styles.devices}>
          <img 
            src={getImagePath("/images/laptop.svg")} 
            alt="Laptop" 
            className={styles.laptop}
          />
        </div>
        
        <div className={styles.text}>
          <img 
            src={getImagePath("/images/icon_vibepass.svg")} 
            alt="Vibepass" 
            className={styles.logo}
          />
          <h2 className={styles.title}>
            Rápido, digital y totalmente tuyo
          </h2>
          <p className={styles.description}>
            Transformamos la forma de vivir los eventos.<br />
            Sin filas, solo un código QR y la mejor experiencia.<br />
            Ayudamos a empresas y marcas a gestionar sus eventos de forma rápida y sin complicaciones.
          </p>
          <img 
            src={getImagePath("/images/barra cotiza.png")} 
            alt="Cotiza con nosotros" 
            className={styles.button}
          />
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
