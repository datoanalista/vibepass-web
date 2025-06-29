"use client";
import React from "react";
import styles from "./PurchaseCartSidebar.module.css";
import { CartItem } from "@/data/Purchase/attractionsData";

interface PurchaseCartSidebarProps {
  cartItems: CartItem[];
}

export default function PurchaseCartSidebar({
  cartItems,
}: PurchaseCartSidebarProps) {
  const groupedItems = cartItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, CartItem[]>,
  );

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "tickets":
        return "Entrada General";
      case "food":
        return "Alimentos";
      case "attractions":
        return "Atracciones";
      default:
        return category;
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-CL")}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Carrito de compra</div>
      <div className={styles.content}>
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className={styles.categorySection}>
            <div className={styles.categoryTitle}>
              {getCategoryTitle(category)}
            </div>
            {items.map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.itemIndicator} />
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemQuantity}>x{item.quantity}</div>
                <div className={styles.itemPrice}>
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className={styles.total}>
          TOTAL: {formatPrice(calculateTotal())}
        </div>

        <button className={styles.continueButton}>CONTINUAR</button>
      </div>
    </div>
  );
}
