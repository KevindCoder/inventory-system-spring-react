import { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Avatar, Grid, Menu, MenuItem } from '@mui/material'
import { adminDrawerItems } from '../components/Drawer/adminDrawerItems.jsx'
import appLogo from '../assets/logo.svg'
import DashboardRoutes from '../routes/DashboardRoutes'
import avatar1 from '../assets/avatars/image-29.png'
import { managerDrawerItems } from '../components/Drawer/managerDrawerItems.jsx'
import { employeeDrawerItems } from '../components/Drawer/employeeDrawerItems.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { Logout, Notifications, PersonRounded } from '@mui/icons-material'
import ManagerRoutes from '../routes/ManagerRoutes.jsx'
import EmployeeRoutes from '../routes/EmployeeRoutes.jsx'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: '60px', // or another smaller value
    [theme.breakpoints.up('sm')]: {
      width: '80px', // or another smaller value for larger screens
    },
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  border: 'none',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const roleBasedDrawerItems = (role) => {
  console.log('Provided Role:', role)

  switch (role) {
    case 'ADMIN':
      return adminDrawerItems
    case 'MANAGER':
      return managerDrawerItems
    case 'EMPLOYEE':
      return employeeDrawerItems
    default:
      console.warn('Role not matched. Returning empty drawer items.')
      return []
  }
}

const renderRoutes = (role) => {
  switch (role) {
    case 'ADMIN':
      return <DashboardRoutes />
    case 'MANAGER':
      return <ManagerRoutes />
    case 'EMPLOYEE':
      return <EmployeeRoutes />
    default:
      return null
  }
}

function Dashboard() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [currentUserTitle, setCurrentUserTitle] = useState(null)
  const { role, username, logoutUser } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null) // Anchor for the menu

  const toggleDrawerOpen = () => {
    setOpen(!open)
    console.log('Toggling Drawer:', open ? 'Opening' : 'Closing')
  }
  const drawerItems = roleBasedDrawerItems(role)

  const handleDrawerItemClick = (path) => {
    console.log('pathi', path)
    navigate(path)
  }

  // Open and close menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Handle Logout
  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  useEffect(() => {
    if (username) {
      setCurrentUserTitle(`Welcome, ${username}`)
    }
  }, [username]) // Update title when username is set

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'white',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawerOpen}
            edge="start"
            sx={{ marginRight: 4 }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={appLogo}
            draggable={false}
            style={{ width: '9rem', height: '1.5rem' }}
            alt="app logo"
          />
          <Box
            sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="subtitle2" sx={{ pr: 2 }}>
              {currentUserTitle || 'Loading...'}
            </Typography>
            <Avatar onClick={handleMenuOpen} sx={{ cursor: 'pointer' }} />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              aria-hidden={!Boolean(anchorEl)}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Notifications sx={{ marginRight: 1 }} />
                Notifications
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ marginRight: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />

        <List>
          {drawerItems.map((item, index) => (
            <ListItemButton
              sx={{ px: 3 }}
              onClick={() => handleDrawerItemClick(item.path)}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.primary.main,
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 3,
          width: '100%',
        }}
      >
        {role === 'ADMIN' && <DashboardRoutes />}
        {role === 'MANAGER' && <ManagerRoutes />}
        {role === 'EMPLOYEE' && <EmployeeRoutes />}
      </Box>
    </Box>
  )
}

export default Dashboard
