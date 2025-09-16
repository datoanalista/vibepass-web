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
  distDir: 'out'
};

export default nextConfig;
