import React from 'react';
import { getImagePath } from '@/utils/getImagePath';
import styles from './PartnersSection.module.css';

const PartnersSection: React.FC = () => {
  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          ELLOS CONFÍAN EN NOSOTROS
        </h2>
        
        <div className={styles.decorativeBar}></div>
        
        <div className={styles.logosContainer}>
          <img 
            src={getImagePath("/images/empresas.png")} 
            alt="Empresas que confían en nosotros" 
            className={styles.logosImage}
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
