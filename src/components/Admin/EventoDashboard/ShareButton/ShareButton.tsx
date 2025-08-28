"use client";
import React from "react";
import styles from "./ShareButton.module.css";

interface ShareButtonProps {
  onClick?: () => void;
}

export default function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <button className={styles.shareButton} onClick={onClick}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/be1dd00b2fcb7c13bea99732507a82d0e3fdc76a?placeholderIfAbsent=true"
        alt="Share"
        className={styles.shareIcon}
      />
      <span>Compartir</span>
    </button>
  );
}
