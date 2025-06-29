"use client";
import React from "react";
import styles from "./FoodProductCard.module.css";

interface FoodProductCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const FoodProductCard: React.FC<FoodProductCardProps> = ({
  name,
  description,
  price,
  imageUrl,
  quantity,
  onQuantityChange,
}) => {
  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-CL")}`;
  };

  return (
    <div className={styles.container}>
      <img src={imageUrl} alt={name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <div className={styles.productName}>{name}</div>
        <div className={styles.productDescription}>{description}</div>
        <div className={styles.productPrice}>{formatPrice(price)}</div>
        <div className={styles.quantitySelector}>
          <div className={styles.quantityLabel}>Unidades</div>
          <div className={styles.quantityControls}>
            <button
              className={styles.quantityButton}
              onClick={handleDecrease}
              aria-label="Disminuir cantidad"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a40a02a8c3774f5648f655d538f5a2650c845635?placeholderIfAbsent=true"
                alt="Minus"
                className={styles.buttonIcon}
              />
            </button>
            <div className={styles.quantityValue}>{quantity}</div>
            <button
              className={styles.quantityButton}
              onClick={handleIncrease}
              aria-label="Aumentar cantidad"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/132d320e969f47d84da142366d54be6992ec46dc?placeholderIfAbsent=true"
                alt="Plus"
                className={styles.buttonIcon}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodProductCard;
