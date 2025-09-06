"use client";
import React from "react";
import Link from "next/link";
import DemoNavigation from "@/components/DemoNavigation/DemoNavigation";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <DemoNavigation />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Welcome to <span className={styles.brand}>Vibepass</span>
          </h1>
          <p className={styles.description}>
            Experience the next generation of event ticketing and management.
          </p>
        </div>

        <div className={styles.features}>
          <div className={`${styles.featureCard} ${styles.featured}`}>
            <h2 className={styles.featureTitle}>🏠 New Home Page</h2>
            <p className={styles.featureDescription}>
              Reconstruido desde cero con diseño responsive y header universal. Header con color #1B2735 y altura 115px.
            </p>
            <Link href="/home" className={styles.featureButton}>
              View New Home
            </Link>
          </div>

          <div className={styles.featureCard}>
            <h2 className={styles.featureTitle}>🚀 Landing Page</h2>
            <p className={styles.featureDescription}>
              New customizable landing page designed for external customers and
              marketing.
            </p>
            <Link href="/landing" className={styles.featureButton}>
              View Landing Page
            </Link>
          </div>

          <div className={styles.featureCard}>
            <h2 className={styles.featureTitle}>🔐 Login Page</h2>
            <p className={styles.featureDescription}>
              User authentication and login functionality.
            </p>
            <Link href="/login" className={styles.featureButton}>
              View Login Page
            </Link>
          </div>

          <div className={styles.featureCard}>
            <h2 className={styles.featureTitle}>🍔 Food Cart</h2>
            <p className={styles.featureDescription}>
              Shopping cart for food items and beverages with quantity
              selection.
            </p>
            <Link href="/food-cart" className={styles.featureButton}>
              View Food Cart
            </Link>
          </div>

          <div className={styles.featureCard}>
            <h2 className={styles.featureTitle}>🏠 Original Home (Old)</h2>
            <p className={styles.featureDescription}>
              Versión original del home con problemas responsive (solo para referencia).
            </p>
            <Link href="/home_old" className={styles.featureButton}>
              View Original Home
            </Link>
          </div>
        </div>

        <div className={styles.highlights}>
          <h2 className={styles.highlightsTitle}>Landing Page Features</h2>
          <div className={styles.highlightsList}>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>🎯</span>
              <div>
                <h3>Marketing Focused</h3>
                <p>
                  Designed specifically for customer acquisition and promotion
                </p>
              </div>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>📱</span>
              <div>
                <h3>Fully Responsive</h3>
                <p>Optimized for desktop, tablet, and mobile devices</p>
              </div>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>🎨</span>
              <div>
                <h3>Brand Consistent</h3>
                <p>Matches your existing brand colors and typography</p>
              </div>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>⚡</span>
              <div>
                <h3>Performance Optimized</h3>
                <p>Fast loading with optimized images and code splitting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
