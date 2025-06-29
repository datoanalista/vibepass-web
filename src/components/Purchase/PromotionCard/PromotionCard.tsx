"use client";
import React from "react";
import styles from "./PromotionCard.module.css";

interface PromotionCardProps {
  title: string;
}

export default function PromotionCard({ title }: PromotionCardProps) {
  return <div className={styles.container}>{title}</div>;
}
