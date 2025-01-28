import { Routes, Route, Navigate } from 'react-router-dom'
import Customers from '../pages/Dashboard/Customers'
import OrdersManagment from '../pages/Dashboard/OrdersManagment.jsx'
import ProvidersManagment from '../pages/Dashboard/ProvidersManagment.jsx'
import ProductsManagment from '../pages/Dashboard/ProductsManagment.jsx'
import { Home } from '@mui/icons-material'

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={<OrdersManagment />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/providers" element={<ProvidersManagment />} />
      <Route path="/products" element={<ProductsManagment />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default EmployeeRoutes
