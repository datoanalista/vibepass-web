import React from "react";
import styles from "./BenefitsSection.module.css";

interface BenefitCardProps {
  label: string;
  icon: string;
  description: string;
  backgroundColor: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  label,
  icon,
  description,
  backgroundColor,
}) => {
  return (
    <div
      className={styles.benefitCard}
      style={{ backgroundColor, color: "#fff" }}
    >
      <div className={styles.benefitIconWrapper}>
        <img src={icon} alt={label} className={styles.benefitIconImage} />
      </div>
      <div className={styles.benefitLabel}>{label}</div>
      <p className={styles.benefitDescription}>{description}</p>
    </div>
  );
};

export default BenefitCard;
