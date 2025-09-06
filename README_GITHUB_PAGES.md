# Vibepass Web - GitHub Pages

## 🚀 Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages usando GitHub Actions.

### 🔗 URL de GitHub Pages
Una vez configurado en GitHub, estará disponible en:
```
https://datoanalista.github.io/vibepass-web/
```

### ⚙️ Configuración Realizada

#### 1. Next.js Static Export
- ✅ `output: 'export'` configurado
- ✅ `basePath: '/vibepass-web'` 
- ✅ `images.unoptimized: true`

#### 2. GitHub Actions
- ✅ Workflow automático en `.github/workflows/deploy.yml`
- ✅ Build y deploy automático en cada push a `main`

#### 3. Archivos de soporte
- ✅ `.nojekyll` para evitar procesamiento Jekyll
- ✅ `imageLoader.js` para manejo de imágenes

### 🛠️ Para activar GitHub Pages

1. Ve a **Settings** del repositorio `vibepass-web`
2. En la sección **Pages**:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**

### 📋 Scripts disponibles

```bash
npm run dev     # Desarrollo local
npm run build   # Build para producción + static export
npm run deploy  # Build + crear .nojekyll
```

### ✅ Estado del Build

- **Compilado**: ✅ Sin errores críticos
- **Export estático**: ✅ Carpeta `out/` generada
- **Tamaño total**: ~111 kB (optimizado)
- **Páginas generadas**: 11 rutas estáticas

### ⚠️ Consideraciones

- Solo funciona como sitio estático (no SSR)
- Las imágenes externas de `cdn.builder.io` siguen funcionando
- Todas las rutas están pre-renderizadas como HTML estático
