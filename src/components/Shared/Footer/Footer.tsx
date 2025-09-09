import React from 'react';
import { getImagePath } from '@/utils/getImagePath';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <img 
        src={getImagePath("/images/Footer_img.png")} 
        alt="Footer Vibepass" 
        className={styles.footerImage}
      />
    </footer>
  );
};

export default Footer;
