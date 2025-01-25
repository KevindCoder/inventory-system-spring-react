import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Install jwt-decode if you haven't already

// Create context
const AuthContext = createContext();

// Custom hook to use the context

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [role, setRole] = useState(null);

    // Get accessToken and role from localStorage when the app loads
    useEffect(() => {
        // Check if the accessToken is already in localStorage
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setAccessToken(storedToken);
            const decodedToken = jwtDecode(storedToken); // Decode JWT token to get the payload
            setRole(decodedToken?.roles ? decodedToken.roles[0] : "dasdfasf"); // Extract the role from the token
            console.log(decodedToken?.roles[0]);
            console.log("u fut ne useEffect tek AuthContext")
        }
    }, [accessToken]);

    // Login function
    //TODO review loginUser
    const loginUser = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            if (data.accessToken) {
                // On success, store the token and role
                localStorage.setItem('accessToken', data.accessToken);

                setAccessToken(data.accessToken);

                const decodedToken = jwtDecode(data.accessToken);
                const finalrole = decodedToken.roles[0] || null;
                localStorage.setItem('role', finalrole);// Decode JWT token to get the payload
                setRole(finalrole);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login failed', error);
            throw error; // Rethrow error to be caught in the LoginPage component
        }
        return finalrole;
    };

    return (
        <AuthContext.Provider value={{ accessToken, role, loginUser }}>
            {children}
        </AuthContext.Provider>
    );



};
export const useAuth = () => {
    return useContext(AuthContext);
};