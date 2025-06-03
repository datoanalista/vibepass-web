import React, { ReactNode } from "react";
import styles from "./EventCard.module.css";

interface FeatureItem {
  icon: ReactNode;
  text: string;
}

const FeatureList = ({ features }: { features: FeatureItem[] }) => (
  <div className={styles.features}>
    {features.map((feature, index) => (
      <div key={index} className={styles.featureItem}>
        <div className={styles.featureIcon}>{feature.icon}</div>
        <span className={styles.featureText}>{feature.text}</span>
      </div>
    ))}
  </div>
);

export default FeatureList;
export type { FeatureItem };
