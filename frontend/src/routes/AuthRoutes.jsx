import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Authenticate/Login'
import PasswordReset from '../pages/Authenticate/PasswordReset'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AuthRoutes
