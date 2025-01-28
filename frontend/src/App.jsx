import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { muiBlueTheme } from './utils/mui/themes'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import { Box, CircularProgress } from '@mui/material'
import { useAuth } from './context/AuthContext.jsx'
import { useEffect, useState } from 'react'

function Unauthorized() {
  return null
}

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { accessToken, role } = useAuth()

  // Debugging accessToken and role
  console.log('ProtectedRoute - AccessToken:', accessToken)
  console.log('ProtectedRoute - Role:', role)

  if (!accessToken) {
    // Not logged in, redirect to login
    console.log('Not authenticated, redirecting to /login')
    return <Navigate to="/login" />
  }

  if (!role) {
    // Role is not loaded yet, show a loading spinner
    console.log('Role is not loaded yet, showing spinner...')
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log(`Role ${role} not allowed, showing Unauthorized screen`)
    return <Unauthorized />
  }

  console.log(`Access granted for role ${role}`)
  return element
}

function App() {
  const { accessToken, role } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(!!accessToken)
    console.log('App - Authentication status:', isAuthenticated)
  }, [accessToken])

  const roleDashboard = role ? `/${role.toLowerCase()}` : '/login'
  console.log('App - Role-based Dashboard path:', roleDashboard)

  return (
    <ThemeProvider theme={muiBlueTheme}>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated && role ? (
                <Navigate to={roleDashboard} replace />
              ) : (
                <Auth />
              )
            }
          />

          {/* Protected Route for Admin */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                element={<Dashboard />}
                allowedRoles={['ADMIN']}
              />
            }
          />

          {/* Protected Route for Manager */}
          <Route
            path="/manager/*"
            element={
              <ProtectedRoute
                element={<Dashboard />}
                allowedRoles={['MANAGER']}
              />
            }
          />

          {/* Protected Route for Employee */}
          <Route
            path="/employee/*"
            element={
              <ProtectedRoute
                element={<Dashboard />}
                allowedRoles={['EMPLOYEE']}
              />
            }
          />

          {/* Other Routes */}
          <Route path="/login" element={<Auth />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
