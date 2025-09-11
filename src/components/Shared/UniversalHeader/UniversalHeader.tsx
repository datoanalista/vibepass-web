"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./UniversalHeader.module.css";
import { getImagePath } from "@/utils/getImagePath";

const UniversalHeader: React.FC = () => {
  const router = useRouter();

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Si estamos en la página home, hacer scroll a la sección
    if (window.location.pathname === '/home' || window.location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Si estamos en otra página, navegar a home y luego hacer scroll
      router.push(`/home#${sectionId}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/home" className={styles.logoLink}>
          <img
            src={getImagePath("/images/icon_vibepass.svg")}
            alt="Vibepass"
            className={styles.logo}
          />
        </Link>

        {/* Right Group: Navigation + Account Button */}
        <div className={styles.rightGroup}>
          {/* Navigation */}
          <nav className={styles.nav}>
            <Link href="/eventos" className={styles.navLink}>
              Eventos
            </Link>
            <a 
              href="/home#qr" 
              className={styles.navLink}
              onClick={handleSectionClick('qr')}
            >
              QR
            </a>
            <Link href="/diferenciacion" className={styles.navLink}>
              Diferenciación
            </Link>
            <a 
              href="/home#servicio" 
              className={styles.navLink}
              onClick={handleSectionClick('servicio')}
            >
              Servicio
            </a>
            <a 
              href="/home#cotizacion" 
              className={styles.navLink}
              onClick={handleSectionClick('cotizacion')}
            >
              Cotización
            </a>
          </nav>

          {/* User Account Button */}
          <Link href="/login" className={styles.accountButton}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.userIcon}
            >
              <path
                d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8ZM8 10C5.335 10 0 11.335 0 14V16H16V14C16 11.335 10.665 10 8 10Z"
                fill="currentColor"
              />
            </svg>
            <span className={styles.accountText}>Mi cuenta</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuButton}>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>
      </div>
    </header>
  );
};

export default UniversalHeader;
