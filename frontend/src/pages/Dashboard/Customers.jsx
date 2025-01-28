import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Checkbox,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Trash3, Pencil, Search, Plus as PlusIcon } from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import { createCustomerData } from '../../temp/customers'
import PageTitle from '../../components/widgets/PageTitle'
import { useAuth } from '../../context/AuthContext.jsx'
import { AccountCircle } from '@mui/icons-material'

function Users() {
  const theme = useTheme()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { accessToken } = useAuth() // Access token from useAuth context
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:8080/customers', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          const updatedCustomers = data.map((customer) =>
            createCustomerData(
              customer.name,
              customer.phoneNumber,
              customer.email,
              customer.document,
              customer.address,
              customer.state
            )
          )
          setCustomers(updatedCustomers)
        } else {
          console.error('Failed to fetch customers')
        }
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    }

    fetchCustomers()
  }, [accessToken])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    'td, th': {
      borderColor: '#e5e5e5',
    },
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.black,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <PageTitle title="Lista e bleresve🙋‍♀️" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead
                style={{
                  background: '#fafafa',
                  borderTop: '1px solid #e5e5e5',
                  borderBottom: '1px solid #e5e5e5',
                }}
              >
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    style={{ borderBottom: 0 }}
                  ></TableCell>
                  <StyledTableCell
                    style={{ fontWeight: 'bold', borderBottom: 0 }}
                  >
                    Emri/Email
                  </StyledTableCell>
                  <StyledTableCell
                    style={{ fontWeight: 'bold', borderBottom: 0 }}
                    align="left"
                  >
                    Nr. Telefon
                  </StyledTableCell>
                  <StyledTableCell
                    style={{ fontWeight: 'bold', borderBottom: 0 }}
                  >
                    Identifikimi
                  </StyledTableCell>
                  <StyledTableCell
                    style={{ fontWeight: 'bold', borderBottom: 0 }}
                    align="left"
                  >
                    Vendodhja
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((row) => (
                  <StyledTableRow key={row.email}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      padding="checkbox"
                    ></StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Box style={{ display: 'flex' }}>
                        <AccountCircle
                          style={{
                            overflow: 'hidden',
                            width: '2.5rem',
                            height: '2.5rem',
                            marginRight: '1rem',
                            borderRadius: '100%',
                            background: '#f5f5f5',
                          }}
                        />

                        <Box
                          style={{
                            height: '2.5rem',
                            width: '10rem',
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            style={{ fontWeight: 'bold' }}
                          >
                            {row.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            style={{ color: '#888' }}
                          >
                            {row.email}
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.phoneNumber}
                    </StyledTableCell>
                    <StyledTableCell>{row.document}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            marginRight: '.7rem',
                            borderRadius: '100%',
                          }}
                        />
                        <Typography variant="caption">{row.address}</Typography>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <div
              style={{
                width: '100%',
                borderTop: '1px solid #e5e5e5',
                padding: '1rem',
              }}
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default Users
