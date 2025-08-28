"use client";
import React from "react";
import styles from "./SalesCard.module.css";

interface SalesCardProps {
  icon: string;
  title: string;
  amount: string;
  className?: string;
}

export default function SalesCard({
  icon,
  title,
  amount,
  className,
}: SalesCardProps) {
  return (
    <div className={`${styles.card} ${className || ""}`}>
      <img src={icon} alt={title} className={styles.icon} />
      <div className={styles.title}>{title}</div>
      <div className={styles.amount}>{amount}</div>
    </div>
  );
}
