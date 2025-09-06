// Custom image loader for GitHub Pages static export
export default function customLoader({ src, width, quality }) {
  // For external images, return as-is
  if (src.startsWith('http')) {
    return src;
  }
  
  // For local images, add basePath only in production
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/vibepass-web' : '';
  return `${basePath}${src}`;
}
