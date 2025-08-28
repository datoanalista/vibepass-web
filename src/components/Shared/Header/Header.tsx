"use client";
import React from "react";
import styles from "./Header.module.css";
import HeroGif from "@/components/Shared/HeroGif/HeroGif";

const Header: React.FC = () => {
  return (
    <>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/88a42613571d87d723467f24e006b8a3fc0ab9f4?width=3840"
        alt="Group 287"
        className={styles.topHeader}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fbb63ad61349584b754b591e8eaeefc8779d5083?width=102"
        alt="Group 161"
        className={styles.headerIcon}
      />
    </>
  );
};

export default Header;
