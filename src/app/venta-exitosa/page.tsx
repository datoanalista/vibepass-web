"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import UniversalHeader from '@/components/Shared/UniversalHeader/UniversalHeader';
import Footer from '@/components/Shared/Footer/Footer';
import { getImagePath } from '@/utils/getImagePath';
import { API_ENDPOINTS } from '@/config/api';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import styles from './page.module.css';

interface PurchaseData {
  saleId: string;
  eventoId: string;
  eventoNombre: string;
  eventoFecha: string;
  total: number;
  tickets: Array<{
    id: string | number;
    tipo: string;
    cantidad: number;
    precio: number;
    subtotal: number;
  }>;
  food: Array<{
    id: string | number;
    nombre: string;
    descripcion?: string;
    categoria?: string;
    cantidad: number;
    precio: number;
    subtotal: number;
  }>;
  activities: Array<{
    id: string | number;
    nombreActividad: string;
    descripcion?: string;
    horaInicio?: string;
    horaTermino?: string;
    cantidad: number;
    precio: number;
    subtotal: number;
  }>;
  attendees: Array<{
    index: number;
    tipoEntrada: string;
    datosPersonales: {
      nombreCompleto: string;
      rut: string;
      telefono: string;
      correo: string;
      confirmacionCorreo: string;
    };
  }>;
  subtotals: {
    tickets: number;
    food: number;
    activities: number;
  };
  timestamp: string;
}

type ViewState = 'approved' | 'pending' | 'failed' | 'refunded' | 'missing';

interface PaymentResolutionResponse {
  status: string;
  message: string;
  data?: {
    saleNumber: string;
    saleStatus: string;
    purchaseData: PurchaseData;
    payment: {
      status: string;
      statusDetail?: string | null;
      paymentId?: string | null;
      preferenceId?: string | null;
      externalReference?: string | null;
      merchantOrderId?: string | null;
      paidAt?: string | null;
    };
  };
}

const getViewState = (saleStatus?: string, paymentStatus?: string): ViewState => {
  if (saleStatus === 'completed' || paymentStatus === 'approved') {
    return 'approved';
  }

  if (saleStatus === 'refunded' || paymentStatus === 'refunded') {
    return 'refunded';
  }

  if (saleStatus === 'cancelled' || ['rejected', 'cancelled', 'charged_back'].includes(paymentStatus || '')) {
    return 'failed';
  }

  if (saleStatus === 'pending' || ['pending', 'in_process', 'in_mediation', 'authorized'].includes(paymentStatus || '')) {
    return 'pending';
  }

  return 'missing';
};

const normalizeMercadoPagoParam = (value: string | null) => {
  if (!value || value === 'null' || value === 'undefined') {
    return null;
  }

  return value;
};

const LoadingState = () => (
  <div className={styles.pageContainer}>
    <UniversalHeader />
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingSpinner}></div>
        <h2 className={styles.loadingTitle}>Verificando pago...</h2>
        <p className={styles.loadingText}>Finalizando tu compra de forma segura</p>
      </div>
    </div>
    <Footer />
  </div>
);

const VentaExitosaContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('missing');
  const [statusMessage, setStatusMessage] = useState('Estamos verificando tu pago con Mercado Pago.');

  const generateQr = async (saleNumber: string) => {
    const qrInfo = { saleNumber };
    const qrDataURL = await QRCode.toDataURL(JSON.stringify(qrInfo), {
      width: 200,
      margin: 2,
      color: {
        dark: '#1B2735',
        light: '#FFFFFF'
      }
    });

    setQrCodeDataURL(qrDataURL);
  };

  useEffect(() => {
    const resolvePurchase = async () => {
      const paymentId = normalizeMercadoPagoParam(searchParams.get('payment_id')) ||
        normalizeMercadoPagoParam(searchParams.get('collection_id'));
      const externalReference = normalizeMercadoPagoParam(searchParams.get('external_reference'));
      const incomingStatus = normalizeMercadoPagoParam(searchParams.get('status')) ||
        normalizeMercadoPagoParam(searchParams.get('collection_status'));

      try {
        if (paymentId || externalReference) {
          const response = await fetch(API_ENDPOINTS.MERCADOPAGO_CONFIRM, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              paymentId,
              externalReference,
              status: incomingStatus
            })
          });

          const result: PaymentResolutionResponse = await response.json();

          if (!response.ok) {
            throw new Error(result.message || 'No fue posible confirmar el pago.');
          }

          const resolvedPurchase = result.data?.purchaseData || null;
          const resolvedViewState = getViewState(result.data?.saleStatus, result.data?.payment?.status);

          setPurchaseData(resolvedPurchase);
          setViewState(resolvedViewState);
          setStatusMessage(result.message || 'Estado del pago actualizado.');

          if (resolvedPurchase && resolvedViewState === 'approved') {
            localStorage.setItem('purchaseData', JSON.stringify(resolvedPurchase));
            await generateQr(resolvedPurchase.saleId);
          } else {
            localStorage.removeItem('purchaseData');
          }

          return;
        }

        const storedData = localStorage.getItem('purchaseData');

        if (storedData) {
          const parsedData: PurchaseData = JSON.parse(storedData);
          setPurchaseData(parsedData);
          setViewState('approved');
          setStatusMessage('Compra confirmada exitosamente.');
          await generateQr(parsedData.saleId);
          return;
        }

        setViewState('missing');
        setStatusMessage('No encontramos una compra asociada a este retorno.');
      } catch (error) {
        console.error('Error resolving Mercado Pago purchase:', error);
        setViewState('failed');
        setStatusMessage(error instanceof Error ? error.message : 'No fue posible validar el pago.');
      } finally {
        setIsLoading(false);
      }
    };

    resolvePurchase();
  }, [searchParams]);

  const downloadPDF = async () => {
    if (!purchaseData) {
      alert('No hay datos de compra disponibles. Por favor, intenta nuevamente.');
      return;
    }

    setIsGeneratingPDF(true);

    try {
      const pdfContainer = document.createElement('div');
      pdfContainer.style.position = 'absolute';
      pdfContainer.style.left = '-9999px';
      pdfContainer.style.top = '0';
      pdfContainer.style.width = '800px';
      pdfContainer.style.backgroundColor = 'white';
      pdfContainer.style.padding = '40px';
      pdfContainer.style.fontFamily = 'Inter, sans-serif';

      pdfContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1B2735; font-size: 32px; margin: 0 0 10px 0;">Entrada Digital</h1>
          <h2 style="color: #01A8E2; font-size: 24px; margin: 0 0 20px 0;">${purchaseData.eventoNombre}</h2>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px;">
          <div style="flex: 1;">
            <div style="margin-bottom: 15px; color: #1B2735;">
              <strong>ID de Compra:</strong> ${purchaseData.saleId}
            </div>
            <div style="margin-bottom: 15px; color: #1B2735;">
              <strong>Fecha del Evento:</strong> ${new Date(purchaseData.eventoFecha).toLocaleDateString('es-CL')}
            </div>
            <div style="margin-bottom: 15px; color: #1B2735;">
              <strong>Total Pagado:</strong> $${purchaseData.total.toLocaleString('es-CL')}
            </div>
            <div style="margin-bottom: 15px; color: #1B2735;">
              <strong>Fecha de Compra:</strong> ${new Date(purchaseData.timestamp).toLocaleDateString('es-CL')} ${new Date(purchaseData.timestamp).toLocaleTimeString('es-CL')}
            </div>
          </div>

          <div style="text-align: center; margin-left: 30px;">
            <img src="${qrCodeDataURL || getImagePath('/images/codigoqr.png')}" alt="QR Code" style="width: 150px; height: 150px;" />
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #1B2735; border-bottom: 2px solid #01A8E2; padding-bottom: 5px;">Entradas Compradas</h3>
          ${purchaseData.tickets.map(ticket => `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; color: #1B2735;">
              <span>${ticket.tipo.charAt(0).toUpperCase() + ticket.tipo.slice(1)} x${ticket.cantidad}</span>
              <span>$${ticket.subtotal.toLocaleString('es-CL')}</span>
            </div>
          `).join('')}
          <div style="text-align: right; font-weight: bold; margin-top: 10px; padding-top: 10px; border-top: 1px solid #01A8E2; color: #1B2735;">
            Subtotal Entradas: $${purchaseData.subtotals.tickets.toLocaleString('es-CL')}
          </div>
        </div>

        ${purchaseData.food.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h3 style="color: #1B2735; border-bottom: 2px solid #01A8E2; padding-bottom: 5px;">Alimentos y Bebidas</h3>
            ${purchaseData.food.map(item => `
              <div style="padding: 8px 0; border-bottom: 1px solid #eee;">
                <div style="display: flex; justify-content: space-between; color: #1B2735;">
                  <span><strong>${item.nombre}</strong> x${item.cantidad}</span>
                  <span>$${item.subtotal.toLocaleString('es-CL')}</span>
                </div>
                ${item.descripcion ? `<div style="font-size: 12px; color: #666; margin-top: 2px;">${item.descripcion}</div>` : ''}
              </div>
            `).join('')}
            <div style="text-align: right; font-weight: bold; margin-top: 10px; padding-top: 10px; border-top: 1px solid #01A8E2; color: #1B2735;">
              Subtotal Alimentos: $${purchaseData.subtotals.food.toLocaleString('es-CL')}
            </div>
          </div>
        ` : ''}

        ${purchaseData.activities.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h3 style="color: #1B2735; border-bottom: 2px solid #01A8E2; padding-bottom: 5px;">Actividades</h3>
            ${purchaseData.activities.map(activity => `
              <div style="padding: 8px 0; border-bottom: 1px solid #eee;">
                <div style="display: flex; justify-content: space-between; color: #1B2735;">
                  <span><strong>${activity.nombreActividad}</strong> x${activity.cantidad}</span>
                  <span>$${activity.subtotal.toLocaleString('es-CL')}</span>
                </div>
                ${activity.descripcion ? `<div style="font-size: 12px; color: #666; margin-top: 2px;">${activity.descripcion}</div>` : ''}
                ${activity.horaInicio && activity.horaTermino ? `<div style="font-size: 12px; color: #01A8E2; margin-top: 2px;">Horario: ${activity.horaInicio} - ${activity.horaTermino}</div>` : ''}
              </div>
            `).join('')}
            <div style="text-align: right; font-weight: bold; margin-top: 10px; padding-top: 10px; border-top: 1px solid #01A8E2; color: #1B2735;">
              Subtotal Actividades: $${purchaseData.subtotals.activities.toLocaleString('es-CL')}
            </div>
          </div>
        ` : ''}

        ${purchaseData.attendees.length > 0 ? `
          <div style="margin-bottom: 30px;">
            <h3 style="color: #1B2735; border-bottom: 2px solid #01A8E2; padding-bottom: 5px;">Asistentes</h3>
            ${purchaseData.attendees.map((attendee, index) => `
              <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <div style="font-weight: bold; margin-bottom: 5px; color: #1B2735;">
                  ${index + 1}. ${attendee.datosPersonales.nombreCompleto} (${attendee.tipoEntrada})
                </div>
                <div style="font-size: 12px; color: #1B2735;">
                  RUT: ${attendee.datosPersonales.rut} |
                  Teléfono: ${attendee.datosPersonales.telefono} |
                  Email: ${attendee.datosPersonales.correo}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #01A8E2; color: #666; font-size: 14px;">
          <p>Presenta este código QR en la entrada del evento</p>
          <p>¡Que disfrutes tu experiencia!</p>
        </div>
      `;

      document.body.appendChild(pdfContainer);
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (pdfHeight > pdf.internal.pageSize.getHeight()) {
        const ratio = pdf.internal.pageSize.getHeight() / pdfHeight;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth * ratio, pdf.internal.pageSize.getHeight());
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }

      const safeEventName = purchaseData.eventoNombre.replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`entrada-${safeEventName}-${purchaseData.saleId}.pdf`);

      document.body.removeChild(pdfContainer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta nuevamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (viewState !== 'approved') {
    return (
      <div className={styles.pageContainer}>
        <UniversalHeader />

        <main className={styles.stateMain}>
          <section className={`${styles.statusCard} ${styles[`status${viewState.charAt(0).toUpperCase() + viewState.slice(1)}`]}`}>
            <h1 className={styles.statusTitle}>
              {viewState === 'pending' && 'Pago pendiente'}
              {viewState === 'failed' && 'Pago no aprobado'}
              {viewState === 'refunded' && 'Pago reembolsado'}
              {viewState === 'missing' && 'Compra no encontrada'}
            </h1>
            <p className={styles.statusDescription}>{statusMessage}</p>

            {purchaseData && (
              <div className={styles.summaryBox}>
                <div><strong>Pedido:</strong> {purchaseData.saleId}</div>
                <div><strong>Evento:</strong> {purchaseData.eventoNombre}</div>
                <div><strong>Total:</strong> ${purchaseData.total.toLocaleString('es-CL')}</div>
              </div>
            )}

            <button className={styles.retryButton} onClick={() => window.location.reload()}>
              Reintentar validación
            </button>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />

      <main className={styles.mainContent}>
        <img
          src={qrCodeDataURL || getImagePath('/images/codigoqr.png')}
          alt="Código QR"
          className={styles.qrImage}
        />

        <img
          src={getImagePath('/images/_titulo_CÓDIGO_QR.png')}
          alt="CÓDIGO QR"
          className={styles.titleImage}
        />

        <div
          className={`${styles.blueBox} ${isGeneratingPDF ? styles.generating : ''}`}
          onClick={isGeneratingPDF ? undefined : downloadPDF}
          title={isGeneratingPDF ? 'Generando PDF...' : 'Haz clic para descargar tu entrada en PDF'}
        >
          <span className={styles.verificationText}>
            {isGeneratingPDF ? 'Generando PDF...' : 'DESCARGAR'}
          </span>
        </div>

        <img
          src={getImagePath('/images/mensaje_exito.png')}
          alt="Mensaje de éxito"
          className={styles.successMessage}
        />
      </main>

      <Footer />
    </div>
  );
};

export default function VentaExitosaPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VentaExitosaContent />
    </Suspense>
  );
}
