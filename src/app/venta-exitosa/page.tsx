import React from 'react';
import UniversalHeader from '@/components/Shared/UniversalHeader/UniversalHeader';
import Footer from '@/components/Shared/Footer/Footer';
import { getImagePath } from '@/utils/getImagePath';
import styles from './page.module.css';

const VentaExitosaPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />
      
      <main className={styles.mainContent}>
        <img 
          src={getImagePath("/images/codigoqr.png")} 
          alt="Código QR"
          className={styles.qrImage}
        />
        
        <img 
          src={getImagePath("/images/_titulo_CÓDIGO_QR.png")} 
          alt="CÓDIGO QR"
          className={styles.titleImage}
        />
        
        <div className={styles.blueBox}>
          <span className={styles.verificationText}>De verificación</span>
        </div>
        
        <img 
          src={getImagePath("/images/mensaje_exito.png")} 
          alt="Mensaje de éxito"
          className={styles.successMessage}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default VentaExitosaPage;
