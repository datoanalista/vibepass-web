import React from 'react';
import { getImagePath } from '@/utils/getImagePath';
import styles from './PartnersSection.module.css';

const PartnersSection: React.FC = () => {
  const carouselLogos = [
    "Colloky.png",
    "DBS.png",
    "NESQUICK.png",
    "alemana.png",
    "ansaldo.png",
    "arauco.png",
    "azaleia.png",
    "bilzYPap.png",
    "ccu.png",
    "chevrolet.png",
    "clinicaMds.png",
    "cocaCola.png",
    "crush2.png",
    "enap.png",
    "fanta.png",
    "gourmet2.png",
    "gtd.png",
    "guallarauco.png",
    "hyundai.png",
    "inmobilariaSecurity.png",
    "kn.png",
    "krispyKrem.png",
    "laPreferida.png",
    "lipton.png",
    "littleCesars.png",
    "marley.png",
    "masisa.png",
    "milo.png",
    "nutrisco.png",
    "papaJhons.png",
    "schoolOfRock.png",
    "scotiabank.png",
    "unimarc.png",
    "vendomatica2.png",
  ];

  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        <img
          src={getImagePath("/images/ourCustomers.png")}
          alt="Nuestros clientes"
          className={styles.titleImage}
        />
        
        <div className={styles.logosContainer}>
          <img 
            src={getImagePath("/images/empresas.png")} 
            alt="Empresas que confían en nosotros" 
            className={styles.logosImage}
          />
        </div>

        <div className={styles.carouselSection}>
          <div className={styles.carouselTitle}>CONFÍAN EN NOSOTROS</div>
          <div className={styles.carouselViewport}>
            <div className={styles.carouselTrack}>
              {[...carouselLogos, ...carouselLogos].map((logo, index) => (
                <img
                  key={`${logo}-${index}`}
                  src={getImagePath(`/images/imagenesK/${logo}`)}
                  alt=""
                  aria-hidden="true"
                  className={styles.carouselLogo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
