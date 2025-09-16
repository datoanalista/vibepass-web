import type { NextConfig } from "next";

// Configuración condicional para desarrollo vs producción
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Configuración para GitHub Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Configuración de imágenes para static export
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './imageLoader.js'
  },
  
  // BasePath solo para producción (GitHub Pages)
  basePath: isProd ? '/vibepass-web' : '',
  assetPrefix: isProd ? '/vibepass-web/' : '',
  
  // Configuración adicional para compatibilidad
  distDir: 'out',
  
  // Generar todas las rutas estáticas
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/home': { page: '/home' },
      '/eventos': { page: '/eventos' },
      '/login': { page: '/login' },
      '/crear-cuenta': { page: '/crear-cuenta' },
      '/evento-seleccionado': { page: '/evento-seleccionado' },
      '/venta-entrada': { page: '/venta-entrada' },
      '/venta-exitosa': { page: '/venta-exitosa' },
      '/admin': { page: '/admin' },
      '/admin/create-event': { page: '/admin/create-event' },
      '/admin/evento-dashboard': { page: '/admin/evento-dashboard' },
      '/cart': { page: '/cart' },
      '/food-cart': { page: '/food-cart' },
      '/landing': { page: '/landing' },
      '/purchase': { page: '/purchase' },
    }
  }
};

export default nextConfig;
