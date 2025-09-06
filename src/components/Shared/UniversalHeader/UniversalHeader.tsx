"use client";
import React from "react";
import Link from "next/link";
import styles from "./UniversalHeader.module.css";

const UniversalHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logoLink}>
          <img
            src="/images/icon_vibepass.svg"
            alt="Vibepass"
            className={styles.logo}
          />
          <span className={styles.logoText}>
            <span className={styles.vibe}>Vibe</span>
            <span className={styles.pass}>pass</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link href="/eventos" className={styles.navLink}>
            Eventos
          </Link>
          <Link href="/qr" className={styles.navLink}>
            QR
          </Link>
          <Link href="/diferenciacion" className={styles.navLink}>
            Diferenciación
          </Link>
          <Link href="/servicio" className={styles.navLink}>
            Servicio
          </Link>
          <Link href="/cotizacion" className={styles.navLink}>
            Cotización
          </Link>
        </nav>

        {/* User Account Button */}
        <Link href="/login" className={styles.accountButton}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.userIcon}
          >
            <path
              d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10ZM10 12.5C6.66875 12.5 0 14.1688 0 17.5V20H20V17.5C20 14.1688 13.3312 12.5 10 12.5Z"
              fill="currentColor"
            />
          </svg>
          Mi cuenta
        </Link>

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
