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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import PageTitle from '../../components/widgets/PageTitle'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext.jsx'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function ProvidersManagment() {
  const { accessToken } = useAuth()
  const [providers, setProviders] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(true)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const [open, setOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)
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
    // Fetch providers from API on component mount
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/providers', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setProviders(response.data)
      } catch (error) {
        console.error('Error fetching providers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProviders()
  }, [accessToken])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleDeleteProvider = async (providerId) => {
    try {
      await axios.delete(`http://localhost:8080/providers/${providerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setProviders((prevProviders) =>
        prevProviders.filter((provider) => provider.providerId !== providerId)
      )
      setSnackbarMessage('Provider deleted successfully!')
      setSeverity('success')
      setOpen(true)
    } catch (error) {
      console.error('Error deleting provider:', error)
      setSnackbarMessage('Failed to delete provider.')
      setSeverity('error')
      setOpen(true)
    }
  }

  const handleUpdateProvider = async (providerId, updatedProvider) => {
    try {
      await axios.put(
        `http://localhost:8080/providers/${providerId}`,
        updatedProvider,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setProviders((prevProviders) =>
        prevProviders.map((provider) =>
          provider.providerId === providerId ? updatedProvider : provider
        )
      )
      setSnackbarMessage('Provider updated successfully!')
      setSeverity('success')
      setOpen(true)
    } catch (error) {
      console.error('Error updating provider:', error)
      setSnackbarMessage('Failed to update provider.')
      setSeverity('error')
      setOpen(true)
    }
  }

  const handleModalOpen = (provider) => {
    setSelectedProvider(provider)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedProvider(null)
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

  const paginatedProviders = providers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageTitle title="Menaxhimi i furnizuesve 🖊️" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Box style={{ borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ padding: '1rem' }}>Lista e furnizuesve</div>
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
                      <StyledTableCell>ID e Furnizuesit</StyledTableCell>
                      <StyledTableCell>Emri</StyledTableCell>
                      <StyledTableCell>Numri i Telefonit</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>Veprime</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedProviders.map((provider, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{provider.providerId}</StyledTableCell>
                        <StyledTableCell>{provider.name}</StyledTableCell>
                        <StyledTableCell>
                          {provider.phoneNumber}
                        </StyledTableCell>
                        <StyledTableCell>{provider.email}</StyledTableCell>
                        <StyledTableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleModalOpen(provider)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              handleDeleteProvider(provider.providerId)
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
                  count={providers.length}
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
          {selectedProvider && (
            <div>
              <h2>Update Provider</h2>
              <TextField
                required
                size="small"
                fullWidth
                style={{ marginBottom: '.1rem' }}
                placeholder="Enter name"
                id="name"
                name="name"
                value={selectedProvider.name}
                onChange={(e) =>
                  setSelectedProvider({
                    ...selectedProvider,
                    name: e.target.value,
                  })
                }
              />
              <TextField
                required
                size="small"
                fullWidth
                style={{ marginBottom: '.1rem' }}
                placeholder="Enter phone number"
                id="phoneNumber"
                name="phoneNumber"
                value={selectedProvider.phoneNumber}
                onChange={(e) =>
                  setSelectedProvider({
                    ...selectedProvider,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <TextField
                required
                size="small"
                fullWidth
                style={{ marginBottom: '.1rem' }}
                placeholder="Enter email"
                id="email"
                name="email"
                value={selectedProvider.email}
                onChange={(e) =>
                  setSelectedProvider({
                    ...selectedProvider,
                    email: e.target.value,
                  })
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleUpdateProvider(
                    selectedProvider.providerId,
                    selectedProvider
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

export default ProvidersManagment
