"use client";
import React from "react";
import styles from "./TicketRow.module.css";
import QuantitySelector from "@/components/Cart/QuantitySelector/QuantitySelector";

interface TicketRowProps {
  name: string;
  price: string;
}

const TicketRow: React.FC<TicketRowProps> = ({ name, price }) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>{price}</div>
      <QuantitySelector />
    </div>
  );
};

export default TicketRow;
