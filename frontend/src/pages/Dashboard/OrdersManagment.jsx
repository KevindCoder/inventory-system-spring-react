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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import PageTitle from '../../components/widgets/PageTitle'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext.jsx'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { getUsers } from '../../temp/users.jsx'
import { getOrders } from '../../temp/orders.jsx'

function OrdersManagment() {
  const [value, setValue] = useState(new Date())
  const { accessToken } = useAuth()
  const [role, setRole] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const [open, setOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get('http://localhost:8080/orders', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const customersResponse = await axios.get(
          'http://localhost:8080/customers',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        const productsResponse = await axios.get(
          'http://localhost:8080/products',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        console.log(accessToken)
        const parsedOrders = getOrders(JSON.stringify(ordersResponse.data))
        setOrders(parsedOrders)
        setCustomers(customersResponse.data)
        setProducts(productsResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [accessToken])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const handleRoleChange = (event) => {
    setRole(event.target.value)
    setFormData({
      ...formData,
      role: event.target.value,
    })
  }

  const [formData, setFormData] = useState({
    customerId: '',
    orderDetails: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleOrderDetailChange = (index, field, value) => {
    const newOrderDetails = [...formData.orderDetails]
    newOrderDetails[index] = {
      ...newOrderDetails[index],
      [field]: field === 'productQuantity' ? parseInt(value, 10) : value,
    }

    setFormData((prevData) => ({
      ...prevData,
      orderDetails: newOrderDetails,
    }))
  }

  const addOrderDetail = () => {
    setFormData((prevData) => ({
      ...prevData,
      orderDetails: [
        ...prevData.orderDetails,
        { productId: '', productQuantity: 0 },
      ],
    }))
  }

  const removeOrderDetail = (index) => {
    const newOrderDetails = [...formData.orderDetails]
    newOrderDetails.splice(index, 1)

    setFormData((prevData) => ({
      ...prevData,
      orderDetails: newOrderDetails,
    }))
  }

  const handleSubmit = async () => {
    // if (!validateForm()) return

    try {
      console.log('Form Data:', formData)

      // Step 1: Send the order creation request
      const response = await axios.post(
        'http://localhost:8080/orders',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      // Step 2: Extract the orderId from the backend response
      const createdOrder = response.data // Assuming response includes the entire order entity
      const orderId = createdOrder.orderId // Adjust based on your backend response structure

      console.log('Order created successfully with ID:', orderId)

      // Step 3: Add orderId to each orderDetail
      const updatedOrderDetails = formData.orderDetails.map((detail) => ({
        ...detail,
        orderId,
      }))

      // Step 4: Update the state or perform further actions (e.g., logging)
      console.log('Updated Order Details with Order ID:', updatedOrderDetails)

      // Feedback to user
      setSnackbarMessage(`Order created successfully! Order ID: ${orderId}`)
      setSeverity('success')
      setOpen(true)

      // Optionally reset the form after successful creation
      setFormData({ customerId: '', orderDetails: [] })
    } catch (error) {
      console.error('Error:', error)

      // Display backend error message if available
      const errorMessage = error.response?.data?.message || 'An error occurred.'
      setSnackbarMessage(errorMessage)
      setSeverity('error')
      setOpen(true)
    }
  }

  const StyledUserTableCell = styled(TableCell)(({ theme }) => ({
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

  const StyledUserTableRow = styled(TableRow)(({ theme }) => ({
    'td, th': {
      borderColor: '#e5e5e5',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleModalOpen = (order) => {
    setSelectedOrder(order)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedOrder(null)
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/orders/${orderId}?status=${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      )
      setSnackbarMessage('Status updated successfully!')
      setSeverity('success')
      setOpen(true)
    } catch (error) {
      console.error('Error updating status:', error)
      setSnackbarMessage('Failed to update status.')
      setSeverity('error')
      setOpen(true)
    }
  }

  const availableStatuses = [
    'INVOICED',
    'SHIPPED',
    'DELIVERED',
    'PICKED',
    'REJECTED',
  ]

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageTitle title="Order Management 🖊️" />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper>
            <Box style={{ borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ padding: '1rem' }}>Create Order</div>
            </Box>
            <Box component="form" style={{ padding: '.1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.1rem' }}
                >
                  Customer
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  style={{ marginBottom: '.15rem' }}
                >
                  <InputLabel>Customer</InputLabel>
                  <Select
                    value={formData.customerId}
                    onChange={handleInputChange}
                    label="Customer"
                    id="customerId"
                    name="customerId"
                  >
                    {customers.map((customer) => (
                      <MenuItem
                        key={customer.customerId}
                        value={customer.customerId}
                      >
                        {customer.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.1rem' }}
                >
                  Order Details
                </Typography>
                {formData.orderDetails.map((detail, index) => (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <FormControl
                      fullWidth
                      size="small"
                      style={{ marginBottom: '.15rem' }}
                    >
                      <InputLabel>Product</InputLabel>
                      <Select
                        value={detail.productId}
                        onChange={(e) =>
                          handleOrderDetailChange(
                            index,
                            'productId',
                            e.target.value
                          )
                        }
                        label="Product"
                      >
                        {products.map((product) => (
                          <MenuItem
                            key={product.productId}
                            value={product.productId}
                          >
                            {product.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      required
                      size="small"
                      fullWidth
                      style={{ marginBottom: '.1rem' }}
                      placeholder="Enter quantity"
                      id={`productQuantity-${index}`}
                      name="productQuantity"
                      value={detail.productQuantity.toString()}
                      onChange={(e) =>
                        handleOrderDetailChange(
                          index,
                          'productQuantity',
                          e.target.value
                        )
                      }
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeOrderDetail(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addOrderDetail}
                >
                  Add Product
                </Button>
              </div>
            </Box>
            <Button
              variant="contained"
              style={{ marginLeft: '1rem', marginTop: '0.01rem' }}
              onClick={handleSubmit}
            >
              Create Order
            </Button>
          </Paper>
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
        </Grid>

        <Grid item xs={8}>
          <Paper>
            <Box style={{ borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ padding: '1rem' }}>Lista e porosive</div>
            </Box>
            <Box
              display="flex"
              justifyContent="right"
              style={{ borderTop: '1px solid #e5e5e5', padding: '1rem' }}
            >
              {' '}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledUserTableCell>ID Porosie</StyledUserTableCell>
                      <StyledUserTableCell>Emri i Klientit</StyledUserTableCell>
                      <StyledUserTableCell>Numer Telefoni</StyledUserTableCell>
                      <StyledUserTableCell>Email</StyledUserTableCell>
                      <StyledUserTableCell>Status</StyledUserTableCell>
                      <StyledUserTableCell>Shuma totale</StyledUserTableCell>
                      <StyledUserTableCell>Shiko detaje</StyledUserTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedOrders.map((order, index) => (
                      <StyledUserTableRow key={index}>
                        <StyledUserTableCell>
                          {order.orderId}
                        </StyledUserTableCell>
                        <StyledUserTableCell>
                          {order.customer.name}
                        </StyledUserTableCell>
                        <StyledUserTableCell>
                          {order.customer.phoneNumber}
                        </StyledUserTableCell>
                        <StyledUserTableCell>
                          {order.customer.email}
                        </StyledUserTableCell>
                        <StyledUserTableCell>
                          <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                              value={
                                availableStatuses.includes(order.status)
                                  ? order.status
                                  : ''
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  order.orderId,
                                  e.target.value
                                )
                              }
                              label="Status"
                            >
                              {availableStatuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </StyledUserTableCell>
                        <StyledUserTableCell>
                          {order.totalValue}
                        </StyledUserTableCell>
                        <StyledUserTableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleModalOpen(order)}
                          >
                            Kliko
                          </Button>
                        </StyledUserTableCell>
                      </StyledUserTableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={orders.length}
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
          {selectedOrder && (
            <div>
              <h2>Order Details</h2>
              <p>
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </p>
              <p>
                <strong>Customer Name:</strong> {selectedOrder.customer.name}
              </p>
              <p>
                <strong>Phone Number:</strong>{' '}
                {selectedOrder.customer.phoneNumber}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.customer.email}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Total Value:</strong> {selectedOrder.totalValue}
              </p>
              <h3>Order Details</h3>
              <ul>
                {selectedOrder.orderDetails.map((detail) => (
                  <li key={detail.orderDetailId}>
                    {detail.productName} - Quantity: {detail.productQuantity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Box>
      </Modal>
    </LocalizationProvider>
  )
}

export default OrdersManagment
