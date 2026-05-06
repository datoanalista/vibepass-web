"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEventDetails } from '@/hooks/useEventDetails';
import { getImagePath } from '@/utils/getImagePath';
import { foodItemsData, FoodItem } from '@/data/FoodCart/foodItemsData';
import { API_ENDPOINTS } from '@/config/api';
import { useAuth } from '@/contexts/AuthContext';
import styles from './VentaEntradaPage.module.css';

interface Entrada {
  id?: string;
  _id?: string;
  tipoEntrada: string;
  precio: number;
  cuposDisponibles: number;
  entradasVendidas: number;
  activa: boolean;
  limitePorPersona?: number;
  fechasVenta?: {
    inicio: string;
    fin: string;
  };
}

const toNumber = (...values: unknown[]): number => {
  for (const value of values) {
    if (value === null || value === undefined || value === '') continue;

    const numberValue = typeof value === 'number' ? value : Number(value);
    if (Number.isFinite(numberValue)) return numberValue;
  }

  return 0;
};

const formatPrice = (value: unknown) => toNumber(value).toLocaleString('es-CL');
const getEntradaPrice = (entrada: Partial<Entrada>) => toNumber(entrada.precio);
const getFoodPrice = (food: any) => toNumber(food?.precioUnitario, food?.price, food?.precio);
const getActivityPrice = (activity: any) => toNumber(activity?.precioUnitario, activity?.price, activity?.precio);
const getFoodStock = (food: any) => Math.max(0, toNumber(food?.stockActual));
const getActivityAvailableSpots = (activity: any) =>
  Math.max(0, toNumber(activity?.cuposDisponibles) - toNumber(activity?.cuposOcupados));
const isFoodPurchasable = (food: any) => food?.activo === true && getFoodStock(food) > 0;
const isActivityPurchasable = (activity: any) =>
  activity?.activa === true && getActivityAvailableSpots(activity) > 0;

