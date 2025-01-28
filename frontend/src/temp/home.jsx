import {
  BoxArrowUpRight,
  PeopleFill,
  InfoCircle,
  ArrowRight,
} from 'react-bootstrap-icons'
import {
  CheckCircle,
  DoneAll,
  HourglassEmpty,
  LocalShipping,
} from '@mui/icons-material'
import { Cancel } from 'axios'
import { muiBlueTheme } from '../utils/mui/themes.js'
import ErrorIcon from '@mui/icons-material/Error'
import { Line, Pie } from 'react-chartjs-2'
import { useTheme } from '@mui/material/styles'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  Title,
  LineElement,
} from 'chart.js'
import { Typography } from '@mui/material'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  Title,
  LineElement
)

function createData(number, name, quantity, status, total) {
  return { number, name, quantity, status, total }
}

export const homeTableRows = [
  createData(192737, 'Camera Lens', 32, 'Approved', '98612.30'),
  createData(273453, 'Keyboard', 15, 'Approved', '47500.00'),
  createData(188736, 'Chair', 85, 'Pending', '103456.50'),
  createData(103645, 'Headset', 7, 'Approved', '8200.99'),
  createData(365168, 'Mouse', 12, 'Rejected', '16400.00'),
  createData(423742, 'Desktop', 24, 'Pending', '21050.32'),
  createData(983893, 'Computer Accessories', 61, 'Pending', '34640.00'),
]

//Kartat me statusat e orderave
export function summaryStatusOrders(status, totalOrders) {
  return {
    status,
    totalOrders,
  }
}

//tabela me produktet me te shitura
export function mostSoldProductsTable(
  productName,
  productPrice,
  totalQuantitySold,
  totalSoldAmount
) {
  return {
    productName,
    productPrice,
    totalQuantitySold,
    totalSoldAmount,
  }
}

//Pie Chart per shitje sipas qyteteteve
export function percentageSoldPerCityData(city, percentageSold) {
  return {
    city,
    percentageSold,
  }
}

export const PieChart = ({ data }) => {
  const theme = useTheme() // Access the theme

  const chartData = {
    labels: data.map((item) => item.city), // Extract city names
    datasets: [
      {
        label: 'Shitjet sipas qyteteve',
        data: data.map((item) => item.percentageSold), // Extract percentages
        backgroundColor: [
          muiBlueTheme.palette.error.main, // Primary color
          muiBlueTheme.palette.success.main, // Light primary color
          theme.palette.primary.dark, // Dark primary color
          theme.palette.warning.main, // Warning color
          theme.palette.error.main, // Error color
        ],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', // Display legend at the top
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const percentage = tooltipItem.raw
            return `${percentage}%`
          },
        },
      },
    },
  }

  return <Pie data={chartData} options={chartOptions} />
}

export const statusColors = {
  INVOICED: muiBlueTheme.palette.primary.light, // Lighter blue
  SHIPPED: muiBlueTheme.palette.primary.main, // Main blue
  REJECTED: muiBlueTheme.palette.error.main, // Error red
  DELIVERED: muiBlueTheme.palette.primary.dark, // Dark blue
  PICKED: muiBlueTheme.palette.warning.main, // Warning yellow
}

export const statusIcons = {
  SHIPPED: <LocalShipping />,
  REJECTED: <Cancel />,
  DELIVERED: <DoneAll />,
  PICKED: <CheckCircle />,
}

export const homeShortcutItems = [
  {
    title: 'Help Center',
    cardIcon: <InfoCircle style={{ width: '1.1rem', height: '1.1rem' }} />,
    subtitle: 'Need help figuring things out?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    buttonTitle: 'Help Center',
    buttonIcon: (
      <BoxArrowUpRight
        style={{
          width: '1.3rem',
          height: '1rem',
          paddingLeft: '.3rem',
        }}
      />
    ),
  },
  {
    title: 'Contacts',
    cardIcon: <PeopleFill style={{ width: '1.1rem', height: '1.1rem' }} />,
    subtitle: 'Contacts allow you to manage your company contracts',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    buttonTitle: 'My Contacts',
    buttonIcon: (
      <ArrowRight
        style={{
          width: '1.3rem',
          height: '1rem',
          paddingLeft: '.3rem',
        }}
      />
    ),
  },
]

//LineCHart per shitjet e kesaj jave dhe javes me pare

export const LineChart = ({ data, height, width }) => {
  const getChartData = (data) => {
    // Format data for Chart.js
    const labels = data.map((item) =>
      new Date(item.saleDate).toLocaleDateString('en-US', { weekday: 'short' })
    )
    const sales = data.map((item) => item.totalSold)

    return {
      labels: labels,
      salesData: sales, // Store sales data separately for reuse
    }
  }

  const chartDataCurrentWeek = getChartData(data.currentWeek)
  const chartDataPastWeek = getChartData(data.pastWeek)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  const mergedData = {
    labels: chartDataCurrentWeek.labels,
    datasets: [
      {
        label: 'Shitjet e kesaj jave',
        data: chartDataCurrentWeek.salesData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Shitjet e nje jave me pare',
        data: chartDataPastWeek.salesData,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div>
      <Typography align={'center'}>Shitjet e javes</Typography>
      <Line data={mergedData} options={options} height={height} width={width} />
    </div>
  )
}
