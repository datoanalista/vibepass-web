"use client";
import React, { useState } from "react";
import styles from "./ProductsSection.module.css";

interface Product {
  id: number;
  category: string;
  name: string;
  price: string;
  stock: string;
  description: string;
  image: File | null;
  imageName?: string;
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      category: "Comida",
      name: "Hamburguesa",
      price: "$6.000",
      stock: "100 unidades",
      description: "Hamburguesa con queso",
      image: null,
    },
    {
      id: 2,
      category: "Comida",
      name: "Pizza pepperoni",
      price: "$10.000",
      stock: "90 unidades",
      description: "Masa, Queso, pepperoni",
      image: null,
      imageName: "pizza_peperoni.jpg",
    },
  ]);

  const handleInputChange = (
    id: number,
    field: keyof Product,
    value: string,
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: value } : product,
      ),
    );
  };

  const handleFileChange = (id: number, file: File | null) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              image: file,
              imageName: file ? file.name : undefined,
            }
          : product,
      ),
    );
  };

  const addNewProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      category: "",
      name: "",
      price: "",
      stock: "",
      description: "",
      image: null,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>Productos y Actividades</div>
      <div className={styles.formContainer}>
        <div className={styles.gridContainer}>
          <div className={styles.categoryColumn}>
            {products.map((product, index) => (
              <div key={product.id} className={styles.productGroup}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nombre del producto</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleInputChange(product.id, "name", e.target.value)
                    }
                    placeholder="Hamburguesa"
                    className={styles.input}
                  />
                </div>
              </div>
            ))}
            <button onClick={addNewProduct} className={styles.addButton}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/plus-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Add"
                className={styles.addIcon}
              />
              Agregar nueva entrada
            </button>
          </div>

          <div className={styles.priceStockColumn}>
            {products.map((product) => (
              <div key={product.id} className={styles.productGroup}>
                <div className={styles.priceStockRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Precio unitario (CLP)
                    </label>
                    <input
                      type="text"
                      value={product.price}
                      onChange={(e) =>
                        handleInputChange(product.id, "price", e.target.value)
                      }
                      placeholder="$6.000"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Stock asignado</label>
                    <input
                      type="text"
                      value={product.stock}
                      onChange={(e) =>
                        handleInputChange(product.id, "stock", e.target.value)
                      }
                      placeholder="100 unidades"
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.descriptionColumn}>
            {products.map((product) => (
              <div key={product.id} className={styles.productGroup}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Descripción</label>
                  <input
                    type="text"
                    value={product.description}
                    onChange={(e) =>
                      handleInputChange(
                        product.id,
                        "description",
                        e.target.value,
                      )
                    }
                    placeholder="Hamburguesa con queso"
                    className={styles.input}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.imageUploadSection}>
          {products.map((product) => (
            <div key={product.id} className={styles.imageUploadGroup}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Imagen</label>
                <div className={styles.fileUpload}>
                  <input
                    type="file"
                    id={`image-upload-${product.id}`}
                    onChange={(e) =>
                      handleFileChange(product.id, e.target.files?.[0] || null)
                    }
                    accept="image/*"
                    className={styles.fileInput}
                  />
                  <label
                    htmlFor={`image-upload-${product.id}`}
                    className={styles.fileUploadLabel}
                  >
                    <span className={styles.fileText}>
                      {product.imageName || "(Subir archivo)"}
                    </span>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/upload-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                      alt="Upload"
                      className={styles.uploadIcon}
                    />
                  </label>
                </div>
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/delete-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Delete"
                className={styles.deleteIcon}
              />
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
