"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UniversalHeader from "@/components/Shared/UniversalHeader/UniversalHeader";
import Footer from "@/components/Shared/Footer/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { API_ENDPOINTS } from "@/config/api";
import { useEventDetails } from "@/hooks/useEventDetails";
import styles from "./page.module.css";

const toNumber = (...values: unknown[]): number => {
  for (const value of values) {
    if (value === null || value === undefined || value === '') continue;

    const numberValue = typeof value === 'number' ? value : Number(value);
    if (Number.isFinite(numberValue)) return numberValue;
  }

  return 0;
};

const getFoodPrice = (food: any) => toNumber(food?.precioUnitario, food?.price, food?.precio);
const getActivityPrice = (activity: any) => toNumber(activity?.precioUnitario, activity?.price, activity?.precio);
const getFoodStock = (food: any) => Math.max(0, toNumber(food?.stockActual));
const getActivityAvailableSpots = (activity: any) =>
  Math.max(0, toNumber(activity?.cuposDisponibles) - toNumber(activity?.cuposOcupados));
const isFoodPurchasable = (food: any) => food?.activo === true && getFoodStock(food) > 0;
const isActivityPurchasable = (activity: any) =>
  activity?.activa === true && getActivityAvailableSpots(activity) > 0;

function AgregarProductosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoggedIn, isLoading: authLoading, isHydrated } = useAuth();
  
  const saleNumber = searchParams.get('saleNumber');
  const eventoId = searchParams.get('eventoId');
  
  const { event, loading: eventLoading, error: eventError } = useEventDetails(eventoId);
  
  const [foodCart, setFoodCart] = useState<{[key: string]: number}>({});
  const [activityCart, setActivityCart] = useState<{[key: string]: number}>({});
  const [currentSection, setCurrentSection] = useState<'food' | 'activities'>('food');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (isHydrated && !authLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isHydrated, authLoading, isLoggedIn, router]);

  useEffect(() => {
    if (!event) return;

    if (event.alimentosBebestibles) {
      setFoodCart(prev => {
        const nextCart = { ...prev };
        let changed = false;

        Object.keys(nextCart).forEach(foodId => {
          const food = event.alimentosBebestibles.find((item: any) =>
            String(item.id || item._id) === foodId
          );
          const stock = getFoodStock(food);

          if (!food || !isFoodPurchasable(food)) {
            delete nextCart[foodId];
            changed = true;
            return;
          }

          if (nextCart[foodId] > stock) {
            nextCart[foodId] = stock;
            changed = true;
          }
        });

        return changed ? nextCart : prev;
      });
    }

    if (event.actividades) {
      setActivityCart(prev => {
        const nextCart = { ...prev };
        let changed = false;

        Object.keys(nextCart).forEach(activityId => {
          const activity = event.actividades.find((item: any) =>
            String(item.id || item._id) === activityId
          );
          const availableSpots = getActivityAvailableSpots(activity);

          if (!activity || !isActivityPurchasable(activity)) {
            delete nextCart[activityId];
            changed = true;
            return;
          }

          if (nextCart[activityId] > availableSpots) {
            nextCart[activityId] = availableSpots;
            changed = true;
          }
        });

        return changed ? nextCart : prev;
      });
    }
  }, [event]);

  // Food cart functions
  const updateFoodQuantity = (foodId: number | string, change: number) => {
    const id = String(foodId);
    setFoodCart(prev => {
      const currentQuantity = prev[id] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      
      return { ...prev, [id]: newQuantity };
    });
  };

  const getFoodQuantity = (foodId: number | string) => foodCart[String(foodId)] || 0;

  // Activity cart functions
  const updateActivityQuantity = (activityId: number | string, change: number) => {
    const id = String(activityId);
    setActivityCart(prev => {
      const currentQuantity = prev[id] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      
      return { ...prev, [id]: newQuantity };
    });
  };

  const getActivityQuantity = (activityId: number | string) => activityCart[String(activityId)] || 0;

  // Calculate totals
  const getFoodTotal = () => {
    if (!event?.alimentosBebestibles) return 0;
    return Object.entries(foodCart).reduce((total, [foodId, quantity]) => {
      const food = event.alimentosBebestibles.find((f: any) => 
        String(f.id || f._id) === String(foodId)
      );
      return total + (food && isFoodPurchasable(food) ? getFoodPrice(food) * quantity : 0);
    }, 0);
  };

  const getActivityTotal = () => {
    if (!event?.actividades) return 0;
    return Object.entries(activityCart).reduce((total, [activityId, quantity]) => {
      const activity = event.actividades.find((a: any) => 
        String(a.id || a._id) === String(activityId)
      );
      return total + (activity && isActivityPurchasable(activity) ? getActivityPrice(activity) * quantity : 0);
    }, 0);
  };

  const getGrandTotal = () => getFoodTotal() + getActivityTotal();

  const hasItemsInCart = Object.keys(foodCart).length > 0 || Object.keys(activityCart).length > 0;

  const formatCurrency = (amount: unknown) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(toNumber(amount));
  };

  const availableFoodItems = event?.alimentosBebestibles?.filter(isFoodPurchasable) || [];
  const availableActivities = event?.actividades?.filter(isActivityPurchasable) || [];

  // Submit products
  const handleSubmit = async () => {
    if (!hasItemsInCart || !saleNumber || !event) return;
    
    setIsProcessing(true);
    setMessage(null);
    
    try {
      const foodItems = Object.entries(foodCart).flatMap(([id, cantidad]) => {
        const food = event.alimentosBebestibles?.find((item: any) =>
          String(item.id || item._id) === id
        );

        if (!food || !isFoodPurchasable(food)) return [];

        const availableQuantity = Math.min(cantidad, getFoodStock(food));
        return availableQuantity > 0 ? [{ id: parseInt(id), cantidad: availableQuantity }] : [];
      });
      
      const activityItems = Object.entries(activityCart).flatMap(([id, cantidad]) => {
        const activity = event.actividades?.find((item: any) =>
          String(item.id || item._id) === id
        );

        if (!activity || !isActivityPurchasable(activity)) return [];

        const availableQuantity = Math.min(cantidad, getActivityAvailableSpots(activity));
        return availableQuantity > 0 ? [{ id: parseInt(id), cantidad: availableQuantity }] : [];
      });

      if (foodItems.length === 0 && activityItems.length === 0) {
        setMessage({ type: 'error', text: 'No hay productos disponibles para agregar.' });
        return;
      }

      const url = API_ENDPOINTS.ADD_PRODUCTS_TO_SALE(saleNumber);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(url.includes('ngrok') && {
            'ngrok-skip-browser-warning': 'true',
          }),
        },
        body: JSON.stringify({
          food: { items: foodItems },
          activities: { items: activityItems }
        })
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // Get the updated sale data from the response
        const updatedSale = result.data.sale;
        
        // Format tickets for venta-exitosa
        const formattedTickets = updatedSale.tickets?.items?.map((item: any) => ({
          id: item.id,
          tipo: item.tipoEntrada,
          cantidad: item.cantidad,
          precio: item.precio || 0,
          subtotal: item.subtotal || 0
        })) || [];

        // Format food items for venta-exitosa
        const formattedFood = updatedSale.food?.items?.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio || 0,
          subtotal: item.subtotal || 0
        })) || [];

        // Format activities for venta-exitosa
        const formattedActivities = updatedSale.activities?.items?.map((item: any) => ({
          id: item.id,
          nombreActividad: item.nombreActividad,
          cantidad: item.cantidad,
          precio: item.precio || 0,
          subtotal: item.subtotal || 0
        })) || [];

        // Prepare purchase data for venta-exitosa page
        const purchaseData = {
          saleId: saleNumber,
          eventoId: eventoId,
          eventoNombre: event.informacionGeneral?.nombreEvento || 'Evento',
          eventoFecha: event.informacionGeneral?.fecha || '',
          total: updatedSale.totals?.total || 0,
          tickets: formattedTickets,
          food: formattedFood,
          activities: formattedActivities,
          attendees: updatedSale.attendees || [],
          subtotals: {
            tickets: updatedSale.totals?.subtotalTickets || 0,
            food: updatedSale.totals?.subtotalFood || 0,
            activities: updatedSale.totals?.subtotalActivities || 0
          },
          timestamp: new Date().toISOString(),
          isUpdate: true // Flag to indicate this is an update, not a new purchase
        };

        // Save to localStorage
        localStorage.setItem('purchaseData', JSON.stringify(purchaseData));
        
        // Redirect to venta-exitosa page
        router.push('/venta-exitosa');
      } else {
        setMessage({ type: 'error', text: result.message || 'Error al agregar productos' });
      }
    } catch (error) {
      console.error('Error adding products:', error);
      setMessage({ type: 'error', text: 'Error de conexión. Intenta nuevamente.' });
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading states
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

  if (!saleNumber || !eventoId) {
    return (
      <div className={styles.pageContainer}>
        <UniversalHeader />
        <main className={styles.mainContent}>
          <div className={styles.errorContainer}>
            <p>Parámetros inválidos. Vuelve a tu perfil e intenta nuevamente.</p>
            <button onClick={() => router.push('/perfil')} className={styles.backButton}>
              Volver al Perfil
            </button>
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
          {/* Header */}
          <div className={styles.pageHeader}>
            <button onClick={() => router.push('/perfil')} className={styles.backLink}>
              ← Volver al perfil
            </button>
            <h1 className={styles.pageTitle}>Agregar productos al pedido {saleNumber}</h1>
            {event && (
              <p className={styles.eventName}>{event.informacionGeneral?.nombreEvento}</p>
            )}
          </div>

          {eventLoading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Cargando productos del evento...</p>
            </div>
          ) : eventError ? (
            <div className={styles.errorContainer}>
              <p>{eventError}</p>
            </div>
          ) : event && (
            <div className={styles.contentGrid}>
              {/* Left - Products */}
              <div className={styles.productsSection}>
                {/* Section Tabs */}
                <div className={styles.sectionTabs}>
                  <button 
                    className={`${styles.tabButton} ${currentSection === 'food' ? styles.tabActive : ''}`}
                    onClick={() => setCurrentSection('food')}
                  >
                    Comida y Bebidas
                  </button>
                  <button 
                    className={`${styles.tabButton} ${currentSection === 'activities' ? styles.tabActive : ''}`}
                    onClick={() => setCurrentSection('activities')}
                  >
                    Actividades
                  </button>
                </div>

                {/* Food Section */}
                {currentSection === 'food' && (
                  <div className={styles.productsGrid}>
                    {availableFoodItems.length === 0 ? (
                      <p className={styles.noProducts}>No hay productos de comida disponibles</p>
                    ) : (
                      availableFoodItems.map((food: any) => (
                        <div key={food.id || food._id} className={styles.productCard}>
                          {food.imagen && (
                            <img src={food.imagen} alt={food.nombre} className={styles.productImage} />
                          )}
                          <div className={styles.productInfo}>
                            <h3 className={styles.productName}>{food.nombre}</h3>
                            <p className={styles.productPrice}>
                              {formatCurrency(getFoodPrice(food))}
                            </p>
                            <p className={styles.productStock}>
                              Stock: {getFoodStock(food)}
                            </p>
                          </div>
                          <div className={styles.quantityControl}>
                            <button 
                              onClick={() => updateFoodQuantity(food.id || food._id, -1)}
                              disabled={getFoodQuantity(food.id || food._id) === 0}
                              className={styles.qtyButton}
                            >
                              −
                            </button>
                            <span className={styles.qtyValue}>
                              {getFoodQuantity(food.id || food._id)}
                            </span>
                            <button 
                              onClick={() => {
                                if (getFoodQuantity(food.id || food._id) < getFoodStock(food)) {
                                  updateFoodQuantity(food.id || food._id, 1);
                                }
                              }}
                              disabled={getFoodQuantity(food.id || food._id) >= getFoodStock(food)}
                              className={styles.qtyButton}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Activities Section */}
                {currentSection === 'activities' && (
                  <div className={styles.productsGrid}>
                    {availableActivities.length === 0 ? (
                      <p className={styles.noProducts}>No hay actividades disponibles</p>
                    ) : (
                      availableActivities.map((activity: any) => {
                        const cuposDisponibles = getActivityAvailableSpots(activity);
                        return (
                          <div key={activity.id || activity._id} className={styles.productCard}>
                            {activity.imagen && (
                              <img src={activity.imagen} alt={activity.nombreActividad} className={styles.productImage} />
                            )}
                            <div className={styles.productInfo}>
                              <h3 className={styles.productName}>{activity.nombreActividad}</h3>
                              <p className={styles.productPrice}>
                                {formatCurrency(getActivityPrice(activity))}
                              </p>
                              <p className={styles.productStock}>
                                Cupos: {cuposDisponibles}
                              </p>
                            </div>
                            <div className={styles.quantityControl}>
                              <button 
                                onClick={() => updateActivityQuantity(activity.id || activity._id, -1)}
                                disabled={getActivityQuantity(activity.id || activity._id) === 0}
                                className={styles.qtyButton}
                              >
                                −
                              </button>
                              <span className={styles.qtyValue}>
                                {getActivityQuantity(activity.id || activity._id)}
                              </span>
                              <button 
                                onClick={() => updateActivityQuantity(activity.id || activity._id, 1)}
                                disabled={getActivityQuantity(activity.id || activity._id) >= cuposDisponibles}
                                className={styles.qtyButton}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>

              {/* Right - Cart Summary */}
              <div className={styles.cartSection}>
                <h2 className={styles.cartTitle}>Resumen</h2>
                
                {!hasItemsInCart ? (
                  <p className={styles.emptyCart}>No has seleccionado productos</p>
                ) : (
                  <>
                    {Object.entries(foodCart).length > 0 && (
                      <div className={styles.cartGroup}>
                        <h3 className={styles.cartGroupTitle}>Comida y Bebidas</h3>
                        {Object.entries(foodCart).map(([id, qty]) => {
                          const food = event.alimentosBebestibles?.find((f: any) => 
                            String(f.id || f._id) === id
                          );
                          if (!food || !isFoodPurchasable(food)) return null;
                          return (
                            <div key={id} className={styles.cartItem}>
                              <span>{food.nombre} x{qty}</span>
                              <span>{formatCurrency(getFoodPrice(food) * qty)}</span>
                            </div>
                          );
                        })}
                        <div className={styles.cartSubtotal}>
                          <span>Subtotal Comida</span>
                          <span>{formatCurrency(getFoodTotal())}</span>
                        </div>
                      </div>
                    )}

                    {Object.entries(activityCart).length > 0 && (
                      <div className={styles.cartGroup}>
                        <h3 className={styles.cartGroupTitle}>Actividades</h3>
                        {Object.entries(activityCart).map(([id, qty]) => {
                          const activity = event.actividades?.find((a: any) => 
                            String(a.id || a._id) === id
                          );
                          if (!activity || !isActivityPurchasable(activity)) return null;
                          return (
                            <div key={id} className={styles.cartItem}>
                              <span>{activity.nombreActividad} x{qty}</span>
                              <span>{formatCurrency(getActivityPrice(activity) * qty)}</span>
                            </div>
                          );
                        })}
                        <div className={styles.cartSubtotal}>
                          <span>Subtotal Actividades</span>
                          <span>{formatCurrency(getActivityTotal())}</span>
                        </div>
                      </div>
                    )}

                    <div className={styles.cartTotal}>
                      <span>Total a agregar</span>
                      <span>{formatCurrency(getGrandTotal())}</span>
                    </div>
                  </>
                )}

                {message && (
                  <div className={`${styles.message} ${message.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
                    {message.text}
                  </div>
                )}

                <button 
                  onClick={handleSubmit}
                  disabled={!hasItemsInCart || isProcessing}
                  className={styles.submitButton}
                >
                  {isProcessing ? 'Procesando...' : 'Agregar productos'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default function AgregarProductosPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Cargando...
      </div>
    }>
      <AgregarProductosContent />
    </Suspense>
  );
}
