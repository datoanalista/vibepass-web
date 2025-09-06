/**
 * Helper function para manejar rutas de imágenes en desarrollo vs producción
 * En desarrollo: /images/banner.png
 * En producción (GitHub Pages): /vibepass-web/images/banner.png
 */
export function getImagePath(imagePath: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/vibepass-web' : '';
  
  // Si ya empieza con http o https, devolverla tal como está (imágenes externas)
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Para imágenes locales, agregar basePath en producción
  return `${basePath}${imagePath}`;
}
