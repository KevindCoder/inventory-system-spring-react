import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Dashboard/Home'
import Customers from '../pages/Dashboard/Customers'
import UsersManagment from '../pages/Dashboard/UsersManagment.jsx'

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/users" element={<UsersManagment />} />
      {/* Add a wildcard route for unmatched paths */}
      {/*<Route path="*" element={<Navigate replace to="/admin" />} />*/}
    </Routes>
  )
}

export default DashboardRoutes
