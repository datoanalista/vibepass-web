"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEventDetails } from '@/hooks/useEventDetails';
import { getImagePath } from '@/utils/getImagePath';
import { foodItemsData, FoodItem } from '@/data/FoodCart/foodItemsData';
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
  const eventoId = searchParams.get('eventoId');
  const tipoEntrada = searchParams.get('tipoEntrada');
  const { event, loading, error } = useEventDetails(eventoId);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [currentSection, setCurrentSection] = useState<'tickets' | 'food'>('tickets');
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [foodCart, setFoodCart] = useState<{[key: number]: number}>({});

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
  const updateFoodQuantity = (foodId: number, change: number) => {
    setFoodCart(prev => {
      const currentQuantity = prev[foodId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        const newCart = { ...prev };
        delete newCart[foodId];
        return newCart;
      }
      
      return { ...prev, [foodId]: newQuantity };
    });
  };

  const getFoodQuantity = (foodId: number) => foodCart[foodId] || 0;

  const getFoodTotalPrice = () => {
    return Object.entries(foodCart).reduce((total, [foodId, quantity]) => {
      const food = foodItemsData.find((f: FoodItem) => f.id === parseInt(foodId));
      return total + (food ? food.price * quantity : 0);
    }, 0);
  };

  const getFoodCartItems = () => {
    return Object.entries(foodCart)
      .map(([foodId, quantity]) => {
        const food = foodItemsData.find((f: FoodItem) => f.id === parseInt(foodId));
        return food ? { food, quantity } : null;
      })
      .filter(item => item !== null);
  };

  const hasItemsInFoodCart = Object.keys(foodCart).length > 0;

  // Funciones del carrusel
  const nextFoodItem = () => {
    setCurrentFoodIndex(prev => 
      prev >= foodItemsData.length - 3 ? 0 : prev + 1
    );
  };

  const prevFoodItem = () => {
    setCurrentFoodIndex(prev => 
      prev <= 0 ? Math.max(0, foodItemsData.length - 3) : prev - 1
    );
  };

  const getVisibleFoodItems = () => {
    return foodItemsData.slice(currentFoodIndex, currentFoodIndex + 3);
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
                  {currentSection === 'tickets' ? 'Escoge tus entradas' : 'Comida, Snacks y Bebestibles'}
                </h2>
                {currentSection === 'food' && (
                  <p className={styles.selectionDescription}>
                    Añade tus productos antes del evento
                  </p>
                )}
              </div>
              
              {currentSection === 'tickets' && (
                <>
                  {/* Fecha como item separado */}
                  <div className={styles.dateItem}>
                    <p className={styles.selectionDate}>
                      {new Date(event.informacionGeneral?.fechaEvento + 'T00:00:00').toLocaleDateString('es-CL', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
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
                                console.log('Increasing:', entradaId, entrada);
                                updateQuantity(entradaId, 1);
                              }}
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
                  
                  {/* Carrusel de comida */}
                  <div className={styles.foodCarousel}>
                    <button 
                      className={styles.carouselArrow}
                      onClick={prevFoodItem}
                      disabled={currentFoodIndex === 0}
                    >
                      <img src={getImagePath("/images/icon_left.svg")} alt="Anterior" />
                    </button>
                    
                    <div className={styles.foodItems}>
                      {getVisibleFoodItems().map((food: FoodItem) => (
                        <div key={food.id} className={styles.foodCard}>
                          <img 
                            src={food.imageUrl} 
                            alt={food.name}
                            className={styles.foodImage}
                          />
                          <div className={styles.foodInfo}>
                            <h3 className={styles.foodName}>{food.name}</h3>
                            <p className={styles.foodDescription}>{food.description}</p>
                            <p className={styles.foodPrice}>${food.price.toLocaleString('es-CL')}</p>
                            
                            <div className={styles.foodQuantityControls}>
                              <button 
                                className={styles.quantityBtn}
                                onClick={() => updateFoodQuantity(food.id, -1)}
                              >
                                -
                              </button>
                              <span className={styles.quantity}>
                                {getFoodQuantity(food.id)}
                              </span>
                              <button 
                                className={styles.quantityBtn}
                                onClick={() => updateFoodQuantity(food.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      className={styles.carouselArrow}
                      onClick={nextFoodItem}
                      disabled={currentFoodIndex >= foodItemsData.length - 3}
                    >
                      <img src={getImagePath("/images/icon_right.svg")} alt="Siguiente" />
                    </button>
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
                {currentSection === 'tickets' && !hasItemsInCart && (
                  <p className={styles.cartEmpty}>
                    El carrito de compras está vacío. Por favor, selecciona tus tickets
                  </p>
                )}
                
                {currentSection === 'food' && !hasItemsInFoodCart && (
                  <p className={styles.cartEmpty}>
                    No has seleccionado productos. Añade comida o bebidas a tu carrito
                  </p>
                )}
                
                {/* Mostrar items de tickets */}
                {currentSection === 'tickets' && hasItemsInCart && (
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
                )}
                
                {/* Mostrar items de comida */}
                {currentSection === 'food' && hasItemsInFoodCart && (
                  <div className={styles.cartItems}>
                    {getFoodCartItems().map((item: any) => (
                      <div key={item.food.id} className={styles.cartItem}>
                        <span className={styles.cartItemName}>
                          {item.food.name} x{item.quantity}
                        </span>
                        <span className={styles.cartItemPrice}>
                          ${(item.food.price * item.quantity).toLocaleString('es-CL')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className={styles.cartSummary}>
                  {currentSection === 'tickets' && (
                    <>
                      <div className={styles.cartItem}>
                        <span>Entrada</span>
                        <span>${getTotalPrice().toLocaleString('es-CL')}</span>
                      </div>
                      <div className={styles.cartTotal}>
                        <span>Total</span>
                        <span>${getTotalPrice().toLocaleString('es-CL')}</span>
                      </div>
                    </>
                  )}
                  
                  {currentSection === 'food' && (
                    <>
                      <div className={styles.cartItem}>
                        <span>Comida y Bebidas</span>
                        <span>${getFoodTotalPrice().toLocaleString('es-CL')}</span>
                      </div>
                      <div className={styles.cartTotal}>
                        <span>Total</span>
                        <span>${getFoodTotalPrice().toLocaleString('es-CL')}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Botón Continuar */}
          <div className={styles.continueSection}>
            <button 
              className={styles.continueBtn}
              onClick={() => {
                if (currentSection === 'tickets') {
                  setCurrentSection('food');
                } else {
                  // Aquí iría la lógica para proceder al checkout
                  console.log('Proceeding to checkout...');
                }
              }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default VentaEntradaPage;
