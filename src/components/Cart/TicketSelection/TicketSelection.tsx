"use client";
import React from "react";
import styles from "./TicketSelection.module.css";
import TicketRow from "@/components/Cart/TicketRow/TicketRow";

const TicketSelection: React.FC = () => {
  const ticketTypes = [
    {
      id: 1,
      name: "Niños (Hasta 14 años)",
      price: "$10.000",
    },
    {
      id: 2,
      name: "Adultos",
      price: "$15.000",
    },
    {
      id: 3,
      name: "Adulto mayor",
      price: "$6.000",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>Escoge tus entradas</div>
      <div className={styles.content}>
        <div className={styles.spacer} />
        <div className={styles.date}>20/05/2025</div>
        <div className={styles.tableHeader}>
          <div>ENTRADA</div>
          <div>PRECIO</div>
          <div>CANTIDAD</div>
        </div>
        <div className={styles.ticketList}>
          {ticketTypes.map((ticket, index) => (
            <React.Fragment key={ticket.id}>
              <TicketRow name={ticket.name} price={ticket.price} />
              {index < ticketTypes.length - 1 && (
                <div className={styles.divider} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
