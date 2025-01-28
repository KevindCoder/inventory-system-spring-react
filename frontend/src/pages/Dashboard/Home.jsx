import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { BoxArrowUpRight, InfoCircle } from 'react-bootstrap-icons'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
} from 'victory'
import {
  homeTableRows,
  homeShortcutItems,
  summaryStatusOrders,
  statusIcons,
  statusColors,
  mostSoldProductsTable,
  percentageSoldPerCityData,
  PieChart,
  LineChart,
} from '../../temp/home'
import PageTitle from '../../components/widgets/PageTitle'
import { useAuth } from '../../context/AuthContext.jsx'
import { useEffect, useState } from 'react'

function Home() {
  const theme = useTheme()
  const { accessToken } = useAuth() // Get accessToken from AuthContext

  const [statusStats, setStatusStats] = useState(null)
  const [mostSoldProducts, setMostSoldProducts] = useState(null)
  const [amountSoldStats, setAmountSoldStats] = useState(null)
  const [percentageSoldPerCity, setPercentageSoldPerCity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        }

        const [statusRes, productsRes, amountRes, cityRes] = await Promise.all([
          fetch('http://localhost:8080/dashboard/status-stats', { headers }),
          fetch('http://localhost:8080/dashboard/most-sold-products', {
            headers,
          }),
          fetch('http://localhost:8080/dashboard/amount-sold-stats', {
            headers,
          }),
          fetch('http://localhost:8080/dashboard/percentage-sold-per-city', {
            headers,
          }),
        ])

        if (!statusRes.ok || !productsRes.ok || !amountRes.ok || !cityRes.ok) {
          throw new Error('Failed to fetch data')
        }

        //Karta per statusin e orderave
        const statusData = await statusRes.json()
        // Map data to the summaryStatusOrders format
        const mappedStatusStats = statusData.map((statusItem) =>
          summaryStatusOrders(statusItem.status, statusItem.totalOrders)
        )

        //Tabela per produktet me te shitura
        const productsData = await productsRes.json()
        const mappedProducts = productsData.map((item) =>
          mostSoldProductsTable(
            item.productName,
            item.productPrice,
            item.totalQuantitySold,
            item.totalSoldAmount
          )
        )

        //Pie Chart data
        const cityData = await cityRes.json()
        setPercentageSoldPerCity(cityData)

        const amountData = await amountRes.json()
        setAmountSoldStats(amountData)
        console.log(amountSoldStats, 'stats')
        setStatusStats(mappedStatusStats)
        console.log(mappedStatusStats, 'status')
        setMostSoldProducts(mappedProducts)
        setAmountSoldStats(amountData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (accessToken) {
      fetchData()
    }
  }, [accessToken])

  if (loading) {
    return (
      <Typography variant="h6" color="textSecondary">
        Loading...
      </Typography>
    )
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    )
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    'td, th': {
      borderColor: '#e5e5e5',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  return (
    <>
      <PageTitle title="Dashboardin i statistikave! 👋" />
      <Grid container spacing={3} style={{ marginTop: '2rem' }}>
        {statusStats &&
          statusStats.map((item, index) => (
            <Grid item xs={3.0} key={`summary item ${index}`}>
              <Paper
                sx={{
                  padding: 1,
                  overflow: 'hidden',
                  backgroundColor:
                    statusColors[item.status] || theme.palette.error,
                }}
              >
                <Typography
                  variant="body2"
                  style={{
                    color: 'white',
                    userSelect: 'none',
                  }}
                >
                  {item.status}
                </Typography>
                <Typography
                  noWrap
                  variant="subtitle1"
                  fontWeight="bold"
                  style={{
                    userSelect: 'none',
                    marginTop: '.25rem',
                    color: 'white',
                  }}
                >
                  {item.totalOrders}
                </Typography>
                <Typography
                  noWrap
                  variant="caption"
                  style={{
                    color: '#888',
                    userSelect: 'none',
                    marginTop: '.25rem',
                  }}
                ></Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
      {/* ================================================= */}
      <Grid container spacing={3} style={{ marginTop: '1rem' }}>
        <Grid item xs={6}>
          <Paper sx={{ padding: 2, width: '100%', height: '100%' }}>
            <LineChart data={amountSoldStats} height={270} width={400} />
          </Paper>
        </Grid>
        <Grid item xs={6} sx={{ height: 344 }}>
          <Paper sx={{ padding: 2, width: '100%', height: '100%' }}>
            <PieChart data={percentageSoldPerCity} />
          </Paper>
        </Grid>
      </Grid>
      {/* ============================================= */}

      <Grid container style={{ marginTop: '1rem' }}>
        <Grid item xs={12}>
          <Typography>Permbledhje e shitjeve te produkteve</Typography>
          <TableContainer component={Paper}>
            <Table
              sx={{ width: '100%', height: 80 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ fontWeight: 'bold' }}>
                    Emri i produktit
                  </StyledTableCell>
                  <StyledTableCell style={{ fontWeight: 'bold' }} align="left">
                    Cmimi i Produktit
                  </StyledTableCell>
                  <StyledTableCell style={{ fontWeight: 'bold' }}>
                    Total Shitje
                  </StyledTableCell>
                  <StyledTableCell style={{ fontWeight: 'bold' }} align="left">
                    Fitimi Total
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mostSoldProducts.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.productName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.productPrice} ALL
                    </StyledTableCell>
                    <StyledTableCell>{row.totalQuantitySold}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.totalSoldAmount}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
