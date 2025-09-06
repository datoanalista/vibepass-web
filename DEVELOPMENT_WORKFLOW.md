# Vibepass Web - Workflow de Desarrollo

## 🌟 **Estado del Proyecto**

✅ **Frontend público desplegado**: https://datoanalista.github.io/vibepass-web/  
✅ **GitHub Actions configurado**: Deploy automático desde `main`  
✅ **Rama de desarrollo creada**: `development`

## 🚀 **Workflow de Ramas**

```
main (producción)
├── ✅ Despliega automáticamente a GitHub Pages
├── ✅ Solo cambios estables y probados
└── development (desarrollo)
    ├── 🔧 Rama principal de trabajo
    ├── 🧪 Testing y experimentos
    └── 🔀 Merge a main cuando esté listo
```

## 📋 **Proceso de Desarrollo**

### **1. Trabajar en development**
```bash
git checkout development
# Hacer cambios...
git add .
git commit -m "feat: descripción del cambio"
git push origin development
```

### **2. Cuando esté listo para producción**
```bash
git checkout main
git merge development
git push origin main
# 🚀 Se despliega automáticamente a GitHub Pages
```

## 🛠️ **Comandos útiles**

```bash
# Ver rama actual
git branch

# Cambiar a development
git checkout development

# Ver diferencias con main
git diff main..development

# Verificar build local
npm run build
```

## 🌐 **URLs del Proyecto**

- **Producción**: https://datoanalista.github.io/vibepass-web/
- **Repositorio**: https://github.com/datoanalista/vibepass-web
- **Actions**: https://github.com/datoanalista/vibepass-web/actions

## 🎯 **Próximos Pasos**

- ✅ Conectar con backend (puerto 3001)
- ✅ Integrar panel de eventos
- ✅ Configurar Ngrok para pruebas
- ✅ Optimizar y mejorar funcionalidades

---

**Rama actual**: `development` 🚧  
**¡Listo para desarrollo!** 🎉
