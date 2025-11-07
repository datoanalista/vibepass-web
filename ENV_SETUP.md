# Configuración de Variables de Entorno

## Panel de Administración

Para configurar la URL del panel de administración, crea un archivo `.env.local` en la raíz del proyecto con la siguiente variable:

```env
NEXT_PUBLIC_PANEL_URL=https://datoanalista.github.io/vibepass-panel/login/
```

### Notas:

- Esta URL puede cambiar según el ambiente (desarrollo, staging, producción)
- Si no se define la variable, se usará la URL por defecto: `https://datoanalista.github.io/vibepass-panel/login/`
- La variable debe empezar con `NEXT_PUBLIC_` para estar disponible en el cliente
- El archivo `.env.local` está en `.gitignore` y no se commitea por seguridad

### Ejemplo para diferentes ambientes:

**Desarrollo:**
```env
NEXT_PUBLIC_PANEL_URL=http://localhost:3000/panel/login/
```

**Staging:**
```env
NEXT_PUBLIC_PANEL_URL=https://staging.example.com/panel/login/
```

**Producción:**
```env
NEXT_PUBLIC_PANEL_URL=https://datoanalista.github.io/vibepass-panel/login/
```

