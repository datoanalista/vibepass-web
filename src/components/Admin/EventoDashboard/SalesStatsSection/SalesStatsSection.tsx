"use client";
import React from "react";
import EventStatusIndicator from "../EventStatusIndicator/EventStatusIndicator";
import SalesCard from "../SalesCard/SalesCard";
import ShareButton from "../ShareButton/ShareButton";
import styles from "./SalesStatsSection.module.css";

interface SalesStatsSectionProps {
  totalSales?: string;
  dailySales?: string;
  newRegistrations?: string;
}

export default function SalesStatsSection({
  totalSales = "$ 5.800.000",
  dailySales = "$ 5.360.000",
  newRegistrations = "17",
}: SalesStatsSectionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <EventStatusIndicator />

        <div className={styles.tooltip}>
          El ''total de ventas'' es la <br />
          suma de todos los ingresos.
        </div>

        <SalesCard
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/be1dd00b2fcb7c13bea99732507a82d0e3fdc76a?placeholderIfAbsent=true"
          title="Total de ventas"
          amount={totalSales}
          className={styles.totalSalesCard}
        />
      </div>

      <div className={styles.rightColumn}>
        <ShareButton />

        <div className={styles.dailyStatsGrid}>
          <SalesCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/be1dd00b2fcb7c13bea99732507a82d0e3fdc76a?placeholderIfAbsent=true"
            title="Ventas atribuibles del día"
            amount={dailySales}
          />

          <SalesCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/ca3afeb82c2f1329c78e50d5a2bb3b50e0c8d892?placeholderIfAbsent=true"
            title="Registrados nuevos"
            amount={newRegistrations}
            className={styles.registrationsCard}
          />
        </div>
      </div>
    </div>
  );
}
