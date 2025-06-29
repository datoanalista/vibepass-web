"use client";
import React from "react";
import styles from "./AttractionCard.module.css";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

interface AttractionCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export default function AttractionCard({
  name,
  description,
  price,
  imageUrl,
  quantity,
  onQuantityChange,
}: AttractionCardProps) {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-CL")}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{formatPrice(price)}</div>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={onQuantityChange}
        />
      </div>
    </div>
  );
}
