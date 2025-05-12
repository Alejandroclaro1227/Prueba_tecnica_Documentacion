import { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Fade,
} from '@mui/material'
import {
  Add as AddIcon,
  Description as DescriptionIcon,
  Search as SearchIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material'
import { DocumentTable } from './components/DocumentTable'
import { DocumentForm } from './components/DocumentForm'
import { DocumentFilters } from './components/DocumentFilters'
import { useDocuments } from './hooks/useDocuments'
import type { Document, CategoryType, DocumentType } from './types/document'

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    addDocument,
    updateDocument,
    deleteDocument,
    filteredDocuments,
  } = useDocuments()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | undefined>()
  const [deleteConfirmation, setDeleteConfirmation] = useState<Document | undefined>()
  const [filters, setFilters] = useState<{
    categoria?: CategoryType
    subcategoria?: string
    tipo?: DocumentType
    searchTerm?: string
  }>({})
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const handleAddClick = () => {
    setSelectedDocument(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (document: Document) => {
    setSelectedDocument(document)
    setIsFormOpen(true)
  }

  const handleDeleteClick = (document: Document) => {
    setDeleteConfirmation(document)
  }

  const handleFormSubmit = (documentData: Omit<Document, 'id' | 'fechaSubida'>) => {
    if (selectedDocument) {
      updateDocument({ ...documentData, id: selectedDocument.id, fechaSubida: selectedDocument.fechaSubida })
    } else {
      addDocument(documentData)
    }
    setIsFormOpen(false)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setSelectedDocument(undefined)
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirmation) {
      deleteDocument(deleteConfirmation.id)
      setDeleteConfirmation(undefined)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: event.target.value }))
  }

  const filteredDocumentsList = filteredDocuments(
    filters.categoria,
    filters.subcategoria,
    filters.tipo
  )

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      bgcolor: 'grey.100' 
    }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 64, sm: 70 }, 
          px: { xs: 2, sm: 4 },
          gap: 2
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2 
          }}>
            <DescriptionIcon 
              sx={{ 
                fontSize: { xs: 28, sm: 32 },
                color: 'primary.main'
              }} 
            />
            <Typography 
              variant="h5" 
              component="h1" 
              sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                fontWeight: 700,
                color: 'grey.900',
                letterSpacing: '-0.5px'
              }}
            >
              Gestión Documental
            </Typography>
          </Box>

          <Box sx={{ 
            ml: 'auto', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2 
          }}>
            {!isMobile && (
              <TextField
                placeholder="Buscar documentos..."
                size="small"
                onChange={handleSearchChange}
                value={filters.searchTerm || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'grey.500' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'grey.50',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'grey.200'
                    }
                  }
                }}
                sx={{
                  width: { sm: 220, md: 280 },
                }}
              />
            )}

            <Tooltip title="Cambiar vista" arrow>
              <IconButton 
                onClick={() => setViewMode(prev => prev === 'list' ? 'grid' : 'list')}
                sx={{ 
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  '&:hover': { 
                    bgcolor: 'grey.100',
                    borderColor: 'grey.300'
                  }
                }}
              >
                {viewMode === 'list' ? <ViewModuleIcon /> : <ViewListIcon />}
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              sx={{
                bgcolor: 'primary.main',
                borderRadius: 1,
                textTransform: 'none',
                px: { xs: 2, sm: 3 },
                py: 1,
                fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
              }}
            >
              {isMobile ? 'Nuevo' : 'Nuevo Documento'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1, 
          py: { xs: 3, sm: 4 },
          px: { xs: 2, sm: 4 }
        }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'grey.200',
            bgcolor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 3
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                fontWeight: 600,
                color: 'grey.900'
              }}
            >
              Documentos
              {filteredDocumentsList.length > 0 && (
                <Chip
                  label={filteredDocumentsList.length}
                  size="small"
                  sx={{ 
                    ml: 1.5,
                    bgcolor: 'primary.50',
                    color: 'primary.main',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
              )}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              {isMobile && (
                <Tooltip title="Buscar" arrow>
                  <IconButton 
                    onClick={() => {/* Implementar búsqueda móvil */}}
                    sx={{ 
                      bgcolor: 'grey.50',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      '&:hover': { 
                        bgcolor: 'grey.100',
                        borderColor: 'grey.300'
                      }
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Filtros" arrow>
                <IconButton 
                  onClick={() => setIsFilterOpen(true)}
                  sx={{ 
                    bgcolor: activeFiltersCount > 0 ? 'primary.50' : 'grey.50',
                    border: '1px solid',
                    borderColor: activeFiltersCount > 0 ? 'primary.200' : 'grey.200',
                    color: activeFiltersCount > 0 ? 'primary.main' : 'grey.700',
                    '&:hover': { 
                      bgcolor: activeFiltersCount > 0 ? 'primary.100' : 'grey.100',
                      borderColor: activeFiltersCount > 0 ? 'primary.300' : 'grey.300'
                    }
                  }}
                >
                  <FilterListIcon />
                  {activeFiltersCount > 0 && (
                    <Chip
                      label={activeFiltersCount}
                      size="small"
                      sx={{ 
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        height: 18,
                        minWidth: 18,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        bgcolor: 'primary.main',
                        color: 'white'
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <DocumentTable
            documents={filteredDocumentsList}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            viewMode={viewMode}
          />
        </Paper>
      </Container>

      <DocumentForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={selectedDocument}
      />

      <Dialog
        open={Boolean(deleteConfirmation)}
        onClose={() => setDeleteConfirmation(undefined)}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 400
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Confirmar Eliminación
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            ¿Está seguro que desea eliminar el documento "{deleteConfirmation?.nombre}"? Esta acción no se puede deshacer.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button 
              onClick={() => setDeleteConfirmation(undefined)}
              variant="outlined"
              sx={{ 
                borderRadius: 1,
                textTransform: 'none',
                borderColor: 'grey.300',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'grey.400',
                  bgcolor: 'grey.50'
                }
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              sx={{ 
                borderRadius: 1,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  bgcolor: 'error.dark'
                }
              }}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </Dialog>

      <DocumentFilters
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </Box>
  )
}

export default App
