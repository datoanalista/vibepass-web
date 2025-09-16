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
  const { isLoggedIn, isLoading, isHydrated } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  useEffect(() => {
    console.log('🎫 [VentaEntrada] Estado auth:', { isLoading, isLoggedIn, isHydrated });
    // Solo mostrar modal si ya terminó de cargar, está hidratado y no está logueado
    if (!isLoading && isHydrated && !isLoggedIn) {
      console.log('🚨 [VentaEntrada] Mostrando modal de autenticación requerida');
      setShowAuthModal(true);
    }
  }, [isLoggedIn, isLoading, isHydrated]);

  const handleModalClose = () => {
    setShowAuthModal(false);
    router.push('/eventos'); // Redirigir a eventos si cierra el modal
  };

  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />
      {isLoading ? (
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
      ) : isLoggedIn ? (
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
          Redirigiendo...
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
