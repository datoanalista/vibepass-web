"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Header from "@/components/Shared/Header/Header";
import FoodCategoryTabs from "@/components/FoodCart/FoodCategoryTabs/FoodCategoryTabs";
import FoodCartSidebar from "@/components/FoodCart/FoodCartSidebar/FoodCartSidebar";
import { foodItemsData, FoodItem } from "@/data/FoodCart/foodItemsData";
import Footer from "@/components/Shared/Footer/Footer";

export default function FoodCartPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(foodItemsData);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  return (
    <div className={styles.container}>

      <Header />

      {/* Divider */}
      <div className={styles.divider} />

      {/* Event Section */}
      <div className={styles.eventSection}>
        <div className={styles.eventInfo}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/53b95caf580f8dbbc4a90fa5b3869a61387b0079?placeholderIfAbsent=true"
            alt="Event Logo"
            className={styles.eventLogo}
          />
          <div className={styles.eventTitle}>
            <span className={styles.eventBrand}>SALTO FEST</span> - Evento
            escolar
          </div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fdc96dfdba061615803025a6f2477897972c48e?placeholderIfAbsent=true"
          alt="Vibepass Logo"
          className={styles.vibeLogo}
        />
      </div>

      {/* Promo Section */}
      <div className={styles.promoSection}>
        <div className={styles.promoText}>
          <div className={styles.promoMessage}>
            Añade tus productos antes del evento
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/399bab42e12cf80d8c1e28fd46b34100fed6bd9b?placeholderIfAbsent=true"
            alt="Check icon"
            className={styles.promoIcon}
          />
        </div>
        <div className={styles.cartTag}>Carrito de compra</div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <FoodCategoryTabs
              foodItems={foodItems}
              onQuantityChange={handleQuantityChange}
            />
          </div>
          <div className={styles.rightColumn}>
            <FoodCartSidebar foodItems={foodItems} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
