// Custom image loader for GitHub Pages static export
export default function customLoader({ src, width, quality }) {
  // For external images, return as-is
  if (src.startsWith('http')) {
    return src;
  }
  
  // For local images, add basePath
  const basePath = '/vibepass-web';
  return `${basePath}${src}`;
}
