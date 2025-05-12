# Sistema de Gestión Documental

Sistema moderno de gestión documental desarrollado con React, TypeScript y Material-UI. Permite administrar documentos digitales con categorización, estados y búsqueda avanzada.

![Captura de la aplicación](./docs/screenshot.png)

## 🚀 Características

### Gestión de Documentos

- Creación y edición de documentos con información detallada
- Soporte para múltiples tipos de documentos (PDF, Word, Imagen)
- Sistema de estados (Activo/Inactivo)
- Categorización jerárquica (Categoría y Subcategoría)
- Fecha de subida automática
- Descripción detallada del documento

### Categorización

- **Categorías principales:**

  - Administrativo
  - Financiero
  - Legal

- **Subcategorías por tipo:**
  - **Administrativo:** Acta, Memorando, Circular, Resolución
  - **Financiero:** Factura, Recibo, Balance, Estado Financiero
  - **Legal:** Contrato, Poder, Demanda, Sentencia

### Interfaz de Usuario

- Diseño moderno y responsivo
- Temas y estilos personalizados de Material-UI
- Efectos visuales avanzados (glassmorphism, gradientes, sombras)
- Transiciones y animaciones suaves
- Modo lista y cuadrícula para visualización
- Barra de búsqueda integrada
- Sistema de filtros avanzados

### Características Técnicas

- Desarrollado con React 18 y TypeScript
- Gestión de estado con React Hooks
- Componentes reutilizables
- Validación de tipos con TypeScript
- Estilos modulares con Material-UI
- Sistema de temas personalizable

## 🛠️ Tecnologías Utilizadas

- React 18
- TypeScript
- Material-UI (MUI)
- Vite
- ESLint
- Node.js

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/gestion-documental.git
```

2. Instala las dependencias:

```bash
cd gestion-documental
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## 🔧 Configuración

### Requisitos del Sistema

- Node.js 16.0 o superior
- npm 7.0 o superior

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_APP_TITLE=Gestión Documental
VITE_API_URL=tu-api-url
```

## 📚 Estructura del Proyecto

```
gestion-documental/
├── src/
│   ├── components/         # Componentes React
│   │   ├── DocumentForm/   # Formulario de documentos
│   │   ├── DocumentTable/  # Tabla de documentos
│   │   └── DocumentFilters/# Filtros de búsqueda
│   ├── hooks/             # Custom hooks
│   ├── types/             # Tipos TypeScript
│   ├── utils/             # Utilidades
│   └── App.tsx            # Componente principal
├── public/                # Archivos estáticos
└── docs/                  # Documentación
```

## 💻 Uso

### Crear un Nuevo Documento

1. Haz clic en el botón "Nuevo Documento"
2. Completa los campos requeridos:
   - Nombre del documento
   - Tipo (PDF, Word, Imagen)
   - Categoría y Subcategoría
   - Descripción
   - Estado
3. Haz clic en "Crear Documento"

### Filtrar Documentos

1. Utiliza la barra de búsqueda para búsquedas por texto
2. Usa el botón de filtros para:
   - Filtrar por tipo
   - Filtrar por categoría
   - Filtrar por estado

### Cambiar Vista

- Alterna entre vista de lista y cuadrícula usando el botón de cambio de vista

## 🎨 Personalización

### Temas

El sistema utiliza el sistema de temas de Material-UI. Para modificar el tema:

```typescript
// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    // ... más configuraciones
  },
});
```

### Estilos

Los componentes utilizan el sistema de estilos de Material-UI con mejoras visuales:

- Efectos de glassmorphism
- Gradientes
- Sombras personalizadas
- Animaciones y transiciones

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✨ Mejoras Futuras

- [ ] Implementar sistema de autenticación
- [ ] Agregar previsualización de documentos
- [ ] Integrar sistema de notificaciones
- [ ] Añadir soporte para más tipos de documentos
- [ ] Implementar sistema de etiquetas personalizadas
- [ ] Agregar reportes y estadísticas
- [ ] Mejorar la accesibilidad
- [ ] Añadir modo oscuro
- [ ] Implementar sistema de respaldo automático

## 👥 Autores

- **Tu Nombre** - _Desarrollo inicial_ - [tu-usuario](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- Material-UI por su excelente biblioteca de componentes
- La comunidad de React por sus contribuciones
- Todos los contribuidores que han participado en este proyecto

---

⌨️ con ❤️ por [tu-nombre](https://github.com/tu-usuario)
