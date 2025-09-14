"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthRequiredModal.module.css";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleRegister = () => {
    onClose();
    router.push('/login');
  };

  const handleStayAsGuest = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Registro Requerido</h2>
          <p className={styles.modalMessage}>
            Debe estar registrado para comprar su entrada
          </p>
          <div className={styles.modalButtons}>
            <button 
              className={styles.modalButton}
              onClick={handleRegister}
            >
              Quiero registrarme
            </button>
            <button 
              className={styles.modalButtonSecondary}
              onClick={handleStayAsGuest}
            >
              Permanecer como invitado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRequiredModal;
