import React, { ReactNode } from "react";
import styles from "./EventCard.module.css";

const CardHeader = ({ icon, type }: { icon: ReactNode; type: string }) => (
  <div className={styles.cardHeader}>
    <div className={styles.iconWrapper}>{icon}</div>
    <span className={styles.cardType}>{type}</span>
  </div>
);

export default CardHeader;
