import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Dashboard/Home'
import Customers from '../pages/Dashboard/Customers'
import UsersManagment from '../pages/Dashboard/UsersManagment.jsx'
import OrdersManagment from '../pages/Dashboard/OrdersManagment.jsx'
import ProvidersManagment from '../pages/Dashboard/ProvidersManagment.jsx'

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/users" element={<UsersManagment />} />
      <Route path="/orders" element={<OrdersManagment />} />
      <Route path="/providers" element={<ProvidersManagment />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default ManagerRoutes
