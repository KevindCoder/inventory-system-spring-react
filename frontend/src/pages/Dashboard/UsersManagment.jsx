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
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import PageTitle from '../../components/widgets/PageTitle'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext.jsx'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { getUsers } from '../../temp/users.jsx'

function UsersManagment() {
  const [value, setValue] = useState(new Date())
  const { accessToken } = useAuth() // State to handle role selection
  const [role, setRole] = useState('') // role state initialized
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success') // 'success' or 'error'
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([]) // State to store the users
  const [page, setPage] = useState(0) // State for the current page
  const [rowsPerPage, setRowsPerPage] = useState(5) // State for rows per page
  const [loading, setLoading] = useState(true)
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to the first page when rows per page changes
  }
  useEffect(() => {
    // Fetch users from API on component mount
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass accessToken as Bearer token
          },
        })
        const mappedUsers = response.data.map((user) =>
          getUsers(user.name, user.username, user.email, user.role)
        )

        setUsers(mappedUsers) // Set the users in state
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false) // Set loading to false after API call
      }
    }

    fetchUsers()
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
    name: '',
    username: '',
    password: '',
    phoneNumber: '',
    email: '',
    role: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // This will update the specific field in formData
    }))
  }

  // Submit form data
  const handleSubmit = async () => {
    try {
      console.log('Data e plotesuara', formData)
      console.log('accessToken', accessToken)
      // Include accessToken in Authorization header
      const response = await axios.post(
        'http://localhost:8080/users',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass accessToken as Bearer token
          },
        }
      )
      console.log('Response:', response.data)
      setSnackbarMessage('Useri u krijua me sukses!')
      setSeverity('success')
      setOpen(true)
    } catch (error) {
      console.error('Error:', error)
      setSnackbarMessage('Nje problem ndodhi.', error)
      setSeverity('error')
      setOpen(true)
    }
  }
  const StyledUserTableCell = styled(TableCell)(({ theme }) => ({
    paddingLeft: '4px', // Smaller horizontal padding
    paddingRight: '4px',
    'td, th': {
      borderColor: '#e5e5e5',
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      paddingLeft: '6px', // Header horizontal padding
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
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageTitle title="Hapesira e perdoruesve 🖊️" />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper>
            <Box style={{ borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ padding: '1rem' }}>Krijo perdorues</div>
            </Box>
            <Box component="form" style={{ padding: '.1rem' }}>
              {/* Name field */}
              <div style={{ marginBottom: '1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.1rem' }}
                >
                  Name
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  style={{ marginBottom: '.1rem' }}
                  placeholder="Enter  name"
                  id="name"
                  name="name"
                  disabled={false}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Username field */}
              <div style={{ marginBottom: '.1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.1rem' }}
                >
                  Username
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  style={{ marginBottom: '.1rem' }}
                  placeholder="Vendos username"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email field */}
              <div style={{ marginBottom: '.1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.1rem' }}
                >
                  Email
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  type="email"
                  style={{ marginBottom: '.1rem' }}
                  placeholder="Enter email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Password field */}
              <div style={{ marginBottom: '.1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Password
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  type="password"
                  style={{ marginBottom: '.15rem' }}
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {/* Role dropdown */}
              <div style={{ marginBottom: '1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Role
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  style={{ marginBottom: '.15rem' }}
                >
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    onChange={handleRoleChange}
                    label="Role"
                    id="role"
                  >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="MANAGER">MANAGER</MenuItem>
                    <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Box>
            <Button
              variant="contained"
              style={{ marginLeft: '1rem', marginTop: '0.01rem' }}
              onClick={handleSubmit} // Handle form submission
            >
              Krijo
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
              <div style={{ padding: '1rem' }}>Lista e perdoruesve</div>
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
                      <StyledUserTableCell>Name</StyledUserTableCell>
                      <StyledUserTableCell>Username</StyledUserTableCell>
                      <StyledUserTableCell>Phone Number</StyledUserTableCell>
                      <StyledUserTableCell>Email</StyledUserTableCell>
                      <StyledUserTableCell>Role</StyledUserTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedUsers.map((user, index) => (
                      <StyledUserTableRow key={index}>
                        <StyledUserTableCell>{user.name}</StyledUserTableCell>
                        <StyledUserTableCell>
                          {user.username}
                        </StyledUserTableCell>
                        <StyledUserTableCell>
                          {user.phoneNumber}
                        </StyledUserTableCell>
                        <StyledUserTableCell>{user.email}</StyledUserTableCell>
                        <StyledUserTableCell>{user.role}</StyledUserTableCell>
                      </StyledUserTableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
                  component="div"
                  count={users.length} // Total number of users
                  rowsPerPage={rowsPerPage} // Number of rows per page
                  page={page} // Current page
                  onPageChange={handleChangePage} // Function to handle page changes
                  onRowsPerPageChange={handleChangeRowsPerPage} // Function to handle rows per page changes
                />
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default UsersManagment
