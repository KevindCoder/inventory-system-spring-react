import {
  BarChartFill,
  GearFill,
  HouseDoorFill,
  PencilFill,
  PeopleFill,
  PersonCircle,
} from 'react-bootstrap-icons'
import { AddBox } from '@mui/icons-material'

export const managerDrawerItems = [
  {
    title: 'Statistika',
    path: '/',
    icon: <BarChartFill />,
  },
  {
    title: 'Bleresit',
    path: '/manager/customers',
    icon: <PeopleFill />,
  },
  {
    title: 'Menaxho userat',
    path: '/manager/users',
    icon: <PencilFill />,
  },
  {
    title: 'Menaxho porosite',
    path: '/manager/orders',
    icon: <AddBox />,
  },
  {
    title: 'Menaxho furnizuesit',
    path: '/manager/providers',
    icon: <AddBox />,
  },
]
