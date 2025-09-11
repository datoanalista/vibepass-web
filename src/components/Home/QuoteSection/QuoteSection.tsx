import React, { useState } from 'react';
import { getImagePath } from '@/utils/getImagePath';
import styles from './QuoteSection.module.css';

const QuoteSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    numero: '',
    ayuda: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormComplete = () => {
    return formData.nombre.trim() !== '' &&
           formData.apellido.trim() !== '' &&
           formData.correo.trim() !== '' &&
           formData.numero.trim() !== '' &&
           formData.ayuda.trim() !== '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormComplete()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Generar JSON para backend
    const cotizacionData = {
      timestamp: new Date().toISOString(),
      cliente: {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        telefono: formData.numero
      },
      solicitud: {
        mensaje: formData.ayuda,
        tipo: 'cotizacion_evento'
      },
      origen: 'modal_home'
    };

    console.log('=== DATOS PARA BACKEND - COTIZACIÓN ===');
    console.log(JSON.stringify(cotizacionData, null, 2));
    console.log('=== FIN DATOS COTIZACIÓN ===');
    
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
    
    // Reset form
    setFormData({
      nombre: '',
      apellido: '',
      correo: '',
      numero: '',
      ayuda: ''
    });
  };

  return (
    <section id="cotizacion" className={styles.quoteSection}>
      <img 
        src={getImagePath("/images/fondo_section.png")} 
        alt="Fondo decorativo" 
        className={styles.backgroundImage}
      />
      
      <div className={styles.content}>
        <div className={styles.devices}>
          <img 
            src={getImagePath("/images/laptop.svg")} 
            alt="Laptop" 
            className={styles.laptop}
          />
        </div>
        
        <div className={styles.text}>
          <img 
            src={getImagePath("/images/icon_vibepass.svg")} 
            alt="Vibepass" 
            className={styles.logo}
          />
          <h2 className={styles.title}>
            Rápido, digital y totalmente tuyo
          </h2>
          <p className={styles.description}>
            Transformamos la forma de vivir los eventos.<br />
            Sin filas, solo un código QR y la mejor experiencia.<br />
            Ayudamos a empresas y marcas a gestionar sus eventos de forma rápida y sin complicaciones.
          </p>
          <img 
            src={getImagePath("/images/barra cotiza.png")} 
            alt="Cotiza con nosotros" 
            className={styles.button}
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Modal de Cotización */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalWrapper}>
            {/* Botón de cierre - ARRIBA de la modal */}
            <div className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
              <span className={styles.closeText}>Cotización</span>
              <img 
                src={getImagePath("/images/close_icon.png")} 
                alt="Cerrar" 
                className={styles.closeIcon}
              />
            </div>

            <div className={styles.modalContainer}>
            {/* Modal content */}
            <div className={styles.modalContent}>
              {/* Icono fecha */}
              <img 
                src={getImagePath("/images/fecha_icon.png")} 
                alt="Fecha" 
                className={styles.dateIcon}
              />

              {/* Título */}
              <h2 className={styles.modalTitle}>Conversemos</h2>

              {/* Descripción */}
              <p className={styles.modalDescription}>
                Cotiza tu siguiente evento con nosotros
              </p>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Ingrese su nombre..."
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Apellido</label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Ingrese su apellido..."
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Correo</label>
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="mail@mail.com"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Número</label>
                    <input
                      type="tel"
                      name="numero"
                      value={formData.numero}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="+56912345678"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>¿Cómo podemos ayudarte?</label>
                  <textarea
                    name="ayuda"
                    value={formData.ayuda}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    placeholder="Agregue su cotización, comentario o dudas..."
                    rows={4}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className={`${styles.submitButton} ${!isFormComplete() ? styles.submitButtonDisabled : ''}`}
                  disabled={!isFormComplete()}
                >
                  Enviar Cotización
                </button>
              </form>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      {isSuccessModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsSuccessModalOpen(false)}>
          <div className={styles.successModalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.successModalContent}>
              {/* Icono de éxito */}
              <div className={styles.successIcon}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="#4CAF50"/>
                  <path d="M25 30L28 33L35 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Título */}
              <h2 className={styles.successTitle}>¡Cotización Enviada!</h2>

              {/* Mensaje */}
              <p className={styles.successMessage}>
                Tu solicitud ha sido enviada exitosamente. Nos pondremos en contacto contigo muy pronto.
              </p>

              {/* Botón de cerrar */}
              <button 
                className={styles.successButton}
                onClick={() => setIsSuccessModalOpen(false)}
              >
                Perfecto
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuoteSection;
