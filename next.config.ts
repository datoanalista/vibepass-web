import type { NextConfig } from "next";

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
  
  // BasePath para GitHub Pages (nombre del repositorio)
  basePath: '/vibepass-web',
  assetPrefix: '/vibepass-web/',
  
  // Configuración adicional para compatibilidad
  distDir: 'out',
  
  // Desactivar características server-side
  experimental: {
    esmExternals: 'loose'
  }
};

export default nextConfig;
