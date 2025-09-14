"use client";
import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import Footer from "@/components/Shared/Footer/Footer";
import VentaEntradaPage from "@/components/Events/VentaEntradaPage/VentaEntradaPage";
import { useAuth } from "@/contexts/AuthContext";
import AuthRequiredModal from "@/components/Shared/AuthRequiredModal/AuthRequiredModal";
import styles from "./page.module.css";

// Forzar renderizado dinámico para evitar errores de prerendering
export const dynamic = 'force-dynamic';

const VentaEntradaPageComponent: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    }
  }, [isLoggedIn]);

  const handleModalClose = () => {
    setShowAuthModal(false);
    router.push('/eventos'); // Redirigir a eventos si cierra el modal
  };

  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />
      {isLoggedIn ? (
        <Suspense fallback={<div>Cargando...</div>}>
          <VentaEntradaPage />
        </Suspense>
      ) : (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '18px',
          color: '#666'
        }}>
          Verificando autenticación...
        </div>
      )}
      <Footer />
      
      {/* Modal de autenticación requerida */}
      <AuthRequiredModal 
        isOpen={showAuthModal}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default VentaEntradaPageComponent;
