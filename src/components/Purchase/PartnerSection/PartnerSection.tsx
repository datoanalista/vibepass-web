"use client";
import React from "react";
import styles from "./PartnerSection.module.css";

export default function PartnerSection() {
  return (
    <div className={styles.partnerSection}>
      <div className={styles.partnerContent}>
        <div className={styles.partnerTitle}>Partner</div>
        <div className={styles.partnerLogos}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6f84c2718d7e8856e76e780077f4ba7bf3eff44?placeholderIfAbsent=true"
            alt="Partner Logo"
            className={styles.partnerLogo}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d9374d88b2c3096a9859c888a34c079a0ad6162?placeholderIfAbsent=true"
            alt="Partner Logo"
            className={styles.partnerLogoSecond}
          />
        </div>
      </div>
    </div>
  );
}
