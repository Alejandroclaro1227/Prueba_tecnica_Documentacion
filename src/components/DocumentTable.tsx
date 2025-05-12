import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Menu,
  MenuItem,
  Badge,
  Fade,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Description as DescriptionIcon,
  Article as ArticleIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import type { Document } from '../types/document';

interface DocumentTableProps {
  documents: Document[];
  onEdit: (document: Document) => void;
  onDelete: (document: Document) => void;
  viewMode: 'list' | 'grid';
}

const getDocumentIcon = (tipo: string) => {
  switch (tipo) {
    case 'PDF':
      return <DescriptionIcon sx={{ color: '#e53935' }} />;
    case 'Word':
      return <ArticleIcon sx={{ color: '#1565c0' }} />;
    case 'Imagen':
      return <ImageIcon sx={{ color: '#43a047' }} />;
    default:
      return <DescriptionIcon />;
  }
};

const getStatusColor = (estado: string) => {
  return estado === 'activo' ? '#4caf50' : '#9e9e9e';
};

export const DocumentTable = ({ documents, onEdit, onDelete, viewMode }: DocumentTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, document: Document) => {
    setAnchorEl(event.currentTarget);
    setSelectedDocument(document);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDocument(null);
  };

  const handleEdit = () => {
    if (selectedDocument) {
      onEdit(selectedDocument);
      handleMenuClose();
    }
  };

  const handleDelete = () => {
    if (selectedDocument) {
      onDelete(selectedDocument);
      handleMenuClose();
    }
  };

  if (viewMode === 'grid') {
    return (
      <Grid container spacing={2}>
        {documents.map((document) => (
          <Grid item xs={12} sm={6} md={4} key={document.id}>
            <Card 
              elevation={0}
              sx={{ 
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'grey.50'
                }
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Badge
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        bgcolor: getStatusColor(document.estado),
                        right: 2,
                        top: 2
                      }
                    }}
                  >
                    {getDocumentIcon(document.tipo)}
                  </Badge>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, document)}
                    sx={{ ml: 'auto', mt: -0.5, mr: -1 }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 1,
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: 40
                  }}
                >
                  {document.nombre}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                  <Chip 
                    label={document.categoria}
                    size="small"
                    sx={{ 
                      bgcolor: 'primary.50',
                      color: 'primary.main',
                      fontSize: '0.75rem'
                    }}
                  />
                  <Chip 
                    label={document.subcategoria}
                    size="small"
                    sx={{ 
                      bgcolor: 'grey.100',
                      color: 'grey.700',
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>

                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: 36,
                    fontSize: '0.8125rem'
                  }}
                >
                  {document.descripcion}
                </Typography>

                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    mt: 1.5,
                    color: 'text.secondary',
                    fontSize: '0.75rem'
                  }}
                >
                  Subido el {new Date(document.fechaSubida).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 2, width: '40%' }}>Nombre</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Subcategoría</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="right" sx={{ pr: 2 }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <TableRow 
              key={document.id}
              sx={{ 
                '&:hover': { 
                  bgcolor: 'grey.50'
                }
              }}
            >
              <TableCell 
                sx={{ 
                  pl: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Badge
                  variant="dot"
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: getStatusColor(document.estado),
                      right: 2,
                      top: 2
                    }
                  }}
                >
                  {getDocumentIcon(document.tipo)}
                </Badge>
                <Box>
                  <Typography sx={{ fontWeight: 500 }}>
                    {document.nombre}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Subido el {new Date(document.fechaSubida).toLocaleDateString()}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip 
                  label={document.categoria}
                  size="small"
                  sx={{ 
                    bgcolor: 'primary.50',
                    color: 'primary.main',
                    fontSize: '0.75rem'
                  }}
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={document.subcategoria}
                  size="small"
                  sx={{ 
                    bgcolor: 'grey.100',
                    color: 'grey.700',
                    fontSize: '0.75rem'
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Chip 
                  label={document.estado}
                  size="small"
                  sx={{ 
                    bgcolor: document.estado === 'activo' ? 'success.50' : 'grey.100',
                    color: document.estado === 'activo' ? 'success.main' : 'text.secondary',
                    fontSize: '0.75rem',
                    textTransform: 'capitalize'
                  }}
                />
              </TableCell>
              <TableCell align="right" sx={{ pr: 1 }}>
                <Tooltip title="Editar" arrow>
                  <IconButton 
                    onClick={() => onEdit(document)}
                    size="small"
                    sx={{ 
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.50' }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar" arrow>
                  <IconButton 
                    onClick={() => onDelete(document)}
                    size="small"
                    sx={{ 
                      color: 'error.main',
                      ml: 1,
                      '&:hover': { bgcolor: 'error.50' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            minWidth: 120,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 1,
            mt: 0.5
          }
        }}
      >
        <MenuItem 
          onClick={handleEdit}
          sx={{ 
            py: 1,
            gap: 1.5,
            fontSize: '0.875rem'
          }}
        >
          <EditIcon fontSize="small" sx={{ color: 'primary.main' }} />
          Editar
        </MenuItem>
        <MenuItem 
          onClick={handleDelete}
          sx={{ 
            py: 1,
            gap: 1.5,
            color: 'error.main',
            fontSize: '0.875rem'
          }}
        >
          <DeleteIcon fontSize="small" />
          Eliminar
        </MenuItem>
      </Menu>
    </TableContainer>
  );
}; 