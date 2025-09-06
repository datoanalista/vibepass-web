"use client";
import React from "react";
import styles from "./AdminHeader.module.css";
import { getImagePath } from "@/utils/getImagePath";

export default function AdminHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.welcomeSection}>
          <img
            src={getImagePath("/images/welcome-icon.png")}
            alt="Welcome Icon"
            className={styles.welcomeIcon}
          />
          <div className={styles.welcomeText}>¡Bienvenido, José Ortiz!</div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.userProfile}>
            <img
              src={getImagePath("/images/user-avatar.png")}
              alt="User Avatar"
              className={styles.userAvatar}
            />
            <div className={styles.userInfo}>
              <div className={styles.userName}>José Ortiz</div>
              <div className={styles.userRole}>Administrador</div>
            </div>
          </div>

          <div className={styles.actionsSection}>
            <div className={styles.divider} />
            <img
              src={getImagePath("/images/logout-icon.png")}
              alt="Logout"
              className={styles.logoutIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
