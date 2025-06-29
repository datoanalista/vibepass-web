"use client";
import React, { useState } from "react";
import styles from "./GeneralInfoSection.module.css";

export default function GeneralInfoSection() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    location: "",
    banner: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        banner: e.target.files![0],
      }));
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>Información general</div>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Escribir nombre de evento"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descripción del evento</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Escribir descripción de evento"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Fecha del evento</label>
          <div className={styles.dateTimeRow}>
            <input
              type="text"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleInputChange}
              placeholder="Fecha del Evento"
              className={styles.dateInput}
            />
            <input
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              placeholder="Hora de Inicio"
              className={styles.timeInput}
            />
            <input
              type="text"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              placeholder="Hora de término"
              className={styles.timeInput}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Lugar del Evento</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Escribir descripción de evento"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Banner promocional</label>
          <div className={styles.fileUpload}>
            <input
              type="file"
              id="banner-upload"
              onChange={handleFileChange}
              accept="image/*"
              className={styles.fileInput}
            />
            <label htmlFor="banner-upload" className={styles.fileUploadLabel}>
              (Adjuntar archivo)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
