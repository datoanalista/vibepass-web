"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Header from "@/components/Shared/Header/Header";
import Footer from "@/components/Shared/Footer/Footer";
import PromotionCard from "@/components/Purchase/PromotionCard/PromotionCard";
import AttractionsSection from "@/components/Purchase/AttractionsSection/AttractionsSection";
import PurchaseCartSidebar from "@/components/Purchase/PurchaseCartSidebar/PurchaseCartSidebar";
import {
  promotionsData,
  attractionsData,
  initialCartData,
  Attraction,
  CartItem,
} from "@/data/Purchase/attractionsData";

export default function PurchasePage() {
  const [attractions, setAttractions] = useState<Attraction[]>(attractionsData);
  const [cartItems] = useState<CartItem[]>(initialCartData);

  const handleQuantityChange = (attractionId: number, newQuantity: number) => {
    setAttractions((prev) =>
      prev.map((attraction) =>
        attraction.id === attractionId
          ? { ...attraction, quantity: newQuantity }
          : attraction,
      ),
    );
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          {/* Status Indicator */}
          <div className={styles.statusIndicator}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 9.1L9.79999 6.3H4.2L7 9.1ZM7 14C6.03166 14 5.12166 13.8161 4.27 13.4484C3.41833 13.0807 2.6775 12.582 2.0475 11.9525C1.4175 11.323 0.918867 10.5821 0.551601 9.73C0.184334 8.87786 0.000467552 7.96786 8.86075e-07 7C-0.00046578 6.03213 0.183401 5.12213 0.551601 4.27C0.9198 3.41787 1.41843 2.67703 2.0475 2.0475C2.67657 1.41797 3.4174 0.919333 4.27 0.5516C5.1226 0.183867 6.0326 0 7 0C7.9674 0 8.87739 0.183867 9.72999 0.5516C10.5826 0.919333 11.3234 1.41797 11.9525 2.0475C12.5816 2.67703 13.0804 3.41787 13.4491 4.27C13.8178 5.12213 14.0014 6.03213 14 7C13.9986 7.96786 13.8147 8.87786 13.4484 9.73C13.0821 10.5821 12.5834 11.323 11.9525 11.9525C11.3216 12.582 10.5807 13.0809 9.72999 13.4491C8.87926 13.8173 7.96926 14.0009 7 14Z"
                fill="#12C70E"
              />
            </svg>
          </div>

          {/* Promotions Section */}
          <div className={styles.promotionsSection}>
            <h2 className={styles.sectionTitle}>Promociones</h2>
            <div className={styles.promotionsGrid}>
              {promotionsData.map((promotion) => (
                <PromotionCard key={promotion.id} title={promotion.title} />
              ))}
            </div>
          </div>

          {/* Attractions Section */}
          <AttractionsSection
            attractions={attractions}
            onQuantityChange={handleQuantityChange}
          />
        </div>

        {/* Cart Sidebar */}
        <div className={styles.rightSection}>
          <PurchaseCartSidebar cartItems={cartItems} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
