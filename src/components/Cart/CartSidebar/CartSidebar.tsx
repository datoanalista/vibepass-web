"use client";
import React from "react";
import styles from "./CartSidebar.module.css";

const CartSidebar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Carrito de compra</div>
      <div className={styles.content}>
        <div className={styles.topDivider} />
        <div className={styles.emptyMessage}>
          El carrito de compras está vacío. Por favor, selecciona tus tickets
        </div>
        <div className={styles.bottomDivider} />
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <div className={styles.summaryColumn}>
              <div>Entrada</div>
              <div className={styles.totalLabel}>Total</div>
            </div>
            <div className={styles.summaryColumn}>
              <div>$0,00</div>
              <div className={styles.totalAmount}>$0,00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
