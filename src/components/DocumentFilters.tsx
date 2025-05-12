import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { Close as CloseIcon, FilterAlt as FilterIcon } from '@mui/icons-material';
import type { Document, CategoryType, DocumentType } from '../types/document';
import { CATEGORIES, SUBCATEGORIES } from '../types/document';

interface DocumentFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: {
    categoria?: CategoryType;
    subcategoria?: string;
    tipo?: DocumentType;
  };
  onFilterChange: (filters: {
    categoria?: CategoryType;
    subcategoria?: string;
    tipo?: DocumentType;
  }) => void;
}

export const DocumentFilters = ({ open, onClose, filters, onFilterChange }: DocumentFiltersProps) => {
  const handleClearFilters = () => {
    onFilterChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <FilterIcon sx={{ color: 'primary.main', fontSize: 20 }} />
        <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
          Filtros
          {activeFiltersCount > 0 && (
            <Chip
              label={activeFiltersCount}
              size="small"
              sx={{
                ml: 1,
                height: 20,
                fontSize: '0.75rem',
                bgcolor: 'primary.main',
                color: 'white'
              }}
            />
          )}
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            ml: 'auto',
            color: 'grey.500',
            '&:hover': { bgcolor: 'grey.100' }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Tipo de Documento</InputLabel>
            <Select
              value={filters.tipo || ''}
              onChange={(e) => onFilterChange({ ...filters, tipo: e.target.value as DocumentType })}
              label="Tipo de Documento"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="PDF">PDF</MenuItem>
              <MenuItem value="Word">Word</MenuItem>
              <MenuItem value="Imagen">Imagen</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Categoría</InputLabel>
            <Select
              value={filters.categoria || ''}
              onChange={(e) => {
                const categoria = e.target.value as CategoryType;
                onFilterChange({
                  ...filters,
                  categoria,
                  subcategoria: undefined
                });
              }}
              label="Categoría"
            >
              <MenuItem value="">Todas</MenuItem>
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl 
            fullWidth 
            size="small" 
            disabled={!filters.categoria}
          >
            <InputLabel>Subcategoría</InputLabel>
            <Select
              value={filters.subcategoria || ''}
              onChange={(e) => onFilterChange({ ...filters, subcategoria: e.target.value })}
              label="Subcategoría"
            >
              <MenuItem value="">Todas</MenuItem>
              {filters.categoria &&
                SUBCATEGORIES[filters.categoria].map((subcategory) => (
                  <MenuItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          pt: 1.5,
          borderTop: '1px solid',
          borderColor: 'grey.200',
          gap: 1
        }}
      >
        <Button
          onClick={handleClearFilters}
          disabled={activeFiltersCount === 0}
          sx={{
            color: 'text.secondary',
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'grey.100'
            }
          }}
        >
          Limpiar filtros
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              bgcolor: 'primary.dark'
            }
          }}
        >
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 