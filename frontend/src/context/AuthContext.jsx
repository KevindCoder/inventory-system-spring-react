import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode' // Install jwt-decode if you haven't already

// Create context
const AuthContext = createContext()

// Custom hook to use the context

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null)
  const [role, setRole] = useState(null)
  const [username, setUsername] = useState(null)
  // Get accessToken and role from localStorage when the app loads
  useEffect(() => {
    // Check if the accessToken is already in localStorage
    const storedToken = localStorage.getItem('accessToken')
    const currentTime = Date.now() / 1000 // Current time in seconds

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken) // Decode JWT token to get the payload
      const tokenExpiration = decodedToken?.exp // Token expiration time

      // Check if token is expired
      if (tokenExpiration && currentTime > tokenExpiration) {
        console.log('Token expired, logging out...')
        logoutUser() // Log out the user
      } else {
        // If the token is still valid, set the role and username
        setAccessToken(storedToken)
        setRole(decodedToken?.roles ? decodedToken.roles[0] : 'user') // Extract role
        console.log('Token is valid')
        const filtredusername = decodedToken.sub
        setUsername(filtredusername)
      }
    } else {
      console.log('No access token found')
    }
  }, []) // runohet nje here kur komponentja lodohet

  // Login function
  //TODO review loginUser
  const loginUser = async (username, password) => {
    let finalrole = null // Declare it here
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()

      if (data.accessToken) {
        // On success, store the token and role
        localStorage.setItem('accessToken', data.accessToken)

        setAccessToken(data.accessToken)

        const decodedToken = jwtDecode(data.accessToken)
        finalrole = decodedToken.roles[0] || null
        localStorage.setItem('role', finalrole)
        // Access the username from the 'sub' claim// Decode JWT token to get the payload
        setRole(finalrole)
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      console.error('Login failed', error)
      throw error // Rethrow error to be caught in the LoginPage component
    }
    return finalrole // Return finalrole here
  }

  // Logout function
  const logoutUser = () => {
    // Clear the token and role from localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('role')

    // Reset the state
    setAccessToken(null)
    setRole(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, role, loginUser, logoutUser, username }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  return useContext(AuthContext)
}
