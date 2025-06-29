"use client";
import React from "react";
import styles from "./FoodCartSidebar.module.css";
import { FoodItem, ticketData } from "@/data/FoodCart/foodItemsData";

interface FoodCartSidebarProps {
  foodItems: FoodItem[];
}

const FoodCartSidebar: React.FC<FoodCartSidebarProps> = ({ foodItems }) => {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-CL")}`;
  };

  const calculateTicketTotal = () => {
    return ticketData.reduce(
      (total, ticket) => total + ticket.price * ticket.quantity,
      0,
    );
  };

  const calculateFoodTotal = () => {
    return foodItems
      .filter((item) => item.quantity > 0)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateGrandTotal = () => {
    return calculateTicketTotal() + calculateFoodTotal();
  };

  const selectedFoodItems = foodItems.filter((item) => item.quantity > 0);

  return (
    <div className={styles.container}>
      <div className={styles.divider} />

      <div className={styles.sectionHeader}>Entrada General</div>
      <div className={styles.divider} />

      <div className={styles.ticketSection}>
        {ticketData.map((ticket) => (
          <div key={ticket.id} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <div className={styles.bullet} />
              <div className={styles.itemDetails}>
                <div className={styles.itemName}>{ticket.name}</div>
                <div className={styles.itemQuantity}>x{ticket.quantity}</div>
              </div>
            </div>
            <div className={styles.itemPrice}>
              {formatPrice(ticket.price * ticket.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.sectionHeader}>Alimentos</div>
      <div className={styles.divider} />

      <div className={styles.foodSection}>
        {selectedFoodItems.map((item) => (
          <div key={item.id} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <div className={styles.bullet} />
              <div className={styles.itemDetails}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemQuantity}>x{item.quantity}</div>
              </div>
            </div>
            <div className={styles.itemPrice}>
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.totalSection}>
        <div className={styles.totalRow}>
          TOTAL: {formatPrice(calculateGrandTotal())}
        </div>
      </div>

      <button className={styles.continueButton}>CONTINUAR</button>
    </div>
  );
};

export default FoodCartSidebar;
