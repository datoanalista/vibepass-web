"use client";
import React from "react";
import styles from "./styles.module.css";
import Header from "@/components/Shared/Header/Header";
import SearchBar from "@/components/Landing/SearchBar/SearchBar";
import HeroSection from "@/components/Landing/HeroSection/HeroSection";
import EventsGrid from "@/components/Landing/EventsGrid/EventsGrid";
import Footer from "@/components/Shared/Footer/Footer";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <SearchBar />

        <div className={styles.headerRow}>
        <div className={styles.leftColumn}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbText}>HOME</span>
            <div className={styles.breadcrumbArrow}>
              <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99873 7.87247L0.503252 15.5585L0.49868 0.190916L7.99873 7.87247Z" fill="#D9D9D9" />
              </svg>
            </div>
            <span className={styles.breadcrumbText}>EVENTOS</span>
          </div>
          <h1 className={styles.pageTitle}>KERMESSE</h1>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterButton}>
            <span>Institución</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9998 14.9748C11.8665 14.9748 11.7415 14.9541 11.6248 14.9128C11.5081 14.8715 11.3998 14.8005 11.2998 14.6998L6.6998 10.0998C6.51647 9.91647 6.4248 9.68314 6.4248 9.3998C6.4248 9.11647 6.51647 8.88314 6.6998 8.6998C6.88314 8.51647 7.11647 8.4248 7.3998 8.4248C7.68314 8.4248 7.91647 8.51647 8.0998 8.6998L11.9998 12.5998L15.8998 8.6998C16.0831 8.51647 16.3165 8.4248 16.5998 8.4248C16.8831 8.4248 17.1165 8.51647 17.2998 8.6998C17.4831 8.88314 17.5748 9.11647 17.5748 9.3998C17.5748 9.68314 17.4831 9.91647 17.2998 10.0998L12.6998 14.6998C12.5998 14.7998 12.4915 14.8708 12.3748 14.9128C12.2581 14.9548 12.1331 14.9755 11.9998 14.9748Z" fill="#424040" />
            </svg>
          </div>
          <div className={styles.filterButton}>
            <span>Lugar</span>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path  d="M5.575 6.55C5.44167 6.55 5.31667 6.52933 5.2 6.488C5.08333 6.44667 4.975 6.37567 4.875 6.275L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.974999C0 0.691666 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L5.575 4.175L9.475 0.275C9.65833 0.0916663 9.89167 0 10.175 0C10.4583 0 10.6917 0.0916663 10.875 0.275C11.0583 0.458333 11.15 0.691666 11.15 0.974999C11.15 1.25833 11.0583 1.49167 10.875 1.675L6.275 6.275C6.175 6.375 6.06667 6.446 5.95 6.488C5.83333 6.53 5.70833 6.55067 5.575 6.55Z" fill="#424040" />
            </svg>
          </div>
        </div>
      </div>


        <HeroSection />
        <EventsGrid />
      </div>
      <Footer />
    </div>
  );
}
