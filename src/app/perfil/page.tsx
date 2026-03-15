"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import Footer from "@/components/Shared/Footer/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { API_ENDPOINTS } from "@/config/api";
import QRCode from 'qrcode';
import styles from "./page.module.css";

interface Sale {
  _id: string;
  saleNumber: string;
  status: string;
  createdAt: string;
  totals: {
    subtotalTickets: number;
    subtotalFood: number;
    subtotalActivities: number;
    total: number;
  };
  event: {
    id: string;
    nombre: string;
    fecha: string;
  };
  tickets: {
    items: Array<{
      tipoEntrada: string;
      cantidad: number;
    }>;
  };
  food: {
    items: Array<{
      nombre: string;
      cantidad: number;
      precio: number;
      subtotal: number;
    }>;
    subtotal: number;
  };
  activities: {
    items: Array<{
      nombreActividad: string;
      cantidad: number;
      precio: number;
      subtotal: number;
    }>;
    subtotal: number;
  };
  attendees: Array<{
    datosPersonales: {
      nombreCompleto: string;
    };
  }>;
}

interface SalesResponse {
  status: string;
  data: {
    sales: Sale[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export default function PerfilPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading: authLoading, isHydrated } = useAuth();
  
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    pages: 0,
    hasNext: false,
    hasPrev: false
  });

  // Redirect if not logged in
  useEffect(() => {
    if (isHydrated && !authLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isHydrated, authLoading, isLoggedIn, router]);

  // Fetch user sales
  useEffect(() => {
    const fetchSales = async () => {
      if (!user?.email) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const url = API_ENDPOINTS.SALES_BY_USER(user.email);
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...(url.includes('ngrok') && {
              'ngrok-skip-browser-warning': 'true',
            }),
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los pedidos');
        }

        const result: SalesResponse = await response.json();
        
        if (result.status === 'success') {
          setSales(result.data.sales);
          setPagination({
            page: result.data.pagination.page,
            total: result.data.pagination.total,
            pages: result.data.pagination.pages,
            hasNext: result.data.pagination.hasNext,
            hasPrev: result.data.pagination.hasPrev
          });
        }
      } catch (err) {
        console.error('Error fetching sales:', err);
        setError('No se pudieron cargar los pedidos. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isHydrated && isLoggedIn && user) {
      fetchSales();
    }
  }, [user, isHydrated, isLoggedIn]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      'pending': { label: 'Pendiente', className: styles.statusCancelled },
      'completed': { label: 'Completado', className: styles.statusCompleted },
      'cancelled': { label: 'Cancelado', className: styles.statusCancelled },
      'refunded': { label: 'Reembolsado', className: styles.statusRefunded },
    };
    return statusMap[status] || { label: status, className: '' };
  };

  const toggleOrder = (saleNumber: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(saleNumber)) {
        newSet.delete(saleNumber);
      } else {
        newSet.add(saleNumber);
      }
      return newSet;
    });
  };

  const isOrderExpanded = (saleNumber: string) => expandedOrders.has(saleNumber);

  // Download QR code for a sale
  const downloadQR = async (saleNumber: string, eventoNombre: string) => {
    try {
      const qrInfo = { saleNumber };
      const qrDataURL = await QRCode.toDataURL(JSON.stringify(qrInfo), {
        width: 400,
        margin: 2,
        color: {
          dark: '#1B2735',
          light: '#FFFFFF'
        }
      });

      // Create download link
      const link = document.createElement('a');
      link.href = qrDataURL;
      link.download = `QR-${saleNumber}-${eventoNombre.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating QR:', error);
      alert('Error al generar el código QR');
    }
  };

  // Show loading while auth is initializing
  if (!isHydrated || authLoading) {
    return (
      <div className={styles.pageContainer}>
        <UniversalHeader />
        <main className={styles.mainContent}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Cargando...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect handled by useEffect, but show loading in the meantime
  if (!isLoggedIn) {
    return (
      <div className={styles.pageContainer}>
        <UniversalHeader />
        <main className={styles.mainContent}>
          <div className={styles.loadingContainer}>
            <p>Redirigiendo al login...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />
      
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Profile Header */}
          <section className={styles.profileSection}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  {user?.nombreCompleto?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <div className={styles.profileInfo}>
                <h1 className={styles.userName}>{user?.nombreCompleto}</h1>
                <p className={styles.userEmail}>{user?.email}</p>
              </div>
            </div>
            
            <div className={styles.profileDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>RUT</span>
                <span className={styles.detailValue}>{user?.rut || '-'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Teléfono</span>
                <span className={styles.detailValue}>{user?.telefono || '-'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Pedidos realizados</span>
                <span className={styles.detailValue}>{pagination.total}</span>
              </div>
            </div>
          </section>

          {/* Orders Section */}
          <section className={styles.ordersSection}>
            <h2 className={styles.sectionTitle}>Mis Pedidos</h2>
            
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Cargando pedidos...</p>
              </div>
            ) : error ? (
              <div className={styles.errorContainer}>
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className={styles.retryButton}
                >
                  Reintentar
                </button>
              </div>
            ) : sales.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🎫</div>
                <h3>No tienes pedidos aún</h3>
                <p>¡Explora nuestros eventos y compra tus entradas!</p>
                <button 
                  onClick={() => router.push('/eventos')}
                  className={styles.exploreButton}
                >
                  Ver Eventos
                </button>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {sales.map((sale) => {
                  const statusInfo = getStatusLabel(sale.status);
                  return (
                    <div key={sale._id} className={styles.orderCard}>
                      <div className={styles.orderHeader}>
                        <div className={styles.orderNumber}>
                          <span className={styles.orderLabel}>Pedido</span>
                          <span className={styles.orderValue}>{sale.saleNumber}</span>
                        </div>
                        <span className={`${styles.orderStatus} ${statusInfo.className}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                      
                      <div className={styles.orderBody}>
                        <div className={styles.orderSummary}>
                          <div className={styles.eventInfo}>
                            <h3 className={styles.eventName}>{sale.event?.nombre || 'Evento'}</h3>
                            <p className={styles.eventDate}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 1V3M11 1V3M2 6H14M3 2.5H13C13.5523 2.5 14 2.94772 14 3.5V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3.5C2 2.94772 2.44772 2.5 3 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              {sale.event?.fecha ? formatDate(sale.event.fecha) : '-'}
                            </p>
                          </div>
                          
                          <button 
                            className={styles.toggleBtn}
                            onClick={() => toggleOrder(sale.saleNumber)}
                            aria-expanded={isOrderExpanded(sale.saleNumber)}
                          >
                            <span>Ver detalle</span>
                            <svg 
                              width="12" 
                              height="12" 
                              viewBox="0 0 12 12" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              className={`${styles.toggleArrow} ${isOrderExpanded(sale.saleNumber) ? styles.toggleArrowOpen : ''}`}
                            >
                              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                        
                        {/* Collapsible Products Section */}
                        {isOrderExpanded(sale.saleNumber) && (
                          <div className={styles.productsSection}>
                            {/* Tickets Column */}
                            <div className={styles.productGroup}>
                              <span className={styles.productGroupTitle}>Entradas</span>
                              <ul className={styles.productList}>
                                {sale.tickets?.items?.map((item, idx) => (
                                  <li key={idx} className={styles.productItem}>
                                    <span>{item.tipoEntrada}</span>
                                    <span>x{item.cantidad}</span>
                                    <span>{formatCurrency((item as any).subtotal || (item as any).precio * item.cantidad || 0)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Food Column */}
                            {sale.food?.items && sale.food.items.length > 0 && (
                              <div className={styles.productGroup}>
                                <span className={styles.productGroupTitle}>Comida y Bebidas</span>
                                <ul className={styles.productList}>
                                  {sale.food.items.map((item, idx) => (
                                    <li key={idx} className={styles.productItem}>
                                      <span>{item.nombre}</span>
                                      <span>x{item.cantidad}</span>
                                      <span>{formatCurrency(item.subtotal)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Activities Column */}
                            {sale.activities?.items && sale.activities.items.length > 0 && (
                              <div className={styles.productGroup}>
                                <span className={styles.productGroupTitle}>Actividades</span>
                                <ul className={styles.productList}>
                                  {sale.activities.items.map((item, idx) => (
                                    <li key={idx} className={styles.productItem}>
                                      <span>{item.nombreActividad}</span>
                                      <span>x{item.cantidad}</span>
                                      <span>{formatCurrency(item.subtotal)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.orderFooter}>
                        <div className={styles.orderDate}>
                          Comprado el {formatDate(sale.createdAt)}
                        </div>
                        <div className={styles.orderTotal}>
                          {formatCurrency(sale.totals?.total || 0)}
                        </div>
                      </div>
                      
                      {/* Add Products Button */}
                      {sale.status === 'completed' && (
                        <div className={styles.orderActions}>
                          <button 
                            onClick={() => downloadQR(sale.saleNumber, sale.event?.nombre || 'Evento')}
                            className={styles.downloadQRButton}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 11V12.5C2 13.0523 2.44772 13.5 3 13.5H13C13.5523 13.5 14 13.0523 14 12.5V11M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Descargar QR
                          </button>
                          <button 
                            onClick={() => router.push(`/agregar-productos?saleNumber=${sale.saleNumber}&eventoId=${sale.event?.id}`)}
                            className={styles.addProductsButton}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Agregar productos
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
