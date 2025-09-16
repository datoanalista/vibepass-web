"use client";
import React, { useState, useEffect, useRef } from 'react';
import UniversalHeader from '@/components/Shared/UniversalHeader/UniversalHeader';
import Footer from '@/components/Shared/Footer/Footer';
import { getImagePath } from '@/utils/getImagePath';
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

const VentaExitosaPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPurchaseData = async () => {
      try {
        // Obtener datos de la compra desde localStorage
        const storedData = localStorage.getItem('purchaseData');
        if (storedData) {
          const data: PurchaseData = JSON.parse(storedData);
          setPurchaseData(data);
          
          // Crear información para el QR
          const qrInfo = {
            saleId: data.saleId,
            evento: data.eventoNombre,
            fecha: data.eventoFecha,
            total: data.total,
            tickets: data.tickets.length,
            timestamp: data.timestamp
          };
          
          // Generar QR code
          const qrDataURL = await QRCode.toDataURL(JSON.stringify(qrInfo), {
            width: 200,
            margin: 2,
            color: {
              dark: '#1B2735',
              light: '#FFFFFF'
            }
          });
          
          setQrCodeDataURL(qrDataURL);
        }
      } catch (error) {
        console.error('Error loading purchase data:', error);
      }
      
      // Simular el tiempo de carga y procesamiento final
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadPurchaseData();
  }, []);

  const downloadPDF = async () => {
    if (!purchaseData) {
      console.error('No purchase data available');
      alert('No hay datos de compra disponibles. Por favor, intenta nuevamente.');
      return;
    }

    console.log('Starting PDF generation with data:', purchaseData);
    setIsGeneratingPDF(true);

    try {
      // Crear un contenedor temporal para el PDF
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
            <img src="${qrCodeDataURL || getImagePath("/images/codigoqr.png")}" alt="QR Code" style="width: 150px; height: 150px;" />
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
      
      console.log('Container added to DOM, generating canvas...');
      
      // Esperar un poco para que se renderice
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Generar el PDF usando html2canvas y jsPDF
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      console.log('Canvas generated, creating PDF...');
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Si el contenido es muy alto, ajustar para que quepa en una página
      if (pdfHeight > pdf.internal.pageSize.getHeight()) {
        const ratio = pdf.internal.pageSize.getHeight() / pdfHeight;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth * ratio, pdf.internal.pageSize.getHeight());
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      
      // Crear nombre de archivo seguro
      const safeEventName = purchaseData.eventoNombre.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `entrada-${safeEventName}-${purchaseData.saleId}.pdf`;
      
      console.log('Downloading PDF:', fileName);
      
      // Descargar el PDF
      pdf.save(fileName);
      
      // Limpiar el contenedor temporal
      document.body.removeChild(pdfContainer);
      
      console.log('PDF generated successfully');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta nuevamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <UniversalHeader />
        
        {/* Loading overlay */}
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner}></div>
            <h2 className={styles.loadingTitle}>Procesando pago...</h2>
            <p className={styles.loadingText}>Finalizando tu compra de forma segura</p>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <UniversalHeader />
      
      <main className={styles.mainContent}>
        <img 
          src={getImagePath("/images/codigoqr.png")} 
          alt="Código QR"
          className={styles.qrImage}
        />
        
        <img 
          src={getImagePath("/images/_titulo_CÓDIGO_QR.png")} 
          alt="CÓDIGO QR"
          className={styles.titleImage}
        />
        
        <div 
          className={`${styles.blueBox} ${isGeneratingPDF ? styles.generating : ''}`}
          onClick={isGeneratingPDF ? undefined : downloadPDF}
          title={isGeneratingPDF ? "Generando PDF..." : "Haz clic para descargar tu entrada en PDF"}
        >
          <span className={styles.verificationText}>
            {isGeneratingPDF ? 'Generando PDF...' : 'DESCARGAR'}
          </span>
        </div>
        
        <img 
          src={getImagePath("/images/mensaje_exito.png")} 
          alt="Mensaje de éxito"
          className={styles.successMessage}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default VentaExitosaPage;
