"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEventDetails } from '@/hooks/useEventDetails';
import { getImagePath } from '@/utils/getImagePath';
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
            {/* Sección izquierda - Escoge tus entradas */}
            <div className={styles.ticketSelection}>
              <div className={styles.selectionHeader}>
                <h2 className={styles.selectionTitle}>Escoge tus entradas</h2>
              </div>
              
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
            </div>

            {/* Sección derecha - Carrito de compras */}
            <div className={styles.shoppingCart}>
              <div className={styles.cartHeader}>
                <h3 className={styles.cartTitle}>Carrito de compras</h3>
              </div>
              
              <div className={styles.cartContent}>
                {!hasItemsInCart ? (
                  <p className={styles.cartEmpty}>
                    El carrito de compras está vacío. Por favor, selecciona tus tickets
                  </p>
                ) : (
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
                
                <div className={styles.cartSummary}>
                  <div className={styles.cartItem}>
                    <span>Entrada</span>
                    <span>${getTotalPrice().toLocaleString('es-CL')}</span>
                  </div>
                  <div className={styles.cartTotal}>
                    <span>Total</span>
                    <span>${getTotalPrice().toLocaleString('es-CL')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botón Continuar */}
          <div className={styles.continueSection}>
            <button className={styles.continueBtn}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default VentaEntradaPage;
