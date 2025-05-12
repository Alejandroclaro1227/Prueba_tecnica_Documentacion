import { useLocalStorage } from './useLocalStorage';
import type { Document, CategoryType, DocumentType } from '../types/document';
import { v4 as uuidv4 } from 'uuid';

interface UseDocumentsReturn {
  documents: Document[];
  addDocument: (document: Omit<Document, 'id' | 'fechaSubida'>) => void;
  updateDocument: (document: Document) => void;
  deleteDocument: (id: string) => void;
  filteredDocuments: (categoria?: CategoryType, subcategoria?: string, tipo?: DocumentType) => Document[];
}

export function useDocuments(): UseDocumentsReturn {
  const [documents, setDocuments] = useLocalStorage<Document[]>('documents', []);

  const addDocument = (document: Omit<Document, 'id' | 'fechaSubida'>) => {
    const newDocument: Document = {
      ...document,
      id: uuidv4(),
      fechaSubida: new Date().toISOString()
    };
    setDocuments([...documents, newDocument]);
  };

  const updateDocument = (updatedDocument: Document) => {
    setDocuments(documents.map(doc => 
      doc.id === updatedDocument.id ? updatedDocument : doc
    ));
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const filteredDocuments = (categoria?: CategoryType, subcategoria?: string, tipo?: DocumentType) => {
    return documents.filter(doc => {
      const matchCategoria = !categoria || doc.categoria === categoria;
      const matchSubcategoria = !subcategoria || doc.subcategoria === subcategoria;
      const matchTipo = !tipo || doc.tipo === tipo;
      return matchCategoria && matchSubcategoria && matchTipo;
    });
  };

  return {
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
    filteredDocuments
  };
} 