import {
  HouseDoorFill,
  InfoCircleFill,
  PencilFill,
  PersonCircle,
} from 'react-bootstrap-icons'
import { ListItemAvatar } from '@mui/material'
import { AddBox } from '@mui/icons-material'

export const employeeDrawerItems = [
  {
    title: 'Statistika',
    path: '/',
    icon: <HouseDoorFill />,
  },
  {
    title: 'Bleresit',
    path: '/employee/customers',
    icon: <ListItemAvatar />,
  },
  {
    title: 'Menaxho porosite',
    path: '/employee/orders',
    icon: <AddBox />,
  },
  {
    title: 'Menaxho furnizuesit',
    path: '/employee/providers',
    icon: <AddBox />,
  },
  {
    title: 'Menaxho produktet',
    path: '/employee/products',
    icon: <AddBox />,
  },
]
