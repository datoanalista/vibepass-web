"use client";
import React from "react";
import styles from "./PastEventsTable.module.css";

interface PastEvent {
  client: string;
  rut: string;
  name: string;
  email: string;
  date: string;
}

interface PastEventsTableProps {
  events?: PastEvent[];
}

const defaultEvents: PastEvent[] = [
  {
    client: "British\nRoyal School",
    rut: "96.123.456-7",
    name: "Juan Pérez",
    email: "perez@british.cl",
    date: "01/07/2025",
  },
  {
    client: "British\nRoyal School",
    rut: "96.123.456-7",
    name: "Juan Pérez",
    email: "perez@british.cl",
    date: "05/06/2025",
  },
  {
    client: "British\nRoyal School",
    rut: "96.123.456-7",
    name: "Juan Pérez",
    email: "perez@british.cl",
    date: "10/03/2025",
  },
  {
    client: "British\nRoyal School",
    rut: "96.123.456-7",
    name: "Juan Pérez",
    email: "Perez@british.cl",
    date: "01/07/2024",
  },
];

export default function PastEventsTable({
  events = defaultEvents,
}: PastEventsTableProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/be1dd00b2fcb7c13bea99732507a82d0e3fdc76a?placeholderIfAbsent=true"
          alt="History"
          className={styles.titleIcon}
        />
        <span>Historial eventos pasados</span>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Cliente</div>
          <div className={styles.headerCell}>
            Rut de
            <br />
            empresa
          </div>
          <div className={styles.headerCell}>Nombre</div>
          <div className={styles.headerCell}>Correo</div>
          <div className={styles.headerCell}>Fecha</div>
        </div>

        <div className={styles.tableContent}>
          <div className={styles.tableRows}>
            {events.map((event, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.clientCell}>
                  {event.client.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < event.client.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                <div className={styles.rutCell}>{event.rut}</div>
                <div className={styles.nameCell}>{event.name}</div>
                <div className={styles.emailCell}>{event.email}</div>
                <div className={styles.dateCell}>{event.date}</div>
              </div>
            ))}

            <div className={styles.viewAllSection}>
              <div className={styles.viewAllText}>Ver todos los eventos</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1a7cfb859473bf7b7c94c59b10ce7e5b6f2c8aa?placeholderIfAbsent=true"
                alt="View All"
                className={styles.viewAllIcon}
              />
            </div>
          </div>

          <div className={styles.actionsColumn}>
            {events.map((_, index) => (
              <div key={index} className={styles.reportButton}>
                Ver informe
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
