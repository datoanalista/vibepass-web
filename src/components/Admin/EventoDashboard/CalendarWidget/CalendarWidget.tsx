"use client";
import React from "react";
import styles from "./CalendarWidget.module.css";

interface CalendarWidgetProps {
  currentMonth?: string;
  currentYear?: string;
  selectedDate?: number;
}

export default function CalendarWidget({
  currentMonth = "Mayo",
  currentYear = "2025",
  selectedDate = 20,
}: CalendarWidgetProps) {
  const daysOfWeek = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

  const calendarDays = [
    [28, 29, 30, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, 1],
  ];

  const isCurrentMonth = (day: number, weekIndex: number) => {
    if (weekIndex === 0) return day >= 1;
    if (weekIndex === 4) return day <= 31;
    return true;
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Calendario</div>

      <div className={styles.calendarCard}>
        <div className={styles.calendarHeader}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1a7cfb859473bf7b7c94c59b10ce7e5b6f2c8aa?placeholderIfAbsent=true"
            alt="Previous"
            className={styles.navigationArrow}
          />
          <div className={styles.monthYear}>
            {currentMonth} de {currentYear}
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1a7cfb859473bf7b7c94c59b10ce7e5b6f2c8aa?placeholderIfAbsent=true"
            alt="Next"
            className={styles.navigationArrow}
          />
        </div>

        <div className={styles.daysHeader}>
          {daysOfWeek.map((day, index) => (
            <div key={index} className={styles.dayHeader}>
              {day}
            </div>
          ))}
        </div>

        {calendarDays.map((week, weekIndex) => (
          <div key={weekIndex} className={styles.calendarWeek}>
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`${styles.calendarDay} ${
                  day === selectedDate ? styles.selectedDay : ""
                } ${!isCurrentMonth(day, weekIndex) ? styles.otherMonth : ""}`}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
