import React from 'react';
import { getImagePath } from '@/utils/getImagePath';
import styles from './Footer.module.css';

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={styles.socialSvg}
    aria-hidden="true"
  >
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
  </svg>
);

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={styles.socialSvg}
    aria-hidden="true"
  >
    <path
      d="M14 4v8.2a3.8 3.8 0 1 1-2-3.3V6.2l7 1.4V5.2l-5-1.2Z"
      fill="currentColor"
    />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <img 
        src={getImagePath("/images/Footer_img.png")} 
        alt="Footer Vibepass" 
        className={styles.footerImage}
      />
      <div className={styles.socialMask} aria-hidden="true" />
      <div className={styles.socialIcons}>
        {/*
        <div className={styles.socialIcon}>
          <TikTokIcon />
        </div>
        */}
        <a
          href="https://www.instagram.com/molotovpro?igsh=MW92Y2ljZDN6ZzFseQ=="
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}
          aria-label="Instagram Molotov Pro"
        >
          <InstagramIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
