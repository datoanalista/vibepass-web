import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

// Componente para manejar el favicon dinámicamente
function DynamicFavicon() {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/vibepass-web' : '';
  const faviconPath = `${basePath}/images/fecha_icon.png`;
  
  return (
    <>
      <link rel="icon" href={faviconPath} />
      <link rel="shortcut icon" href={faviconPath} />
      <link rel="apple-touch-icon" href={faviconPath} />
    </>
  );
}

// Componente para manejar routing de GitHub Pages (simplificado)
function GitHubPagesRouting() {
  return null; // Deshabilitado temporalmente para debug
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibepass",
  description: "Plataforma de venta de entradas y gestión de eventos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <DynamicFavicon />
        <GitHubPagesRouting />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
