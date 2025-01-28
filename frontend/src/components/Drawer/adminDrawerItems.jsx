import {
  PersonCircle,
  BarChartFill,
  PeopleFill,
  HouseDoorFill,
  GearFill,
  PencilFill,
} from 'react-bootstrap-icons'

export const adminDrawerItems = [
  {
    title: 'Statistika',
    path: '/',
    icon: <BarChartFill />,
  },
  {
    title: 'Bleresit',
    path: '/admin/customers',
    icon: <PeopleFill />,
  },
  {
    title: 'Menaxho userat',
    path: '/admin/users',
    icon: <PencilFill />,
  },
  // {
  //   title: 'Charts',
  //   path: '/admin/charts',
  //   icon: <BarChartFill />,
  // },
  // {
  //   title: 'Profile',
  //   path: '/admin/profile',
  //   icon: <PersonCircle />,
  // },
  // {
  //   title: 'Settings',
  //   path: '/admin/settings',
  //   icon: <GearFill />,
  // },
]