const VentaEntradaPage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventoId = searchParams.get('eventoId');
  const tipoEntrada = searchParams.get('tipoEntrada');
  const { event, loading, error } = useEventDetails(eventoId);
  const { user } = useAuth();
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [currentSection, setCurrentSection] = useState<'tickets' | 'food' | 'activities' | 'attendees'>('tickets');
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [foodCart, setFoodCart] = useState<{[key: string]: number}>({});
  const [activityCart, setActivityCart] = useState<{[key: string]: number}>({});
  const [openAttendeeIndex, setOpenAttendeeIndex] = useState<number>(0);
  const [attendeesData, setAttendeesData] = useState<{[key: number]: {
    nombreCompleto: string;
    rut: string;
    telefono: string;
    correo: string;
    confirmacionCorreo: string;
  }}>({});
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false);
  const hasPrefilledRef = useRef(false);
  const [skipOtherAttendees, setSkipOtherAttendees] = useState(false);
  
  // Crear una clave estable para el cart para usar en dependencias
  const cartKey = useMemo(() => JSON.stringify(cart), [cart]);
  const userId = user?.id || null;
  
  // Estado para modal de errores
  const [modalInfo, setModalInfo] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'error' | 'warning' | 'info';
    icon: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'error',
    icon: '❌'
  });

  // Función para mostrar modal
  const showModal = (title: string, message: string, type: 'error' | 'warning' | 'info' = 'error') => {
    const icons = {
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    setModalInfo({
      isOpen: true,
      title,
      message,
      type,
      icon: icons[type]
    });
  };

  const closeModal = () => {
    setModalInfo(prev => ({ ...prev, isOpen: false }));
  };

  // Funciones del carrito
  const updateQuantity = (entradaId: string, change: number) => {
    setCart(prev => {
      const currentQuantity = prev[entradaId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        const newCart = { ...prev };
        delete newCart[entradaId];
        return newCart;
      }
      
      return { ...prev, [entradaId]: newQuantity };
    });
  };

  const getQuantity = (entradaId: string) => cart[entradaId] || 0;

  const getTotalPrice = () => {
    if (!event?.entradas) return 0;
    
    return Object.entries(cart).reduce((total, [entradaId, quantity]) => {
      const entrada = event.entradas.find((e: Entrada) => 
        String(e.id || e._id) === String(entradaId)
      );
      console.log('Finding entrada for ID:', entradaId, 'Found:', entrada);
      return total + (entrada ? getEntradaPrice(entrada) * quantity : 0);
    }, 0);
  };

  const getCartItems = () => {
    if (!event?.entradas) return [];
    
    return Object.entries(cart)
      .map(([entradaId, quantity]) => {
        const entrada = event.entradas.find((e: Entrada) => 
          String(e.id || e._id) === String(entradaId)
        );
        return entrada ? { entrada, quantity } : null;
      })
      .filter(item => item !== null);
  };

  const hasItemsInCart = Object.keys(cart).length > 0;

  // Funciones para el carrito de comida
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

  const getFoodTotalPrice = () => {
    if (!event?.alimentosBebestibles) return 0;
    
    return Object.entries(foodCart).reduce((total, [foodId, quantity]) => {
      const food = event.alimentosBebestibles.find((f: any) => 
        String(f.id || f._id) === String(foodId)
      );
      return total + (food && isFoodPurchasable(food) ? getFoodPrice(food) * quantity : 0);
    }, 0);
  };

  const getFoodCartItems = () => {
    if (!event?.alimentosBebestibles) return [];
    
    return Object.entries(foodCart)
      .map(([foodId, quantity]) => {
        const food = event.alimentosBebestibles.find((f: any) => 
          String(f.id || f._id) === String(foodId)
        );
        return food && isFoodPurchasable(food) ? { food, quantity } : null;
      })
      .filter(item => item !== null);
  };

  const hasItemsInFoodCart = getFoodCartItems().length > 0;
  const activeFoodItems = event?.alimentosBebestibles?.filter(isFoodPurchasable) || [];
  const hasActiveFoodItems = activeFoodItems.length > 0;

  // Funciones para el carrito de actividades
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

  const getActivityTotalPrice = () => {
    if (!event?.actividades) return 0;
    
    return Object.entries(activityCart).reduce((total, [activityId, quantity]) => {
      const activity = event.actividades.find((a: any) => 
        String(a.id || a._id) === String(activityId)
      );
      return total + (activity && isActivityPurchasable(activity) ? getActivityPrice(activity) * quantity : 0);
    }, 0);
  };

  const getActivityCartItems = () => {
    if (!event?.actividades) return [];
    
    return Object.entries(activityCart)
      .map(([activityId, quantity]) => {
        const activity = event.actividades.find((a: any) => 
          String(a.id || a._id) === String(activityId)
        );
        return activity && isActivityPurchasable(activity) ? { activity, quantity } : null;
      })
      .filter(item => item !== null);
  };

  const hasItemsInActivityCart = getActivityCartItems().length > 0;
  const activeActivities = event?.actividades?.filter(isActivityPurchasable) || [];
  const hasActiveActivities = activeActivities.length > 0;

  const getPreviousSection = (section: 'food' | 'activities' | 'attendees') => {
    if (section === 'food') return 'tickets';
    if (section === 'activities') return hasActiveFoodItems ? 'food' : 'tickets';
    return hasActiveActivities ? 'activities' : (hasActiveFoodItems ? 'food' : 'tickets');
  };

  const getNextSection = (section: 'tickets' | 'food' | 'activities') => {
    if (section === 'tickets') {
      if (hasActiveFoodItems) return 'food';
      if (hasActiveActivities) return 'activities';
      return 'attendees';
    }

    if (section === 'food') {
      return hasActiveActivities ? 'activities' : 'attendees';
    }

    return 'attendees';
  };

  useEffect(() => {
    if (currentSection === 'food' && !hasActiveFoodItems) {
      setCurrentSection(getNextSection('tickets'));
      return;
    }

    if (currentSection === 'activities' && !hasActiveActivities) {
      setCurrentSection(getNextSection(hasActiveFoodItems ? 'food' : 'tickets'));
    }
  }, [currentSection, hasActiveActivities, hasActiveFoodItems]);

  useEffect(() => {
    if (!event?.alimentosBebestibles) return;

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
  }, [event?.alimentosBebestibles]);

  useEffect(() => {
    setCurrentFoodIndex(prev => Math.min(prev, Math.max(0, activeFoodItems.length - 2)));
  }, [activeFoodItems.length]);

  useEffect(() => {
    if (!event?.actividades) return;

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
  }, [event?.actividades]);

  useEffect(() => {
    setCurrentActivityIndex(prev => Math.min(prev, Math.max(0, activeActivities.length - 2)));
  }, [activeActivities.length]);

  // Funciones para asistentes
  const getTotalAttendees = () => {
    return getCartItems().reduce((total, item: any) => total + item.quantity, 0);
  };

  const getAttendeesList = () => {
    const attendees: Array<{type: string, index: number}> = [];
    let currentIndex = 0;
    
    getCartItems().forEach((item: any) => {
      for (let i = 0; i < item.quantity; i++) {
        attendees.push({
          type: item.entrada.tipoEntrada.charAt(0).toUpperCase() + item.entrada.tipoEntrada.slice(1),
          index: currentIndex
        });
        currentIndex++;
      }
    });
    
    return attendees;
  };

  const updateAttendeeData = (index: number, field: string, value: string) => {
    setAttendeesData(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value
      }
    }));
  };

  const isAttendeeFormComplete = (index: number) => {
    const data = attendeesData[index];
    if (!data) return false;
    
    return data.nombreCompleto && 
           data.rut && 
           data.telefono && 
           data.correo && 
           data.confirmacionCorreo &&
           data.correo === data.confirmacionCorreo;
  };

  const areAllFormsComplete = () => {
    const totalAttendees = getTotalAttendees();
    if (totalAttendees === 0) return false;
    
    // Si el checkbox está marcado, solo validar el primer formulario
    if (skipOtherAttendees) {
      return isAttendeeFormComplete(0);
    }
    
    // Si no está marcado, validar todos los formularios
    for (let i = 0; i < totalAttendees; i++) {
      if (!isAttendeeFormComplete(i)) return false;
    }
    return true;
  };

  // Pre-llenar el primer formulario con los datos del usuario
  useEffect(() => {
    if (!event?.entradas || !user) return;
    
    // Calcular el total de asistentes directamente desde el cart
    const totalAttendees = Object.entries(cart).reduce((total, [entradaId, quantity]) => {
      return total + quantity;
    }, 0);
    
    // Si se eliminan todos los tickets, limpiar los datos de asistentes y resetear el ref
    if (totalAttendees === 0) {
      setAttendeesData({});
      hasPrefilledRef.current = false;
      return;
    }
    
    // Solo pre-llenar si hay al menos un asistente, hay un usuario logueado
    // y aún no se ha pre-llenado en esta sesión de tickets
    if (totalAttendees > 0 && !hasPrefilledRef.current) {
      // Verificar si el primer formulario está vacío antes de pre-llenar
      setAttendeesData(prev => {
        const firstAttendeeData = prev[0];
        const isFirstFormEmpty = !firstAttendeeData || 
          (!firstAttendeeData.nombreCompleto && 
           !firstAttendeeData.rut && 
           !firstAttendeeData.telefono && 
           !firstAttendeeData.correo);
        
        if (isFirstFormEmpty) {
          hasPrefilledRef.current = true;
          return {
            ...prev,
            0: {
              nombreCompleto: user.nombreCompleto || '',
              rut: user.rut || '',
              telefono: user.telefono || '',
              correo: user.email || '',
              confirmacionCorreo: user.email || ''
            }
          };
        }
        return prev;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartKey, userId, eventoId]);

  // Función para procesar la compra
  const processPurchase = async () => {
    setIsProcessingPurchase(true);
    try {
      // Crear el JSON completo de la compra
      const purchaseData = {
        eventoId: eventoId,
        timestamp: new Date().toISOString(),
        tickets: {
          items: getCartItems().map((item: any) => ({
            id: item.entrada.id || item.entrada._id,
            tipoEntrada: item.entrada.tipoEntrada,
            precio: getEntradaPrice(item.entrada),
            cantidad: item.quantity,
            subtotal: getEntradaPrice(item.entrada) * item.quantity
          })),
          subtotal: getTotalPrice()
        },
        food: {
          items: getFoodCartItems().map((item: any) => ({
            id: item.food.id || item.food._id,
            nombre: item.food.nombre || item.food.name,
            precio: getFoodPrice(item.food),
            cantidad: item.quantity,
            subtotal: getFoodPrice(item.food) * item.quantity
          })),
          subtotal: getFoodTotalPrice()
        },
        activities: {
          items: getActivityCartItems().map((item: any) => ({
            id: item.activity.id || item.activity._id,
            nombreActividad: item.activity.nombreActividad || item.activity.name,
            precio: getActivityPrice(item.activity),
            cantidad: item.quantity,
            subtotal: getActivityPrice(item.activity) * item.quantity
          })),
          subtotal: getActivityTotalPrice()
        },
        attendees: getAttendeesList().map((attendee, index) => {
          // Si el checkbox está marcado, usar los datos del primer asistente para todos
          const datosPersonales = skipOtherAttendees 
            ? (attendeesData[0] || {})
            : (attendeesData[index] || {});
          
          return {
            index: index,
            tipoEntrada: attendee.type,
            datosPersonales: datosPersonales
          };
        }),
        totals: {
          subtotalTickets: getTotalPrice(),
          subtotalFood: getFoodTotalPrice(),
          subtotalActivities: getActivityTotalPrice(),
          total: getTotalPrice() + getFoodTotalPrice() + getActivityTotalPrice()
        },
           event: {
             id: eventoId,
             nombre: event?.informacionGeneral?.nombreEvento,
             fecha: event?.informacionGeneral?.fechaEvento,
             horaInicio: event?.informacionGeneral?.horaInicio,
             lugarEvento: event?.informacionGeneral?.lugarEvento,
             descripcion: event?.informacionGeneral?.descripcion,
             estado: event?.informacionGeneral?.estado
           }
      };

      // Crear pago en Flow.cl
      const response = await fetch(API_ENDPOINTS.FLOW_CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData)
      });

      if (response.ok) {
        const result = await response.json();
        const checkoutUrl = result.data?.checkoutUrl;
        const token = result.data?.token;

        if (!checkoutUrl || !token) {
          throw new Error('Flow no devolvió una URL de checkout u token válido');
        }

        localStorage.removeItem('purchaseData');
        window.location.href = `${checkoutUrl}?token=${token}`;
      } else {
        const error = await response.json();
        console.error('Error al crear preferencia de pago:', error);
        setIsProcessingPurchase(false);
        
        // Manejar diferentes tipos de errores
        let errorMessage = 'Error al iniciar el pago. Por favor, intenta nuevamente.';
        
        if (error.message && error.message.includes('Not enough spots available')) {
          // Extraer información del error de cupos
          const match = error.message.match(/Not enough spots available for (.+)\. Available: (\d+), Requested: (\d+)/);
          if (match) {
            const [, entryType, available, requested] = match;
            errorMessage = `❌ No hay suficientes cupos disponibles para "${entryType}".\n\n📊 Disponibles: ${available}\n🎫 Solicitados: ${requested}\n\n💡 Por favor, reduce la cantidad de entradas para "${entryType}" a máximo ${available}.`;
          } else {
            errorMessage = `❌ No hay suficientes cupos disponibles para completar tu compra.\n\n💡 Por favor, verifica las cantidades seleccionadas.`;
          }
        } else if (error.message && error.message.includes('stock')) {
          errorMessage = `❌ No hay suficiente stock disponible para algunos productos.\n\n💡 Por favor, verifica las cantidades de alimentos y actividades.`;
        } else if (error.message) {
          errorMessage = `❌ ${error.message}`;
        }
        
        // Determinar el título y tipo según el error
        let title = 'Error de compra';
        let type: 'error' | 'warning' | 'info' = 'error';
        
        if (error.message && error.message.includes('Not enough spots available')) {
          title = 'Cupos insuficientes';
          type = 'warning';
        } else if (error.message && error.message.includes('stock')) {
          title = 'Stock insuficiente';
          type = 'warning';
        }
        
        showModal(title, errorMessage.replace(/❌\s*/, ''), type);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setIsProcessingPurchase(false);
      showModal(
        'Error de conexión',
        'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e intenta nuevamente.',
        'error'
      );
    }
  };

  // Funciones del carrusel
  const nextFoodItem = () => {
    if (activeFoodItems.length <= 2) return; // No navegar si hay 2 o menos items
    
    setCurrentFoodIndex(prev => 
      prev >= activeFoodItems.length - 2 ? 0 : prev + 1
    );
  };

  const prevFoodItem = () => {
    if (activeFoodItems.length <= 2) return; // No navegar si hay 2 o menos items
    
    setCurrentFoodIndex(prev => 
      prev <= 0 ? Math.max(0, activeFoodItems.length - 2) : prev - 1
    );
  };

  const getVisibleFoodItems = () => {
    const visibleItems = activeFoodItems.slice(currentFoodIndex, currentFoodIndex + 2);
    
    // Asegurar que siempre mostramos máximo 2 cards
    return visibleItems.slice(0, 2);
  };

  // Funciones del carrusel de actividades
  const nextActivityItem = () => {
    if (activeActivities.length <= 2) return; // No navegar si hay 2 o menos items
    
    setCurrentActivityIndex(prev => 
      prev >= activeActivities.length - 2 ? 0 : prev + 1
    );
  };

  const prevActivityItem = () => {
    if (activeActivities.length <= 2) return; // No navegar si hay 2 o menos items
    
    setCurrentActivityIndex(prev => 
      prev <= 0 ? Math.max(0, activeActivities.length - 2) : prev - 1
    );
  };

  const getVisibleActivityItems = () => {
    const visibleItems = activeActivities.slice(currentActivityIndex, currentActivityIndex + 2);
    
    // Asegurar que siempre mostramos máximo 2 cards
    return visibleItems.slice(0, 2);
  };

  // Debug
  console.log('Cart state:', cart);
  console.log('Has items:', hasItemsInCart);
  console.log('Total price:', getTotalPrice());
  console.log('Cart items:', getCartItems());
  console.log('Event entradas:', event?.entradas);
  if (event?.entradas && event.entradas.length > 0) {
    console.log('First entrada structure:', event.entradas[0]);
  }

  return (
    <main className={styles.ventaEntradaPage}>
      {/* Loading overlay para procesamiento de compra */}
      {isProcessingPurchase && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner}></div>
            <h2 className={styles.loadingTitle}>Redirigiendo al pago seguro...</h2>
            <p className={styles.loadingText}>Estamos preparando tu pago de forma segura</p>
          </div>
        </div>
      )}

      {/* Línea gradiente pegada al header */}
      <div className={styles.gradientLine}></div>
      
      {/* Navegación breadcrumb con imagen del evento */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink} title="Ir a Home">
            HOME
          </Link>
          <img 
            src={getImagePath("/images/triangulo.png")} 
            alt=">" 
            className={styles.breadcrumbSeparator}
          />
          <Link href="/eventos" className={styles.breadcrumbLink} title="Volver a eventos">
            EVENTOS
          </Link>
          <img 
            src={getImagePath("/images/triangulo.png")} 
            alt=">" 
            className={styles.breadcrumbSeparator}
          />
          <Link 
            href={`/evento-seleccionado?eventoId=${eventoId}`} 
            className={styles.breadcrumbLink} 
            title="Volver al evento"
          >
            {event?.informacionGeneral?.nombreEvento || 'Evento'}
          </Link>
          <img 
            src={getImagePath("/images/triangulo.png")} 
            alt=">" 
            className={styles.breadcrumbSeparator}
          />
          <span className={styles.breadcrumbCurrent} title="Compra de entrada">
            Compra de entrada
          </span>
        </div>
        
        {/* Imagen del evento a la derecha */}
        {event && (
          <div className={styles.eventImagePreview}>
            <img 
              src={event.informacionGeneral?.bannerPromocional || event.imagenPrincipal}
              alt={event.informacionGeneral?.nombreEvento || 'Evento'}
              className={styles.previewImage}
            />
          </div>
        )}
      </div>
      
      {/* Línea separadora debajo del breadcrumb */}
      <div className={styles.separatorLine}></div>

      {/* Vista de venta */}
      {eventoId && loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Cargando evento...</p>
        </div>
      )}
      
      {eventoId && error && (
        <div className={styles.errorContainer}>
          <p><strong>❌ Error:</strong> {error}</p>
        </div>
      )}
      
      {eventoId && event && (
        <div className={styles.ventaContent}>
          {/* Contenido principal de compra */}
          <div className={styles.purchaseContainer}>
            {/* Sección izquierda - Escoge tus entradas o Comida */}
            <div className={styles.ticketSelection}>
              <div className={styles.selectionHeader}>
                <h2 className={styles.selectionTitle}>
                  {currentSection === 'tickets' ? 'Escoge tus entradas' : 
                   currentSection === 'food' ? 'Comida, Snacks y Bebestibles' : 
                   currentSection === 'activities' ? 'Actividades' : 'Asistentes'}
                </h2>
              </div>
              
              {currentSection === 'food' && (
                <>
                  <div className={styles.descriptionItem}>
                    <p className={styles.selectionDescription}>
                      {hasActiveFoodItems
                        ? 'Añade tus productos antes del evento'
                        : 'No hay productos disponibles para este evento.'}
                    </p>
                    <button 
                      className={styles.backBtn}
                      onClick={() => setCurrentSection(getPreviousSection('food'))}
                    >
                      Atrás
                    </button>
                  </div>
                </>
              )}

              {currentSection === 'activities' && (
                <>
                  <div className={styles.descriptionItem}>
                    <p className={styles.selectionDescription}>
                      {hasActiveActivities
                        ? 'Participa de las actividades que tenemos para ti!'
                        : 'No hay actividades disponibles para este evento.'}
                    </p>
                    <button 
                      className={styles.backBtn}
                      onClick={() => setCurrentSection(getPreviousSection('activities'))}
                    >
                      Atrás
                    </button>
                  </div>
                </>
              )}

              {currentSection === 'attendees' && (
                <>
                  <div className={styles.descriptionItem}>
                    <p className={styles.selectionDescription}>
                      Ingresa tus datos para completar la compra de tus entradas
                    </p>
                    <button 
                      className={styles.backBtn}
                      onClick={() => setCurrentSection(getPreviousSection('attendees'))}
                    >
                      Atrás
                    </button>
                  </div>
                  
                  {/* Checkbox para saltar otros asistentes */}
                  <div className={styles.skipAttendeesCheckbox}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={skipOtherAttendees}
                        onChange={(e) => {
                          setSkipOtherAttendees(e.target.checked);
                          // Si se marca, asegurar que el primer formulario esté abierto
                          if (e.target.checked) {
                            setOpenAttendeeIndex(0);
                          }
                        }}
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkboxText}>
                        No quiero completar otros asistentes
                      </span>
                    </label>
                  </div>
                </>
              )}
              
              {currentSection === 'tickets' && (
                <>
                  {/* Fecha como item separado */}
                  <div className={styles.dateItem}>
                    <p className={styles.selectionDate}>
                      Día del evento: {event.informacionGeneral?.fechaEvento ? new Date(event.informacionGeneral.fechaEvento + 'T00:00:00').toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      }) : 'Fecha no disponible'} a las {event.informacionGeneral?.horaInicio || 'Hora no disponible'} hrs.
                    </p>
                  </div>
                  
                  {/* Tabla de entradas */}
                  <div className={styles.ticketTable}>
                    <div className={styles.tableHeader}>
                      <span className={styles.headerEntrada}>ENTRADA</span>
                      <span className={styles.headerPrecio}>PRECIO</span>
                      <span className={styles.headerCantidad}>CANTIDAD</span>
                    </div>
                    
                    {/* Filas de entradas */}
                    {event.entradas && event.entradas
                      .filter((entrada: Entrada) => entrada.activa)
                      .map((entrada: Entrada) => (
                        <div key={entrada.id || entrada._id} className={styles.tableRow}>
                          <span className={styles.entradaNombre}>
                            {entrada.tipoEntrada.charAt(0).toUpperCase() + entrada.tipoEntrada.slice(1)}
                            <span className={styles.entradaEdad}>
                              {entrada.tipoEntrada === 'general' ? '(Hasta 14 años)' :
                               entrada.tipoEntrada === 'vip' ? '' :
                               entrada.tipoEntrada === 'estudiante' ? '' :
                               entrada.tipoEntrada === 'profesor' ? '' :
                               entrada.tipoEntrada === 'tercera_edad' ? '(Adulto mayor)' : ''}
                            </span>
                            <span className={styles.entradaCupos}>
                              Disponibles: {entrada.cuposDisponibles - entrada.entradasVendidas}
                            </span>
                          </span>
                          <span className={styles.entradaPrecio}>
                            ${formatPrice(getEntradaPrice(entrada))}
                          </span>
                          <div className={styles.quantityControls}>
                            <button 
                              className={styles.quantityBtn}
                              onClick={() => {
                                const entradaId = String(entrada.id || entrada._id || '');
                                console.log('Decreasing:', entradaId, entrada);
                                updateQuantity(entradaId, -1);
                              }}
                            >
                              -
                            </button>
                            <span className={styles.quantity}>
                              {getQuantity(String(entrada.id || entrada._id || ''))}
                            </span>
                            <button 
                              className={styles.quantityBtn}
                              onClick={() => {
                                const entradaId = String(entrada.id || entrada._id || '');
                                const currentQuantity = getQuantity(entradaId);
                                const availableSpots = entrada.cuposDisponibles - entrada.entradasVendidas;
                                
                                if (currentQuantity < availableSpots) {
                                  console.log('Increasing:', entradaId, entrada);
                                  updateQuantity(entradaId, 1);
                                } else {
                                  showModal(
                                    'Cupos insuficientes',
                                    `No puedes seleccionar más de ${availableSpots} entradas para "${entrada.tipoEntrada}".\n\nCupos disponibles: ${availableSpots}`,
                                    'warning'
                                  );
                                }
                              }}
                              disabled={getQuantity(String(entrada.id || entrada._id || '')) >= (entrada.cuposDisponibles - entrada.entradasVendidas)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}

              {currentSection === 'food' && (
                <>
                  {/* Línea separadora */}
                  <div className={styles.foodSeparatorLine}></div>
                  {hasActiveFoodItems ? (
                    <div className={styles.foodCarouselContainer}>
                      <img 
                        src={getImagePath("/images/icon_left.svg")} 
                        alt="Anterior"
                        className={`${styles.carouselArrowNew} ${(() => {
                          return currentFoodIndex === 0 || activeFoodItems.length <= 2 ? styles.disabled : '';
                        })()}`}
                        onClick={(() => {
                          return currentFoodIndex > 0 && activeFoodItems.length > 2 ? prevFoodItem : undefined;
                        })()}
                      />
                      
                      <div className={styles.foodCarouselWrapper}>
                        <div className={styles.foodCarouselTrack}>
                          {getVisibleFoodItems().map((food: any) => (
                            <div key={food.id || food._id} className={styles.foodCardNew}>
                              <img 
                                src={food.imagen || food.imageUrl} 
                                alt={food.nombre || food.name}
                                className={styles.foodImageNew}
                              />
                              <div className={styles.foodInfoNew}>
                                <h3 className={styles.foodNameNew}>{food.nombre || food.name}</h3>
                                <p className={styles.foodDescriptionNew}>{food.descripcion || food.description}</p>
                                <p className={styles.foodPriceNew}>${formatPrice(getFoodPrice(food))}</p>
                                <p className={styles.foodAvailability}>
                                  Disponibles: {getFoodStock(food)}
                                </p>
                                
                                <div className={styles.foodQuantityControlsNew}>
                                  <button 
                                    className={styles.quantityBtn}
                                    onClick={() => updateFoodQuantity(food.id || food._id, -1)}
                                  >
                                    -
                                  </button>
                                  <span className={styles.quantity}>
                                    {getFoodQuantity(food.id || food._id)}
                                  </span>
                                  <button 
                                    className={styles.quantityBtn}
                                    onClick={() => {
                                      const currentQuantity = getFoodQuantity(food.id || food._id);
                                      const availableStock = getFoodStock(food);
                                      
                                      if (currentQuantity >= availableStock) {
                                        showModal(
                                          'Stock insuficiente',
                                          `No hay más stock disponible para "${food.nombre || food.name}".\n\nStock disponible: ${availableStock}\nEn tu carrito: ${currentQuantity}`,
                                          'warning'
                                        );
                                      } else {
                                        updateFoodQuantity(food.id || food._id, 1);
                                      }
                                    }}
                                    disabled={getFoodQuantity(food.id || food._id) >= getFoodStock(food)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <img 
                        src={getImagePath("/images/icon_right.svg")} 
                        alt="Siguiente"
                        className={`${styles.carouselArrowNew} ${(() => {
                          return currentFoodIndex >= activeFoodItems.length - 2 || activeFoodItems.length <= 2 ? styles.disabled : '';
                        })()}`}
                        onClick={(() => {
                          return currentFoodIndex < activeFoodItems.length - 2 && activeFoodItems.length > 2 ? nextFoodItem : undefined;
                        })()}
                      />
                    </div>
                  ) : (
                    <div className={styles.emptyStateMessage}>
                      No hay productos disponibles para agregar en este evento.
                    </div>
                  )}
                </>
              )}

              {currentSection === 'activities' && (
                <>
                  {/* Línea separadora */}
                  <div className={styles.foodSeparatorLine}></div>
                  {hasActiveActivities ? (
                    <div className={styles.foodCarouselContainer}>
                      <img 
                        src={getImagePath("/images/icon_left.svg")} 
                        alt="Anterior"
                        className={`${styles.carouselArrowNew} ${currentActivityIndex === 0 || activeActivities.length <= 2 ? styles.disabled : ''}`}
                        onClick={currentActivityIndex > 0 && activeActivities.length > 2 ? prevActivityItem : undefined}
                      />
                      
                      <div className={styles.foodCarouselWrapper}>
                        <div className={styles.foodCarouselTrack}>
                          {getVisibleActivityItems().map((activity: any) => (
                            <div key={activity.id || activity._id} className={styles.foodCardNew}>
                              <img 
                                src={activity.imagenPromocional || activity.imagen || activity.imageUrl || getImagePath("/images/person-play.png")} 
                                alt={activity.nombreActividad || activity.name}
                                className={styles.foodImageNew}
                                onError={(e) => {
                                  e.currentTarget.src = getImagePath("/images/person-play.png");
                                }}
                              />
                              <div className={styles.foodInfoNew}>
                                <h3 className={styles.foodNameNew}>{activity.nombreActividad || activity.name}</h3>
                                <p className={styles.foodDescriptionNew}>{activity.descripcion || activity.description}</p>
                                <p className={styles.foodPriceNew}>${formatPrice(getActivityPrice(activity))}</p>
                                <p className={styles.foodAvailability}>
                                  Cupos disponibles: {getActivityAvailableSpots(activity)}
                                </p>
                                
                                <div className={styles.foodQuantityControlsNew}>
                                  <button 
                                    className={styles.quantityBtn}
                                    onClick={() => updateActivityQuantity(activity.id || activity._id, -1)}
                                  >
                                    -
                                  </button>
                                  <span className={styles.quantity}>
                                    {getActivityQuantity(activity.id || activity._id)}
                                  </span>
                                  <button 
                                    className={styles.quantityBtn}
                                    onClick={() => {
                                      const currentQuantity = getActivityQuantity(activity.id || activity._id);
                                      const availableSpots = getActivityAvailableSpots(activity);
                                      
                                      if (currentQuantity >= availableSpots) {
                                        showModal(
                                          'Cupos insuficientes',
                                          `No hay más cupos disponibles para "${activity.nombreActividad || activity.name}".\n\nCupos disponibles: ${availableSpots}\nEn tu carrito: ${currentQuantity}`,
                                          'warning'
                                        );
                                      } else {
                                        updateActivityQuantity(activity.id || activity._id, 1);
                                      }
                                    }}
                                    disabled={getActivityQuantity(activity.id || activity._id) >= getActivityAvailableSpots(activity)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <img 
                        src={getImagePath("/images/icon_right.svg")} 
                        alt="Siguiente"
                        className={`${styles.carouselArrowNew} ${currentActivityIndex >= activeActivities.length - 2 || activeActivities.length <= 2 ? styles.disabled : ''}`}
                        onClick={currentActivityIndex < activeActivities.length - 2 && activeActivities.length > 2 ? nextActivityItem : undefined}
                      />
                    </div>
                  ) : (
                    <div className={styles.emptyStateMessage}>
                      No hay actividades disponibles para agregar en este evento.
                    </div>
                  )}
                </>
              )}

              {currentSection === 'attendees' && (
                <>
                  {/* Línea separadora */}
                  <div className={styles.foodSeparatorLine}></div>
                  
                  {/* Lista de asistentes */}
                  <div className={styles.attendeesContainer}>
                    {(skipOtherAttendees 
                      ? getAttendeesList().slice(0, 1) 
                      : getAttendeesList()
                    ).map((attendee) => {
                      // Usar el índice del objeto attendee, no el índice del map
                      const attendeeIndex = attendee.index;
                      return (
                        <div key={attendeeIndex} className={styles.attendeeItem}>
                          <div 
                            className={`${styles.attendeeHeader} ${openAttendeeIndex === attendeeIndex ? styles.attendeeHeaderOpen : ''}`}
                            onClick={() => setOpenAttendeeIndex(attendeeIndex)}
                          >
                            <span className={styles.attendeeTitle}>
                              {attendee.type} ({attendeeIndex + 1})
                              {isAttendeeFormComplete(attendeeIndex) && <span className={styles.completedIcon}>✓</span>}
                            </span>
                            <span className={styles.attendeeToggle}>
                              {openAttendeeIndex === attendeeIndex ? '−' : '+'}
                            </span>
                          </div>
                          
                          {openAttendeeIndex === attendeeIndex && (
                            <div className={styles.attendeeForm}>
                              <div className={styles.formGroup}>
                                <input
                                  type="text"
                                  placeholder="Nombre completo"
                                  className={styles.formInput}
                                  value={attendeesData[attendeeIndex]?.nombreCompleto || ''}
                                  onChange={(e) => updateAttendeeData(attendeeIndex, 'nombreCompleto', e.target.value)}
                                  required
                                />
                              </div>
                              
                              <div className={styles.formGroup}>
                                <input
                                  type="text"
                                  placeholder="RUT o ID personal"
                                  className={styles.formInput}
                                  value={attendeesData[attendeeIndex]?.rut || ''}
                                  onChange={(e) => updateAttendeeData(attendeeIndex, 'rut', e.target.value)}
                                  required
                                />
                              </div>
                              
                              <div className={styles.formGroup}>
                                <input
                                  type="tel"
                                  placeholder="Teléfono de contacto"
                                  className={styles.formInput}
                                  value={attendeesData[attendeeIndex]?.telefono || ''}
                                  onChange={(e) => updateAttendeeData(attendeeIndex, 'telefono', e.target.value)}
                                  required
                                />
                              </div>
                              
                              <div className={styles.formGroup}>
                                <input
                                  type="email"
                                  placeholder="Correo electrónico"
                                  className={styles.formInput}
                                  value={attendeesData[attendeeIndex]?.correo || ''}
                                  onChange={(e) => updateAttendeeData(attendeeIndex, 'correo', e.target.value)}
                                  required
                                />
                              </div>
                              
                              <div className={styles.formGroup}>
                                <input
                                  type="email"
                                  placeholder="Confirmación de correo electrónico"
                                  className={styles.formInput}
                                  value={attendeesData[attendeeIndex]?.confirmacionCorreo || ''}
                                  onChange={(e) => updateAttendeeData(attendeeIndex, 'confirmacionCorreo', e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Sección derecha - Carrito de compras */}
            <div className={styles.shoppingCart}>
              <div className={styles.cartHeader}>
                <h3 className={styles.cartTitle}>Carrito de compras</h3>
              </div>
              
              <div className={styles.cartContent}>
                {!hasItemsInCart && !hasItemsInFoodCart && !hasItemsInActivityCart && (
                  <p className={styles.cartEmpty}>
                    El carrito de compras está vacío. Por favor, selecciona tus productos
                  </p>
                )}
                
                {/* Grupo Entradas */}
                {hasItemsInCart && (
                  <div className={styles.cartGroup}>
                    <h4 className={styles.cartGroupTitle}>Entradas</h4>
                    <div className={styles.cartItems}>
                      {getCartItems().map((item: any) => (
                        <div key={item.entrada.id || item.entrada._id} className={styles.cartItem}>
                          <span className={styles.cartItemName}>
                            {item.entrada.tipoEntrada.charAt(0).toUpperCase() + item.entrada.tipoEntrada.slice(1)} x{item.quantity}
                          </span>
                          <span className={styles.cartItemPrice}>
                            ${formatPrice(getEntradaPrice(item.entrada) * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cartSubtotal}>
                      <span>Subtotal Entradas</span>
                      <span>${formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                )}
                
                {/* Grupo Alimentos */}
                {hasItemsInFoodCart && (
                  <div className={styles.cartGroup}>
                    <h4 className={styles.cartGroupTitle}>Alimentos, Snacks y Bebestibles</h4>
                    <div className={styles.cartItems}>
                      {getFoodCartItems().map((item: any) => (
                        <div key={item.food.id || item.food._id} className={styles.cartItem}>
                          <span className={styles.cartItemName}>
                            {item.food.nombre || item.food.name} x{item.quantity}
                          </span>
                          <span className={styles.cartItemPrice}>
                            ${formatPrice(getFoodPrice(item.food) * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cartSubtotal}>
                      <span>Subtotal Alimentos</span>
                      <span>${formatPrice(getFoodTotalPrice())}</span>
                    </div>
                  </div>
                )}
                
                {/* Grupo Actividades */}
                {hasItemsInActivityCart && (
                  <div className={styles.cartGroup}>
                    <h4 className={styles.cartGroupTitle}>Actividades</h4>
                    <div className={styles.cartItems}>
                      {getActivityCartItems().map((item: any) => (
                        <div key={item.activity.id || item.activity._id} className={styles.cartItem}>
                          <span className={styles.cartItemName}>
                            {item.activity.nombreActividad || item.activity.name} x{item.quantity}
                          </span>
                          <span className={styles.cartItemPrice}>
                            ${formatPrice(getActivityPrice(item.activity) * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cartSubtotal}>
                      <span>Subtotal Actividades</span>
                      <span>${formatPrice(getActivityTotalPrice())}</span>
                    </div>
                  </div>
                )}

                {/* Total Final */}
                {(hasItemsInCart || hasItemsInFoodCart || hasItemsInActivityCart) && (
                  <div className={styles.cartSummary}>
                    <div className={styles.cartTotal}>
                      <span>Total</span>
                      <span>${formatPrice(getTotalPrice() + getFoodTotalPrice() + getActivityTotalPrice())}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botón Continuar */}
          <div className={styles.continueSection}>
            <button 
              className={`${styles.continueBtn} ${
                (currentSection === 'tickets' && !hasItemsInCart) || 
                (currentSection === 'attendees' && !areAllFormsComplete()) 
                ? styles.continueDisabled : ''
              }`}
              onClick={() => {
                if (currentSection === 'tickets') {
                  setCurrentSection(getNextSection('tickets'));
                } else if (currentSection === 'food') {
                  setCurrentSection(getNextSection('food'));
                } else if (currentSection === 'activities') {
                  setCurrentSection(getNextSection('activities'));
                } else {
                  // Procesar la venta
                  processPurchase();
                }
              }}
              disabled={
                (currentSection === 'tickets' && !hasItemsInCart) ||
                (currentSection === 'attendees' && !areAllFormsComplete())
              }
            >
              {currentSection === 'attendees' ? 'Comprar' : 'Continuar'}
            </button>
          </div>
        </div>
      )}

      {/* Modal bonito para errores */}
      {modalInfo.isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalIcon}>{modalInfo.icon}</span>
              <h3 className={styles.modalTitle}>{modalInfo.title}</h3>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalMessage}>
                {modalInfo.message.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < modalInfo.message.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalButton} onClick={closeModal}>
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default VentaEntradaPage;
