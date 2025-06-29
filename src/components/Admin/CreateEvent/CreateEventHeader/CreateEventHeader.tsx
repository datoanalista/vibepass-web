"use client";
import React from "react";
import styles from "./CreateEventHeader.module.css";

export default function CreateEventHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.welcomeSection}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/user-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
            alt="User icon"
            className={styles.userIcon}
          />
          <div className={styles.welcomeText}>¡Crea tu evento!</div>
        </div>
        <div className={styles.userSection}>
          <div className={styles.userProfile}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/profile-avatar.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="Profile avatar"
              className={styles.profileAvatar}
            />
            <div className={styles.userInfo}>
              <div className={styles.userName}>José Ortiz</div>
              <div className={styles.userRole}>Administrador</div>
            </div>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.divider} />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/logout-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="Logout"
              className={styles.logoutIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
