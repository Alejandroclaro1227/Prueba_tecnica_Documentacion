export type DocumentType = 'PDF' | 'Word' | 'Imagen';
export type DocumentStatus = 'activo' | 'inactivo';
export type CategoryType = 'Administrativo' | 'Financiero' | 'Legal';

export interface Document {
  id: string;
  nombre: string;
  tipo: DocumentType;
  fechaSubida: string;
  estado: DocumentStatus;
  descripcion: string;
  categoria: CategoryType;
  subcategoria: string;
}

export const CATEGORIES: CategoryType[] = ['Administrativo', 'Financiero', 'Legal'];

export const SUBCATEGORIES: Record<CategoryType, string[]> = {
  'Administrativo': ['Acta', 'Memorando', 'Circular', 'Resolución'],
  'Financiero': ['Factura', 'Recibo', 'Balance', 'Estado Financiero'],
  'Legal': ['Contrato', 'Poder', 'Demanda', 'Sentencia']
}; 