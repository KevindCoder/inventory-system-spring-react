import React from 'react'
import ReactDOM from 'react-dom/client' // React 18 import
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root')) // Create root element
root.render(
  <BrowserRouter>
    {' '}
    {/* Wrap your app with BrowserRouter */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
