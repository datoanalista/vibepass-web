"use client";
import React from "react";
import styles from "./FoodCategoryTabs.module.css";
import FoodProductCard from "../FoodProductCard/FoodProductCard";
import { FoodItem } from "@/data/FoodCart/foodItemsData";

interface FoodCategoryTabsProps {
  foodItems: FoodItem[];
  onQuantityChange: (itemId: number, newQuantity: number) => void;
}

const FoodCategoryTabs: React.FC<FoodCategoryTabsProps> = ({
  foodItems,
  onQuantityChange,
}) => {
  const alimentos = foodItems.filter((item) => item.category === "alimentos");
  const bebestibles = foodItems.filter(
    (item) => item.category === "bebestibles",
  );

  return (
    <div className={styles.container}>
      <div className={styles.categoryHeader}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/655865a47ecab0c0312e0cf43eb79dc4e71c2d09?placeholderIfAbsent=true"
          alt="Food icon"
          className={styles.categoryIcon}
        />
        <div className={styles.categoryTitle}>Comida, Snak, Bebestibles</div>
      </div>

      <div className={styles.contentCard}>
        <div className={styles.vendorInfo}>
          <div className={styles.vendorIcon}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2713e58d83a0b59210d64e54924766cd16b345b?placeholderIfAbsent=true"
              alt="Vendor"
              className={styles.vendorImage}
            />
          </div>
          <div className={styles.vendorName}>CATERING BORCELLE</div>
        </div>

        <div className={styles.categorySection}>
          <div className={styles.sectionHeader}>Alimentos</div>
          <div className={styles.productGrid}>
            {alimentos.map((item) => (
              <div key={item.id} className={styles.productColumn}>
                <FoodProductCard
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity) =>
                    onQuantityChange(item.id, newQuantity)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.categorySection}>
          <div className={styles.sectionHeader}>Bebestibles</div>
          <div className={styles.productGrid}>
            {bebestibles.map((item) => (
              <div key={item.id} className={styles.productColumn}>
                <FoodProductCard
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity) =>
                    onQuantityChange(item.id, newQuantity)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCategoryTabs;
