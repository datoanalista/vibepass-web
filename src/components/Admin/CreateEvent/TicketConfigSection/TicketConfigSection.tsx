"use client";
import React, { useState } from "react";
import styles from "./TicketConfigSection.module.css";

interface TicketType {
  id: number;
  type: string;
  price: string;
  capacity: string;
  limit: string;
  salesPeriod: string;
}

export default function TicketConfigSection() {
  const [tickets, setTickets] = useState<TicketType[]>([
    {
      id: 1,
      type: "General",
      price: "$5.000",
      capacity: "150",
      limit: "Sin limite",
      salesPeriod: "01/01/2025 - 14/03/2025",
    },
    {
      id: 2,
      type: "Profesor",
      price: "$3.000",
      capacity: "50",
      limit: "1",
      salesPeriod: "01/01/2025 - 14/03/2025",
    },
  ]);

  const handleInputChange = (
    id: number,
    field: keyof TicketType,
    value: string,
  ) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: value } : ticket,
      ),
    );
  };

  const addNewTicket = () => {
    const newTicket: TicketType = {
      id: Date.now(),
      type: "",
      price: "",
      capacity: "",
      limit: "",
      salesPeriod: "",
    };
    setTickets((prev) => [...prev, newTicket]);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>Configuración de Entradas</div>
      <div className={styles.formContainer}>
        <div className={styles.gridContainer}>
          <div className={styles.typeColumn}>
            {tickets.map((ticket) => (
              <div key={ticket.id} className={styles.ticketGroup}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Tipo de Entrada</label>
                  <input
                    type="text"
                    value={ticket.type}
                    onChange={(e) =>
                      handleInputChange(ticket.id, "type", e.target.value)
                    }
                    placeholder="General"
                    className={styles.input}
                  />
                </div>
              </div>
            ))}
            <button onClick={addNewTicket} className={styles.addButton}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/plus-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Add"
                className={styles.addIcon}
              />
              Agregar nueva entrada
            </button>
          </div>

          <div className={styles.priceCapacityColumn}>
            {tickets.map((ticket) => (
              <div key={ticket.id} className={styles.ticketGroup}>
                <div className={styles.priceCapacityRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Precio (CLP)</label>
                    <input
                      type="text"
                      value={ticket.price}
                      onChange={(e) =>
                        handleInputChange(ticket.id, "price", e.target.value)
                      }
                      placeholder="$5.000"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Cupos disponibles</label>
                    <input
                      type="text"
                      value={ticket.capacity}
                      onChange={(e) =>
                        handleInputChange(ticket.id, "capacity", e.target.value)
                      }
                      placeholder="150"
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.limitColumn}>
            {tickets.map((ticket) => (
              <div key={ticket.id} className={styles.ticketGroup}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Limite por persona</label>
                  <input
                    type="text"
                    value={ticket.limit}
                    onChange={(e) =>
                      handleInputChange(ticket.id, "limit", e.target.value)
                    }
                    placeholder="Sin limite"
                    className={styles.input}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.salesPeriodColumn}>
            {tickets.map((ticket) => (
              <div key={ticket.id} className={styles.ticketGroup}>
                <div className={styles.salesPeriodGroup}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Fechas de venta</label>
                    <input
                      type="text"
                      value={ticket.salesPeriod}
                      onChange={(e) =>
                        handleInputChange(
                          ticket.id,
                          "salesPeriod",
                          e.target.value,
                        )
                      }
                      placeholder="01/01/2025 - 14/03/2025"
                      className={styles.input}
                    />
                  </div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/delete-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                    alt="Delete"
                    className={styles.deleteIcon}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
