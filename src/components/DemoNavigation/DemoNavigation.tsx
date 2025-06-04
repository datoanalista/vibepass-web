"use client";
import React from "react";
import Link from "next/link";
import styles from "./DemoNavigation.module.css";

const DemoNavigation: React.FC = () => {
  return (
    <nav className={styles.demoNav}>
      <div className={styles.navContent}>
        <h3 className={styles.navTitle}>Vibepass Demo Pages</h3>
        <div className={styles.navLinks}>
          <Link href="/home" className={styles.navLink}>
            Home Page
          </Link>
          <Link href="/landing" className={styles.navLink}>
            Landing Page (New)
          </Link>
          <Link href="/login" className={styles.navLink}>
            Login Page
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DemoNavigation;
