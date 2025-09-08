import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEventUsers } from '@/hooks/useEventUsers';
import { getImagePath } from '@/utils/getImagePath';
import styles from './EventoSeleccionadoPage.module.css';

const EventoSeleccionadoPage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventoId = searchParams.get('eventoId');
  const { users, event, loading, error } = useEventUsers(eventoId);
  return (
    <main className={styles.eventoSeleccionadoPage}>
      {/* Navegación breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/eventos" className={styles.breadcrumbLink}>
          <img 
            src={getImagePath("/images/flecha_home.svg")} 
            alt="<" 
            className={styles.breadcrumbArrow}
          />
          Regresar a todos los eventos
        </Link>
      </div>

      {/* Banner en construcción bonito */}
      <div className={styles.constructionBanner}>
        <div className={styles.constructionContent}>
          <div className={styles.constructionIcon}>🚧</div>
          <h1 className={styles.constructionTitle}>Página en Construcción</h1>
          <p className={styles.constructionText}>
            Estamos trabajando en los detalles del evento. Pronto podrás ver toda la información, 
            comprar tickets y disfrutar de la mejor experiencia.
          </p>

          {/* Debug Info - Datos del evento */}
          <div className={styles.debugInfo}>
            <h3>🔍 Debug Info - Evento ID: {eventoId || 'undefined'}</h3>
            
            {!eventoId && (
              <div className={styles.warningInfo}>
                <p><strong>⚠️ Advertencia:</strong> No se proporcionó un ID de evento. Ve a la página de eventos y haz clic en una card para ver los detalles.</p>
                <p>URL actual: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
              </div>
            )}
            
            {eventoId && loading && <p>⏳ Cargando datos del evento...</p>}
            
            {eventoId && error && (
              <div className={styles.errorInfo}>
                <p><strong>❌ Error:</strong> {error}</p>
              </div>
            )}
            
            {eventoId && event && (
              <div className={styles.eventInfo}>
                <h4>📋 Información del Evento:</h4>
                <p><strong>ID:</strong> {event.id}</p>
                <p><strong>Nombre:</strong> {event.name}</p>
              </div>
            )}
            
            {eventoId && users.length > 0 && (
              <div className={styles.usersInfo}>
                <h4>👥 Usuarios del Evento ({users.length}):</h4>
                <div className={styles.usersList}>
                  {users.map((user, index) => (
                    <div key={user._id} className={styles.userCard}>
                      <p><strong>Nombre:</strong> {user.nombreCompleto}</p>
                      <p><strong>Email:</strong> {user.correoElectronico}</p>
                      <p><strong>Rol:</strong> {user.rol}</p>
                      <p><strong>Teléfono:</strong> {user.telefonoContacto}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.constructionFeatures}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎫</span>
              <span className={styles.featureText}>Compra de tickets</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📅</span>
              <span className={styles.featureText}>Información detallada</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📍</span>
              <span className={styles.featureText}>Ubicación y mapas</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💳</span>
              <span className={styles.featureText}>Pagos seguros</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventoSeleccionadoPage;
