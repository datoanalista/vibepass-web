"use client";
import React from "react";
import AdminDashboardHeader from "@/components/Shared/AdminDashboardHeader/AdminDashboardHeader";
import EventHeader from "./EventHeader/EventHeader";
import SalesStatsSection from "./SalesStatsSection/SalesStatsSection";
import SalesHistorySection from "./SalesHistorySection/SalesHistorySection";
import CalendarWidget from "./CalendarWidget/CalendarWidget";
import ProductsTable from "./ProductsTable/ProductsTable";
import PastEventsTable from "./PastEventsTable/PastEventsTable";
import styles from "./EventoDashboard.module.css";

export default function EventoDashboard() {
  return (
    <div className={styles.container}>
      <AdminDashboardHeader />

      <div className={styles.spacer} />

      <EventHeader />

      <div className={styles.dividerSection}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/be1dd00b2fcb7c13bea99732507a82d0e3fdc76a?placeholderIfAbsent=true"
          alt="Divider"
          className={styles.dividerImage}
        />
        <div className={styles.dividerLine} />
      </div>

      <SalesStatsSection />

      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          <SalesHistorySection />
        </div>

        <div className={styles.rightSection}>
          <CalendarWidget />
        </div>
      </div>

      <ProductsTable />

      <PastEventsTable />
    </div>
  );
}
