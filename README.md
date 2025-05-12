# Sistema de Gestión Documental

Sistema moderno de gestión documental desarrollado con React, TypeScript y Material-UI. Esta aplicación fue desarrollada como parte de una prueba técnica, cumpliendo con todos los requisitos especificados. 😁

## 📸 Diseño de Referencia

![Diseño de Referencia](./src/img/prueba_tecnica.jfif)

_Imagen de referencia utilizada para el desarrollo de la interfaz_

## 📋 Requisitos Cumplidos

### 1. Modelo de Datos

Se implementó el siguiente modelo de datos para los documentos:

```typescript
interface Document {
  id: string; // Identificador único
  nombre: string; // Nombre del documento
  tipo: "PDF" | "Word" | "Imagen"; // Tipo de documento
  fechaSubida: string; // Fecha en formato ISO
  estado: "activo" | "inactivo"; // Estado del documento
  descripcion: string; // Descripción detallada
  categoria: CategoryType; // Categoría principal
  subcategoria: string; // Subcategoría dependiente
}
```

### 2. Componentes Principales

#### 📄 DocumentForm (`src/components/DocumentForm.tsx`)

Formulario principal para la creación y edición de documentos.

**Características implementadas:**

- Campos validados para toda la información requerida
- Selección de tipo de documento (PDF, Word, Imagen)
- Categorización jerárquica (Categoría → Subcategoría)
- Sistema de estados (Activo/Inactivo)
- Diseño moderno con efectos visuales avanzados
- Manejo de estados con React Hooks
- Validación de tipos con TypeScript

**Mejoras visuales:**

- Efectos de glassmorphism en campos
- Gradientes en encabezados
- Animaciones y transiciones suaves
- Feedback visual en interacciones
- Diseño responsivo

#### 📋 DocumentTable (`src/components/DocumentTable.tsx`)

Tabla de visualización de documentos con funcionalidades avanzadas.

**Características implementadas:**

- Vista en modo lista y cuadrícula
- Ordenamiento por columnas
- Acciones rápidas (editar/eliminar)
- Paginación integrada
- Visualización de estados
- Iconos según tipo de documento

#### 🔍 DocumentFilters (`src/components/DocumentFilters.tsx`)

Sistema de filtros para búsqueda avanzada.

**Características implementadas:**

- Filtrado por tipo de documento
- Filtrado por categoría
- Filtrado por estado
- Búsqueda por texto
- Filtros combinados

### 3. Gestión de Estado

#### 🎣 Custom Hooks (`src/hooks/useDocuments.ts`)

```typescript
const useDocuments = () => {
// Gestión de documentos
const addDocument = (doc: DocumentData) => { ... }
const updateDocument = (doc: Document) => { ... }
const deleteDocument = (id: string) => { ... }
const filteredDocuments = (filters: FilterOptions) => { ... }
}
```

### 4. Sistema de Tipos (`src/types/document.ts`)

```typescript
// Tipos de documentos soportados
export type DocumentType = "PDF" | "Word" | "Imagen";

// Categorías principales
export type CategoryType = "Administrativo" | "Financiero" | "Legal";

// Mapeo de subcategorías
export const SUBCATEGORIES: Record<CategoryType, string[]> = {
  Administrativo: ["Acta", "Memorando", "Circular", "Resolución"],
  Financiero: ["Factura", "Recibo", "Balance", "Estado Financiero"],
  Legal: ["Contrato", "Poder", "Demanda", "Sentencia"],
};
```

### 5. Interfaz Principal (`src/App.tsx`)

**Características implementadas:**

- Barra de navegación responsiva
- Búsqueda integrada
- Cambio de vista (lista/cuadrícula)
- Gestión de estado global
- Manejo de diálogos modales
- Sistema de notificaciones

### 6. Estilos y Temas

#### 🎨 Sistema de Temas

```typescript
// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  // Configuraciones adicionales...
});
```

### 7. Mejoras Técnicas Implementadas

#### Rendimiento

- Lazy loading de componentes
- Memoización de funciones y componentes
- Optimización de re-renders
- Gestión eficiente de memoria

#### Seguridad

- Validación de tipos estricta
- Sanitización de inputs
- Manejo seguro de datos

#### Accesibilidad

- Etiquetas ARIA
- Navegación por teclado
- Contraste de colores adecuado
- Textos alternativos

## 🚀 Instrucciones de Uso

### Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/gestion-documental.git

# Instalar dependencias
cd gestion-documental
npm install

# Iniciar en desarrollo
npm run dev

# Construir para producción
npm run build
```

### Scripts Disponibles

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}
```

## 📚 Estructura de Archivos

```
gestion-documental/
├── src/
│   ├── components/
│   │   ├── DocumentForm/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── DocumentTable/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── DocumentFilters/
│   │       ├── index.tsx
│   │       └── styles.ts
│   ├── hooks/
│   │   └── useDocuments.ts
│   ├── types/
│   │   └── document.ts
│   ├── theme/
│   │   └── index.ts
│   └── App.tsx
├── public/
└── package.json
```

## 🔍 Detalles de Implementación

### Formulario de Documentos

- Implementación de formulario controlado
- Validación en tiempo real
- Manejo de estados dependientes
- Feedback visual inmediato
- Gestión de errores

### Sistema de Filtros

- Búsqueda instantánea
- Filtros combinados
- Estado persistente
- Optimización de rendimiento

### Visualización de Datos

- Ordenamiento personalizable
- Paginación eficiente
- Cambio de vistas
- Acciones contextuales

## 🎯 Objetivos Cumplidos

✅ Implementación completa del modelo de datos
✅ Interfaz de usuario moderna y responsiva
✅ Sistema de categorización jerárquico
✅ Gestión de estados y tipos de documentos
✅ Filtros y búsqueda avanzada
✅ Código limpio y mantenible
✅ Documentación completa

## 🛠️ Tecnologías Utilizadas

- React 18
- TypeScript 5
- Material-UI v5
- Vite
- ESLint
- Prettier

## 👥 Autor

- **Alejandro** - _Desarrollo completo_ - [GitHub](https://github.com/tu-usuario)

---

⌨️ con ❤️ por [Alejandro](https://github.com/tu-usuario)
