"use client";
import React from "react";
import styles from "./SalesHistorySection.module.css";

interface SalesItem {
  name: string;
  amount: string;
}

interface SalesHistorySectionProps {
  salesItems?: SalesItem[];
}

const defaultSalesItems: SalesItem[] = [
  { name: "Entradas", amount: "$ 2.800.000" },
  { name: "Arriendos", amount: "$ 900.000" },
  { name: "Bebestibles", amount: "$ 400.000" },
  { name: "Hot dogs", amount: "$ 700.000" },
  { name: "Helados", amount: "$ 1.000.000" },
];

export default function SalesHistorySection({
  salesItems = defaultSalesItems,
}: SalesHistorySectionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.historialButton}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca3afeb82c2f1329c78e50d5a2bb3b50e0c8d892?placeholderIfAbsent=true"
          alt="History"
          className={styles.historialIcon}
        />
        <span>Historial</span>
      </div>

      <div className={styles.salesCard}>
        <div className={styles.salesContent}>
          <div className={styles.leftColumn}>
            <div className={styles.sectionTitle}>Ventas del día</div>

            {salesItems.map((item, index) => (
              <div key={index} className={styles.salesItem}>
                <div className={styles.dot} />
                <div className={styles.itemName}>{item.name}</div>
              </div>
            ))}
          </div>

          <div className={styles.rightColumn}>
            {salesItems.map((item, index) => (
              <div key={index} className={styles.amount}>
                {item.amount}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.viewAllSales}>Ver todas las ventas del día</div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1a7cfb859473bf7b7c94c59b10ce7e5b6f2c8aa?placeholderIfAbsent=true"
        alt="View All"
        className={styles.viewAllIcon}
      />
    </div>
  );
}
