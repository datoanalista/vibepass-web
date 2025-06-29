"use client";
import React from "react";
import styles from "./CategoryHeader.module.css";

interface CategoryHeaderProps {
  title: string;
  subtitle?: string;
}

export default function CategoryHeader({
  title,
  subtitle,
}: CategoryHeaderProps) {
  return (
    <div className={styles.container}>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
}
