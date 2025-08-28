"use client";
import React from "react";
import styles from "./ProductsTable.module.css";

interface ProductTableRow {
  type: string;
  totalQuotas: number;
  usedQuotas: number;
  validatedQuotas: number;
  unusedQuotas: number;
  cancelled: number | string;
}

interface ProductsTableProps {
  products?: ProductTableRow[];
}

const defaultProducts: ProductTableRow[] = [
  {
    type: "Ticket",
    totalQuotas: 600,
    usedQuotas: 260,
    validatedQuotas: 220,
    unusedQuotas: 115,
    cancelled: 5,
  },
  {
    type: "Parking",
    totalQuotas: 260,
    usedQuotas: 120,
    validatedQuotas: 100,
    unusedQuotas: 40,
    cancelled: "-",
  },
  {
    type: "Inflables",
    totalQuotas: 6,
    usedQuotas: 3,
    validatedQuotas: 2,
    unusedQuotas: 1,
    cancelled: "-",
  },
  {
    type: "Reposera",
    totalQuotas: 79,
    usedQuotas: 35,
    validatedQuotas: 30,
    unusedQuotas: 14,
    cancelled: "-",
  },
];

export default function ProductsTable({
  products = defaultProducts,
}: ProductsTableProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.sectionTitle}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/be1dd00b2fcb7c13bea99732507a82d0e3fdc76a?placeholderIfAbsent=true"
            alt="Products"
            className={styles.titleIcon}
          />
          <span>Productos agendables</span>
        </div>
        <div className={styles.createButton}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca3afeb82c2f1329c78e50d5a2bb3b50e0c8d892?placeholderIfAbsent=true"
            alt="Create"
            className={styles.createIcon}
          />
          <span>Crear agendamiento</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Tipo</div>
          <div className={styles.headerCell}>
            Cupos
            <br />
            en total
          </div>
          <div className={styles.headerCell}>
            Cupos
            <br />
            usados
          </div>
          <div className={styles.headerCell}>
            Cupos
            <br />
            Validados
          </div>
          <div className={styles.headerCell}>
            Cupos
            <br />
            sin usar
          </div>
          <div className={styles.headerCell}>Anulados</div>
        </div>

        <div className={styles.tableContent}>
          {products.map((product, index) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.productType}>{product.type}</div>
              <div className={styles.dataCell}>{product.totalQuotas}</div>
              <div className={styles.dataCellBlue}>{product.usedQuotas}</div>
              <div className={styles.dataCellBlue}>
                {product.validatedQuotas}
              </div>
              <div className={styles.unusedQuotasCell}>
                <span className={styles.dataCellBlue}>
                  {product.unusedQuotas}
                </span>
                {index === 3 && (
                  <div className={styles.viewAllSection}>
                    <span className={styles.viewAllText}>
                      Ver todos los agendables
                    </span>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1a7cfb859473bf7b7c94c59b10ce7e5b6f2c8aa?placeholderIfAbsent=true"
                      alt="View All"
                      className={styles.viewAllIcon}
                    />
                  </div>
                )}
              </div>
              <div className={styles.cancelledCell}>
                <span className={styles.dataCell}>{product.cancelled}</span>
                <div className={styles.editButton}>Editar</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
