"use client";
import React from "react";
import styles from "./styles.module.css";
import CreateEventHeader from "@/components/Admin/CreateEvent/CreateEventHeader/CreateEventHeader";
import GeneralInfoSection from "@/components/Admin/CreateEvent/GeneralInfoSection/GeneralInfoSection";
import TicketConfigSection from "@/components/Admin/CreateEvent/TicketConfigSection/TicketConfigSection";
import ProductsSection from "@/components/Admin/CreateEvent/ProductsSection/ProductsSection";

export default function CreateEventPage() {
  return (
    <div className={styles.container}>
      <CreateEventHeader />

      <div className={styles.headerSpacer} />

      <div className={styles.breadcrumbSection}>
        <div className={styles.breadcrumbText}>Creación de evento</div>
        <div className={styles.schoolSelector}>
          <div className={styles.schoolFlag}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/british-flag.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="British Flag"
              className={styles.flagImage}
            />
          </div>
          <div className={styles.schoolName}>British Royal</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dropdown-arrow.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
            alt="Dropdown arrow"
            className={styles.dropdownArrow}
          />
        </div>
      </div>

      <div className={styles.dividerSection}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/divider-line.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
          alt="Divider"
          className={styles.dividerImage}
        />
        <div className={styles.dividerLine} />
      </div>

      <div className={styles.mainContent}>
        <GeneralInfoSection />
        <TicketConfigSection />
        <ProductsSection />

        <div className={styles.paginationInfo}>
          <span className={styles.currentPage}>1</span> de 2
        </div>
      </div>
    </div>
  );
}
