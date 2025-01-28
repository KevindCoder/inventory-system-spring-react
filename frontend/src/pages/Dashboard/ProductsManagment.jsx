import { useEffect, useState } from 'react'
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  Modal,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import PageTitle from '../../components/widgets/PageTitle'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext.jsx'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

function ProductsManagment() {
  const { accessToken } = useAuth()
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(true)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    // Fetch products from API on component mount
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [accessToken])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.productId !== productId)
      )
      setSnackbarMessage('Product deleted successfully!')
      setSeverity('success')
      setOpen(true)
    } catch (error) {
      console.error('Error deleting product:', error)
      setSnackbarMessage('Failed to delete product.')
      setSeverity('error')
      setOpen(true)
    }
  }

  const handleUpdateProduct = async (productId, updatedProduct) => {
    try {
      await axios.put(
        `http://localhost:8080/products/${productId}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId ? updatedProduct : product
        )
      )
      setSnackbarMessage('Product updated successfully!')
      setSeverity('success')
      setOpen(true)
    } catch (error) {
      console.error('Error updating product:', error)
      setSnackbarMessage('Failed to update product.')
      setSeverity('error')
      setOpen(true)
    }
  }

  const handleModalOpen = (product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedProduct(null)
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    paddingLeft: '4px',
    paddingRight: '4px',
    'td, th': {
      borderColor: '#e5e5e5',
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      paddingLeft: '6px',
      paddingRight: '6px',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    'td, th': {
      borderColor: '#e5e5e5',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  const paginatedProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageTitle title="Products Management 🖊️" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Box style={{ borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ padding: '1rem' }}>Products List</div>
            </Box>
            <Box
              display="flex"
              justifyContent="right"
              style={{ borderTop: '1px solid #e5e5e5', padding: '1rem' }}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Product ID</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Brand</StyledTableCell>
                      <StyledTableCell>Stock</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell>Weight</StyledTableCell>
                      <StyledTableCell>Category</StyledTableCell>
                      <StyledTableCell>Provider</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedProducts.map((product, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{product.productId}</StyledTableCell>
                        <StyledTableCell>{product.name}</StyledTableCell>
                        <StyledTableCell>{product.brand}</StyledTableCell>
                        <StyledTableCell>{product.stock}</StyledTableCell>
                        <StyledTableCell>{product.price}</StyledTableCell>
                        <StyledTableCell>{product.weight}</StyledTableCell>
                        <StyledTableCell>
                          {product.categoryName}
                        </StyledTableCell>
                        <StyledTableCell>
                          {product.providerName}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleModalOpen(product)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              handleDeleteProduct(product.productId)
                            }
                            style={{ marginLeft: '0.5rem' }}
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{ p: 4, backgroundColor: 'white', margin: 'auto', maxWidth: 600 }}
        >
          {selectedProduct && (
            <div>
              <h2>Update Product</h2>
              <TextField
                required
                size="small"
                fullWidth
                style={{ marginBottom: '.1rem' }}
                placeholder="Enter name"
                id="name"
                name="name"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
              />
              <TextField
                required
                size="small"
                fullWidth
                style={{ marginBottom: '.1rem' }}
                placeholder="Enter brand"
                id="brand"
                name="brand"
                value={selectedProduct.brand}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    brand: e.target.value,
                  })
                }
              />
              <TextField
                required
                size="small"
                fullWidth
                style={{ marginBottom: '.1rem' }}
                placeholder="Enter stock"
                id="stock"
                name="stock"
                value={selectedProduct.stock}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    stock: e.target.value,
                  })
                }
              />
              <TextField
                required
                size="small"
                fullWidth
                style={{ marginBottom: '.1rem' }}
                placeholder="Enter price"
                id="price"
                name="price"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
              />
              <TextField
                required
                size="small"
                fullWidth
                style={{ marginBottom: '.1rem' }}
                placeholder="Enter weight"
                id="weight"
                name="weight"
                value={selectedProduct.weight}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    weight: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                fullWidth
                style={{ marginBottom: '.1rem' }}
                placeholder="Enter category"
                id="categoryName"
                name="categoryName"
                value={selectedProduct.categoryName || ''}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    categoryName: e.target.value,
                  })
                }
              />
              <TextField
                size="small"
                fullWidth
                style={{ marginBottom: '.1rem' }}
                placeholder="Enter provider"
                id="providerName"
                name="providerName"
                value={selectedProduct.providerName || ''}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    providerName: e.target.value,
                  })
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleUpdateProduct(
                    selectedProduct.productId,
                    selectedProduct
                  )
                }
              >
                Update
              </Button>
            </div>
          )}
        </Box>
      </Modal>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  )
}

export default ProductsManagment
