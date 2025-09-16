"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEventDetails } from '@/hooks/useEventDetails';
import { getImagePath } from '@/utils/getImagePath';
import { foodItemsData, FoodItem } from '@/data/FoodCart/foodItemsData';
import { API_ENDPOINTS } from '@/config/api';
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

const VentaEntradaPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventoId = searchParams.get('eventoId');
  const tipoEntrada = searchParams.get('tipoEntrada');
  const { event, loading, error } = useEventDetails(eventoId);
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
      return total + (entrada ? entrada.precio * quantity : 0);
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
      return total + (food ? (food.precioUnitario || food.price) * quantity : 0);
    }, 0);
  };

  const getFoodCartItems = () => {
    if (!event?.alimentosBebestibles) return [];
    
    return Object.entries(foodCart)
      .map(([foodId, quantity]) => {
        const food = event.alimentosBebestibles.find((f: any) => 
          String(f.id || f._id) === String(foodId)
        );
        return food ? { food, quantity } : null;
      })
      .filter(item => item !== null);
  };

  const hasItemsInFoodCart = Object.keys(foodCart).length > 0;

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
      return total + (activity ? (activity.precioUnitario || activity.price) * quantity : 0);
    }, 0);
  };

  const getActivityCartItems = () => {
    if (!event?.actividades) return [];
    
    return Object.entries(activityCart)
      .map(([activityId, quantity]) => {
        const activity = event.actividades.find((a: any) => 
          String(a.id || a._id) === String(activityId)
        );
        return activity ? { activity, quantity } : null;
      })
      .filter(item => item !== null);
  };

  const hasItemsInActivityCart = Object.keys(activityCart).length > 0;

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
    for (let i = 0; i < totalAttendees; i++) {
      if (!isAttendeeFormComplete(i)) return false;
    }
    return totalAttendees > 0;
  };

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
            precio: item.entrada.precio,
            cantidad: item.quantity,
            subtotal: item.entrada.precio * item.quantity
          })),
          subtotal: getTotalPrice()
        },
        food: {
          items: getFoodCartItems().map((item: any) => ({
            id: item.food.id || item.food._id,
            nombre: item.food.nombre || item.food.name,
            precio: item.food.precioUnitario || item.food.price,
            cantidad: item.quantity,
            subtotal: (item.food.precioUnitario || item.food.price) * item.quantity
          })),
          subtotal: getFoodTotalPrice()
        },
        activities: {
          items: getActivityCartItems().map((item: any) => ({
            id: item.activity.id || item.activity._id,
            nombreActividad: item.activity.nombreActividad || item.activity.name,
            precio: item.activity.precioUnitario || item.activity.price,
            cantidad: item.quantity,
            subtotal: (item.activity.precioUnitario || item.activity.price) * item.quantity
          })),
          subtotal: getActivityTotalPrice()
        },
        attendees: getAttendeesList().map((attendee, index) => ({
          index: index,
          tipoEntrada: attendee.type,
          datosPersonales: attendeesData[index] || {}
        })),
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

      // Realizar POST a la API externa usando configuración centralizada
      const response = await fetch(API_ENDPOINTS.SALES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Venta procesada exitosamente:', result);
        
         // Guardar datos COMPLETOS de la compra en localStorage para la página de éxito
         const purchaseInfo = {
           saleId: result.id || Date.now().toString(),
           eventoId: eventoId,
           eventoNombre: event?.informacionGeneral?.nombreEvento,
           eventoFecha: event?.informacionGeneral?.fechaEvento,
           total: getTotalPrice() + getFoodTotalPrice() + getActivityTotalPrice(),
           tickets: getCartItems().map((item: any) => ({
             id: item.entrada.id || item.entrada._id,
             tipo: item.entrada.tipoEntrada,
             cantidad: item.quantity,
             precio: item.entrada.precio,
             subtotal: item.entrada.precio * item.quantity
           })),
           food: getFoodCartItems().map((item: any) => ({
             id: item.food.id || item.food._id,
             nombre: item.food.nombre || item.food.name,
             descripcion: item.food.descripcion || item.food.description,
             categoria: item.food.categoria || 'alimento',
             cantidad: item.quantity,
             precio: item.food.precioUnitario || item.food.price,
             subtotal: (item.food.precioUnitario || item.food.price) * item.quantity
           })),
           activities: getActivityCartItems().map((item: any) => ({
             id: item.activity.id || item.activity._id,
             nombreActividad: item.activity.nombreActividad || item.activity.name,
             descripcion: item.activity.descripcion || item.activity.description,
             horaInicio: item.activity.horaInicio,
             horaTermino: item.activity.horaTermino,
             cantidad: item.quantity,
             precio: item.activity.precioUnitario || item.activity.price,
             subtotal: (item.activity.precioUnitario || item.activity.price) * item.quantity
           })),
           attendees: getAttendeesList().map((attendee, index) => {
             const attendeeData = attendeesData[index] || {};
             return {
               index: index,
               tipoEntrada: attendee.type,
               datosPersonales: {
                 nombreCompleto: attendeeData.nombreCompleto || '',
                 rut: attendeeData.rut || '',
                 telefono: attendeeData.telefono || '',
                 correo: attendeeData.correo || '',
                 confirmacionCorreo: attendeeData.confirmacionCorreo || ''
               }
             };
           }),
           subtotals: {
             tickets: getTotalPrice(),
             food: getFoodTotalPrice(),
             activities: getActivityTotalPrice()
           },
           timestamp: new Date().toISOString()
         };
         
         console.log('=== PURCHASE INFO GUARDADO EN LOCALSTORAGE ===');
         console.log(JSON.stringify(purchaseInfo, null, 2));
         console.log('=== FIN PURCHASE INFO ===');
         
         localStorage.setItem('purchaseData', JSON.stringify(purchaseInfo));
        
        // Navegar a la página de venta exitosa (el loading continuará allí)
        router.push('/venta-exitosa');
      } else {
        const error = await response.json();
        console.error('Error al procesar la venta:', error);
        setIsProcessingPurchase(false);
        
        // Manejar diferentes tipos de errores
        let errorMessage = 'Error al procesar la compra. Por favor, intenta nuevamente.';
        
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
    const activeFood = event?.alimentosBebestibles?.filter((item: any) => item.activo) || [];
    if (activeFood.length <= 2) return; // No navegar si hay 2 o menos items
    
    setCurrentFoodIndex(prev => 
      prev >= activeFood.length - 2 ? 0 : prev + 1
    );
  };

  const prevFoodItem = () => {
    const activeFood = event?.alimentosBebestibles?.filter((item: any) => item.activo) || [];
    if (activeFood.length <= 2) return; // No navegar si hay 2 o menos items
    
    setCurrentFoodIndex(prev => 
      prev <= 0 ? Math.max(0, activeFood.length - 2) : prev - 1
    );
  };

  const getVisibleFoodItems = () => {
    if (!event?.alimentosBebestibles) return [];
    
    const activeFood = event.alimentosBebestibles.filter((item: any) => item.activo);
    const visibleItems = activeFood.slice(currentFoodIndex, currentFoodIndex + 2);
    
    // Asegurar que siempre mostramos máximo 2 cards
    return visibleItems.slice(0, 2);
  };

  // Funciones del carrusel de actividades
  const nextActivityItem = () => {
    const activeActivities = event?.actividades?.filter((item: any) => item.activa) || [];
    if (activeActivities.length <= 2) return; // No navegar si hay 2 o menos items
    
    setCurrentActivityIndex(prev => 
      prev >= activeActivities.length - 2 ? 0 : prev + 1
    );
  };

  const prevActivityItem = () => {
    const activeActivities = event?.actividades?.filter((item: any) => item.activa) || [];
    if (activeActivities.length <= 2) return; // No navegar si hay 2 o menos items
    
    setCurrentActivityIndex(prev => 
      prev <= 0 ? Math.max(0, activeActivities.length - 2) : prev - 1
    );
  };

  const getVisibleActivityItems = () => {
    if (!event?.actividades) return [];
    
    const activeActivities = event.actividades.filter((item: any) => item.activa);
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
            <h2 className={styles.loadingTitle}>Procesando pago...</h2>
            <p className={styles.loadingText}>Estamos procesando tu compra de forma segura</p>
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
                      Añade tus productos antes del evento
                    </p>
                    <button 
                      className={styles.backBtn}
                      onClick={() => setCurrentSection('tickets')}
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
                      Participa de las actividades que tenemos para ti!
                    </p>
                    <button 
                      className={styles.backBtn}
                      onClick={() => setCurrentSection('food')}
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
                      onClick={() => setCurrentSection('activities')}
                    >
                      Atrás
                    </button>
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
                            ${entrada.precio.toLocaleString('es-CL')}
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
                  
                  {/* Carrusel de comida - Implementación nueva */}
                  <div className={styles.foodCarouselContainer}>
                    <img 
                      src={getImagePath("/images/icon_left.svg")} 
                      alt="Anterior"
                      className={`${styles.carouselArrowNew} ${(() => {
                        const activeFood = event?.alimentosBebestibles?.filter((item: any) => item.activo) || [];
                        return currentFoodIndex === 0 || activeFood.length <= 2 ? styles.disabled : '';
                      })()}`}
                      onClick={(() => {
                        const activeFood = event?.alimentosBebestibles?.filter((item: any) => item.activo) || [];
                        return currentFoodIndex > 0 && activeFood.length > 2 ? prevFoodItem : undefined;
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
                              <p className={styles.foodPriceNew}>${(food.precioUnitario || food.price).toLocaleString('es-CL')}</p>
                              <p className={styles.foodAvailability}>
                                Disponibles: {(() => {
                                  console.log('Food item:', food);
                                  console.log('stockActual:', food.stockActual);
                                  return food.stockActual || 'Sin límite';
                                })()}
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
                                    const availableStock = food.stockActual || 999999; // Si no hay límite, usar número alto
                                    
                                    if (food.stockActual && currentQuantity >= availableStock) {
                                      showModal(
                                        'Stock insuficiente',
                                        `No hay más stock disponible para "${food.nombre || food.name}".\n\nStock disponible: ${availableStock}\nEn tu carrito: ${currentQuantity}`,
                                        'warning'
                                      );
                                    } else {
                                      updateFoodQuantity(food.id || food._id, 1);
                                    }
                                  }}
                                  disabled={food.stockActual && getFoodQuantity(food.id || food._id) >= food.stockActual}
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
                        const activeFood = event?.alimentosBebestibles?.filter((item: any) => item.activo) || [];
                        return currentFoodIndex >= activeFood.length - 2 || activeFood.length <= 2 ? styles.disabled : '';
                      })()}`}
                      onClick={(() => {
                        const activeFood = event?.alimentosBebestibles?.filter((item: any) => item.activo) || [];
                        return currentFoodIndex < activeFood.length - 2 && activeFood.length > 2 ? nextFoodItem : undefined;
                      })()}
                    />
                  </div>
                </>
              )}

              {currentSection === 'activities' && (
                <>
                  {/* Línea separadora */}
                  <div className={styles.foodSeparatorLine}></div>
                  
                  {/* Carrusel de actividades */}
                  <div className={styles.foodCarouselContainer}>
                    <img 
                      src={getImagePath("/images/icon_left.svg")} 
                      alt="Anterior"
                      className={`${styles.carouselArrowNew} ${(() => {
                        const activeActivities = event?.actividades?.filter((item: any) => item.activa) || [];
                        return currentActivityIndex === 0 || activeActivities.length <= 2 ? styles.disabled : '';
                      })()}`}
                      onClick={(() => {
                        const activeActivities = event?.actividades?.filter((item: any) => item.activa) || [];
                        return currentActivityIndex > 0 && activeActivities.length > 2 ? prevActivityItem : undefined;
                      })()}
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
                              <p className={styles.foodPriceNew}>${(activity.precioUnitario || activity.price).toLocaleString('es-CL')}</p>
                              <p className={styles.foodAvailability}>
                                Cupos disponibles: {activity.cuposDisponibles - (activity.cuposOcupados || 0)}
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
                                    const availableSpots = activity.cuposDisponibles - (activity.cuposOcupados || 0);
                                    
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
                                  disabled={getActivityQuantity(activity.id || activity._id) >= (activity.cuposDisponibles - (activity.cuposOcupados || 0))}
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
                        const activeActivities = event?.actividades?.filter((item: any) => item.activa) || [];
                        return currentActivityIndex >= activeActivities.length - 2 || activeActivities.length <= 2 ? styles.disabled : '';
                      })()}`}
                      onClick={(() => {
                        const activeActivities = event?.actividades?.filter((item: any) => item.activa) || [];
                        return currentActivityIndex < activeActivities.length - 2 && activeActivities.length > 2 ? nextActivityItem : undefined;
                      })()}
                    />
                  </div>
                </>
              )}

              {currentSection === 'attendees' && (
                <>
                  {/* Línea separadora */}
                  <div className={styles.foodSeparatorLine}></div>
                  
                  {/* Lista de asistentes */}
                  <div className={styles.attendeesContainer}>
                    {getAttendeesList().map((attendee, index) => (
                      <div key={index} className={styles.attendeeItem}>
                        <div 
                          className={`${styles.attendeeHeader} ${openAttendeeIndex === index ? styles.attendeeHeaderOpen : ''}`}
                          onClick={() => setOpenAttendeeIndex(index)}
                        >
                          <span className={styles.attendeeTitle}>
                            {attendee.type} ({index + 1})
                            {isAttendeeFormComplete(index) && <span className={styles.completedIcon}>✓</span>}
                          </span>
                          <span className={styles.attendeeToggle}>
                            {openAttendeeIndex === index ? '−' : '+'}
                          </span>
                        </div>
                        
                        {openAttendeeIndex === index && (
                          <div className={styles.attendeeForm}>
                            <div className={styles.formGroup}>
                              <input
                                type="text"
                                placeholder="Nombre completo"
                                className={styles.formInput}
                                value={attendeesData[index]?.nombreCompleto || ''}
                                onChange={(e) => updateAttendeeData(index, 'nombreCompleto', e.target.value)}
                                required
                              />
                            </div>
                            
                            <div className={styles.formGroup}>
                              <input
                                type="text"
                                placeholder="RUT o ID personal"
                                className={styles.formInput}
                                value={attendeesData[index]?.rut || ''}
                                onChange={(e) => updateAttendeeData(index, 'rut', e.target.value)}
                                required
                              />
                            </div>
                            
                            <div className={styles.formGroup}>
                              <input
                                type="tel"
                                placeholder="Teléfono de contacto"
                                className={styles.formInput}
                                value={attendeesData[index]?.telefono || ''}
                                onChange={(e) => updateAttendeeData(index, 'telefono', e.target.value)}
                                required
                              />
                            </div>
                            
                            <div className={styles.formGroup}>
                              <input
                                type="email"
                                placeholder="Correo electrónico"
                                className={styles.formInput}
                                value={attendeesData[index]?.correo || ''}
                                onChange={(e) => updateAttendeeData(index, 'correo', e.target.value)}
                                required
                              />
                            </div>
                            
                            <div className={styles.formGroup}>
                              <input
                                type="email"
                                placeholder="Confirmación de correo electrónico"
                                className={styles.formInput}
                                value={attendeesData[index]?.confirmacionCorreo || ''}
                                onChange={(e) => updateAttendeeData(index, 'confirmacionCorreo', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
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
                            ${(item.entrada.precio * item.quantity).toLocaleString('es-CL')}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cartSubtotal}>
                      <span>Subtotal Entradas</span>
                      <span>${getTotalPrice().toLocaleString('es-CL')}</span>
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
                            ${((item.food.precioUnitario || item.food.price) * item.quantity).toLocaleString('es-CL')}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cartSubtotal}>
                      <span>Subtotal Alimentos</span>
                      <span>${getFoodTotalPrice().toLocaleString('es-CL')}</span>
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
                            ${((item.activity.precioUnitario || item.activity.price) * item.quantity).toLocaleString('es-CL')}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cartSubtotal}>
                      <span>Subtotal Actividades</span>
                      <span>${getActivityTotalPrice().toLocaleString('es-CL')}</span>
                    </div>
                  </div>
                )}

                {/* Total Final */}
                {(hasItemsInCart || hasItemsInFoodCart || hasItemsInActivityCart) && (
                  <div className={styles.cartSummary}>
                    <div className={styles.cartTotal}>
                      <span>Total</span>
                      <span>${(getTotalPrice() + getFoodTotalPrice() + getActivityTotalPrice()).toLocaleString('es-CL')}</span>
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
                  setCurrentSection('food');
                } else if (currentSection === 'food') {
                  setCurrentSection('activities');
                } else if (currentSection === 'activities') {
                  setCurrentSection('attendees');
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
