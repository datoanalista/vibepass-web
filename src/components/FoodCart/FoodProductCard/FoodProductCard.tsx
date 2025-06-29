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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.33399 7.04134H8.66732C8.82079 7.04134 8.94953 6.98934 9.05353 6.88534C9.15753 6.78134 9.20935 6.65279 9.20899 6.49967C9.20862 6.34656 9.15662 6.21801 9.05299 6.11401C8.94935 6.01001 8.82079 5.95801 8.66732 5.95801H4.33399C4.18051 5.95801 4.05196 6.01001 3.94832 6.11401C3.84468 6.21801 3.79268 6.34656 3.79232 6.49967C3.79196 6.65279 3.84396 6.78152 3.94832 6.88588C4.05268 6.99024 4.18124 7.04206 4.33399 7.04134ZM6.50065 11.9163C5.75135 11.9163 5.04718 11.7741 4.38815 11.4895C3.72912 11.205 3.15586 10.8191 2.66836 10.332C2.18086 9.84483 1.79501 9.27156 1.51082 8.61217C1.22662 7.95279 1.08435 7.24862 1.08399 6.49967C1.08362 5.75073 1.2259 5.04656 1.51082 4.38717C1.79574 3.72779 2.18158 3.15452 2.66836 2.66738C3.15514 2.18024 3.7284 1.7944 4.38815 1.50984C5.0479 1.22529 5.75207 1.08301 6.50065 1.08301C7.24924 1.08301 7.9534 1.22529 8.61315 1.50984C9.2729 1.7944 9.84617 2.18024 10.3329 2.66738C10.8197 3.15452 11.2057 3.72779 11.491 4.38717C11.7763 5.04656 11.9184 5.75073 11.9173 6.49967C11.9162 7.24862 11.774 7.95279 11.4905 8.61217C11.207 9.27156 10.8212 9.84483 10.3329 10.332C9.84472 10.8191 9.27146 11.2051 8.61315 11.49C7.95485 11.775 7.25068 11.9171 6.50065 11.9163Z"
                  fill="#424040"
                />
              </svg>
            </button>
            <div className={styles.quantityValue}>{quantity}</div>
            <button
              className={styles.quantityButton}
              onClick={handleIncrease}
              aria-label="Aumentar cantidad"
            >
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.95 6.05V7.7C4.95 7.85583 5.0028 7.98655 5.1084 8.09215C5.214 8.19775 5.34453 8.25036 5.5 8.25C5.65546 8.24963 5.78618 8.19683 5.89215 8.0916C5.99811 7.98636 6.05073 7.85583 6.05 7.7V6.05H7.7C7.85583 6.05 7.98655 5.9972 8.09214 5.8916C8.19775 5.786 8.25036 5.65547 8.25 5.5C8.24963 5.34453 8.19683 5.214 8.0916 5.1084C7.98636 5.0028 7.85583 4.95 7.7 4.95H6.05V3.3C6.05 3.14417 5.9972 3.01363 5.8916 2.9084C5.786 2.80317 5.65546 2.75037 5.5 2.75C5.34453 2.74963 5.214 2.80243 5.1084 2.9084C5.0028 3.01437 4.95 3.1449 4.95 3.3V4.95H3.3C3.14417 4.95 3.01363 5.0028 2.9084 5.1084C2.80317 5.214 2.75037 5.34453 2.75 5.5C2.74963 5.65547 2.80243 5.78618 2.9084 5.89215C3.01437 5.99812 3.1449 6.05073 3.3 6.05H4.95ZM5.5 11C4.73916 11 4.02417 10.8555 3.355 10.5666C2.68583 10.2777 2.10375 9.88588 1.60875 9.39125C1.11375 8.89661 0.721967 8.31453 0.4334 7.645C0.144834 6.97546 0.000367363 6.26046 6.96202e-07 5.5C-0.00036597 4.73953 0.144101 4.02453 0.4334 3.355C0.7227 2.68547 1.11448 2.10338 1.60875 1.60875C2.10302 1.11412 2.6851 0.722333 3.355 0.4334C4.0249 0.144467 4.7399 0 5.5 0C6.2601 0 6.9751 0.144467 7.645 0.4334C8.31489 0.722333 8.89698 1.11412 9.39125 1.60875C9.88551 2.10338 10.2775 2.68547 10.5671 3.355C10.8568 4.02453 11.0011 4.73953 11 5.5C10.9989 6.26046 10.8544 6.97546 10.5666 7.645C10.2788 8.31453 9.88698 8.89661 9.39125 9.39125C8.89551 9.88588 8.31343 10.2778 7.645 10.5671C6.97656 10.8564 6.26156 11.0007 5.5 11Z"
                  fill="#424040"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodProductCard;
