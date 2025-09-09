import React from 'react';
import Header from '@/components/Shared/Header/Header';
import Footer from '@/components/Shared/Footer/Footer';
import { getImagePath } from '@/utils/getImagePath';
import styles from './page.module.css';

const CompraExitosaPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Imagen de fondo QR */}
        <div className={styles.backgroundQR}>
          <img 
            src={getImagePath("/images/codigoqr.png")} 
            alt="Código QR Background"
            className={styles.qrBackgroundImage}
          />
        </div>

        {/* Contenido principal */}
        <div className={styles.contentContainer}>
          {/* Título CÓDIGO QR */}
          <div className={styles.titleContainer}>
            <span className={styles.codigoText}>CÓDIGO</span>
            <span className={styles.qrText}>QR</span>
          </div>

          {/* Box "De verificación" */}
          <div className={styles.verificationBox}>
            <span className={styles.verificationText}>De verificación</span>
          </div>

          {/* Texto descriptivo */}
          <div className={styles.descriptionContainer}>
            <p className={styles.successTitle}>¡Compra finalizada con éxito!</p>
            <p className={styles.descriptionText}>
              Enviaremos un correo de confirmación con tu código QR.
            </p>
            <p className={styles.descriptionText}>
              Accede a "Mi cuenta" para ver el detalle de tu compra, y revisar tus actividades.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompraExitosaPage;
