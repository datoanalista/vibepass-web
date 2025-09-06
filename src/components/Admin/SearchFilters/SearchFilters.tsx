"use client";
import React from "react";
import styles from "./SearchFilters.module.css";
import { getImagePath } from "@/utils/getImagePath";

export default function SearchFilters() {
  return (
    <div className={styles.container}>
      <div className={styles.filtersRow}>
        <div className={styles.searchBox}>
          <img
            src={getImagePath("/images/search-icon.png")}
            alt="Search"
            className={styles.searchIcon}
          />
          <div className={styles.searchText}>Buscar</div>
        </div>

        <div className={styles.timeFilter}>Esta semana</div>

        <div className={styles.dateRangePicker}>
          <div className={styles.dateRangeLeft}>
            <img
              src={getImagePath("/images/arrow-left.png")}
              alt="Previous"
              className={styles.arrowIcon}
            />
            <div className={styles.dateDivider} />
          </div>

          <div className={styles.dateRangeContent}>
            <img
              src={getImagePath("/images/calendar-icon.png")}
              alt="Calendar"
              className={styles.calendarIcon}
            />
            <div className={styles.dateRangeText}>1 Abri 2025 - 1 May 2025</div>
          </div>

          <div className={styles.dateRangeRight}>
            <div className={styles.dateDivider} />
            <img
              src={getImagePath("/images/arrow-right.png")}
              alt="Next"
              className={styles.arrowIcon}
            />
          </div>
        </div>
      </div>

      <div className={styles.createEventButton}>
        <img
          src={getImagePath("/images/plus-icon.png")}
          alt="Add"
          className={styles.plusIcon}
        />
        <div className={styles.createEventText}>Crear nuevo evento</div>
      </div>
    </div>
  );
}
