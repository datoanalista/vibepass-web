"use client";
import React from "react";
import styles from "./TrustSection.module.css";

const TrustSection: React.FC = () => {
  return (
    <>
      {/* Trust Section */}
      <div className={styles.trustSection}>
        <div className={styles.trustUnderline} />
        <div className={styles.trustTitle}>Ellos confían en nosotros</div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/30433f24b838877bf62261047b6387e37117d632?width=3316"
          alt="Group 146"
          className={styles.trustLogos}
        />
      </div>
    </>
  );
};

export default TrustSection;
