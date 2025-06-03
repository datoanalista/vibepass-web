"use client";
import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <img src="/images/logo.svg" alt="Logo" className={styles.logoImage} />
        </div>
      </div>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />
    </header>
  );
};

export default Header;
