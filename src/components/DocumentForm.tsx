import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  InputLabel,
  alpha,
} from '@mui/material';
import type { Document, CategoryType } from '../types/document';
import { CATEGORIES, SUBCATEGORIES } from '../types/document';
import { useState, useEffect } from 'react';

interface DocumentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (document: Omit<Document, 'id' | 'fechaSubida'>) => void;
  initialData?: Document;
}

export const DocumentForm = ({ open, onClose, onSubmit, initialData }: DocumentFormProps) => {
  const [formData, setFormData] = useState<Omit<Document, 'id' | 'fechaSubida'>>({
    nombre: '',
    tipo: 'PDF',
    estado: 'activo',
    descripcion: '',
    categoria: 'Administrativo',
    subcategoria: SUBCATEGORIES['Administrativo'][0],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre,
        tipo: initialData.tipo,
        estado: initialData.estado,
        descripcion: initialData.descripcion,
        categoria: initialData.categoria,
        subcategoria: initialData.subcategoria,
      });
    } else {
      setFormData({
        nombre: '',
        tipo: 'PDF',
        estado: 'activo',
        descripcion: '',
        categoria: 'Administrativo',
        subcategoria: SUBCATEGORIES['Administrativo'][0],
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name === 'categoria') {
      setFormData(prev => ({
        ...prev,
        categoria: value as CategoryType,
        subcategoria: SUBCATEGORIES[value as CategoryType][0]
      }));
    } else {
      setFormData(prev => ({ ...prev, [name as string]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          backgroundImage: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            color: 'white',
            p: 2.5,
            fontSize: '1.25rem',
            fontWeight: 600,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            borderBottom: '1px solid',
            borderColor: 'primary.dark',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          Crear Nuevo Documento
        </DialogTitle>

        <DialogContent 
          sx={{ 
            p: 3,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
              '&:hover': {
                background: '#666',
              },
            },
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1, 
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Información General
            </Typography>
            <TextField
              name="nombre"
              placeholder="Nombre del documento"
              fullWidth
              value={formData.nombre}
              onChange={handleChange}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: alpha('#fff', 0.8),
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: alpha('#fff', 0.95),
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                  },
                  '&.Mui-focused': {
                    bgcolor: '#fff',
                    boxShadow: '0 0 0 2px rgba(25,118,210,0.2)',
                  }
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1, 
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Tipo de Documento
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                name="tipo"
                value={formData.tipo}
                onChange={handleSelectChange}
                sx={{
                  bgcolor: alpha('#fff', 0.8),
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: alpha('#fff', 0.95),
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                  },
                  '&.Mui-focused': {
                    bgcolor: '#fff',
                    boxShadow: '0 0 0 2px rgba(25,118,210,0.2)',
                  }
                }}
              >
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="Word">Word</MenuItem>
                <MenuItem value="Imagen">Imagen</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1, 
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Categorización
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleSelectChange}
                  label="Categoría"
                  sx={{
                    bgcolor: alpha('#fff', 0.8),
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.95),
                      boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                    },
                    '&.Mui-focused': {
                      bgcolor: '#fff',
                      boxShadow: '0 0 0 2px rgba(25,118,210,0.2)',
                    }
                  }}
                >
                  {CATEGORIES.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Subcategoría</InputLabel>
                <Select
                  name="subcategoria"
                  value={formData.subcategoria}
                  onChange={handleSelectChange}
                  label="Subcategoría"
                  sx={{
                    bgcolor: alpha('#fff', 0.8),
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.95),
                      boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                    },
                    '&.Mui-focused': {
                      bgcolor: '#fff',
                      boxShadow: '0 0 0 2px rgba(25,118,210,0.2)',
                    }
                  }}
                >
                  {SUBCATEGORIES[formData.categoria].map(subcategory => (
                    <MenuItem key={subcategory} value={subcategory}>{subcategory}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1, 
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Descripción
            </Typography>
            <TextField
              name="descripcion"
              placeholder="Ingrese una descripción detallada del documento"
              multiline
              rows={4}
              fullWidth
              value={formData.descripcion}
              onChange={handleChange}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: alpha('#fff', 0.8),
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: alpha('#fff', 0.95),
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                  },
                  '&.Mui-focused': {
                    bgcolor: '#fff',
                    boxShadow: '0 0 0 2px rgba(25,118,210,0.2)',
                  }
                }
              }}
            />
          </Box>

          <Box>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1, 
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Estado
            </Typography>
            <RadioGroup
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              row
              sx={{
                '& .MuiFormControlLabel-root': {
                  mr: 4,
                  '& .MuiTypography-root': {
                    fontSize: '0.9375rem',
                  }
                }
              }}
            >
              <FormControlLabel
                value="activo"
                control={
                  <Radio 
                    size="small"
                    sx={{
                      color: 'grey.400',
                      '&.Mui-checked': {
                        color: 'primary.main',
                      }
                    }}
                  />
                }
                label={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: formData.estado === 'activo' ? 'primary.main' : 'text.primary',
                      fontWeight: formData.estado === 'activo' ? 600 : 400
                    }}
                  >
                    Activo
                  </Typography>
                }
              />
              <FormControlLabel
                value="inactivo"
                control={
                  <Radio 
                    size="small"
                    sx={{
                      color: 'grey.400',
                      '&.Mui-checked': {
                        color: 'primary.main',
                      }
                    }}
                  />
                }
                label={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: formData.estado === 'inactivo' ? 'primary.main' : 'text.primary',
                      fontWeight: formData.estado === 'inactivo' ? 600 : 400
                    }}
                  >
                    Inactivo
                  </Typography>
                }
              />
            </RadioGroup>
          </Box>
        </DialogContent>

        <DialogActions 
          sx={{ 
            p: 2.5,
            bgcolor: 'grey.50',
            borderTop: '1px solid',
            borderColor: 'grey.200',
            gap: 1
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: 'grey.700',
              borderColor: 'grey.300',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              '&:hover': {
                borderColor: 'grey.400',
                bgcolor: 'grey.50'
              }
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              boxShadow: '0 2px 4px rgba(25,118,210,0.25)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                boxShadow: '0 4px 8px rgba(25,118,210,0.35)'
              }
            }}
          >
            Crear Documento
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 