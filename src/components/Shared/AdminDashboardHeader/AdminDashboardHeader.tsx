"use client";
import React from "react";
import styles from "./AdminDashboardHeader.module.css";

interface AdminDashboardHeaderProps {
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

export default function AdminDashboardHeader({
  userName = "José Ortiz",
  userRole = "Administrador",
  userAvatar = "https://cdn.builder.io/api/v1/image/assets/TEMP/6354831e73de5f432b760081c39b52c4007aadd6?placeholderIfAbsent=true",
}: AdminDashboardHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.leftSection}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/be1dd00b2fcb7c13bea99732507a82d0e3fdc76a?placeholderIfAbsent=true"
            alt="Logo"
            className={styles.logo}
          />

          <div className={styles.dashboardTab}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f95ed27b45b549aaaa21d13cafceef3b909b781c?placeholderIfAbsent=true"
              alt="Dashboard"
              className={styles.dashboardIcon}
            />
            <span>Dashboard</span>
          </div>

          <div className={styles.navItem}>Busca Ticket</div>

          <div className={styles.inventorySection}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/adf208ebecdac5f9183c1acaef23a5d9481bbc72?placeholderIfAbsent=true"
              alt="Inventory"
              className={styles.inventoryIcon}
            />
            <span>Inventario</span>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.userProfile}>
            <img
              src={userAvatar}
              alt="User Avatar"
              className={styles.userAvatar}
            />
            <div className={styles.userInfo}>
              <div className={styles.userName}>{userName}</div>
              <div className={styles.userRole}>{userRole}</div>
            </div>
          </div>

          <div className={styles.actionsSection}>
            <div className={styles.divider} />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b36149bb916ee4a3a895edcb03939c5bbb475fde?placeholderIfAbsent=true"
              alt="Logout"
              className={styles.logoutIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
