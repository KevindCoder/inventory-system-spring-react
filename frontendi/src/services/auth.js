import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/auth";

// Function to handle login
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });

        if (response.status === 200) {
            const { accessToken } = response.data;
            const decodedToken = jwtDecode(accessToken);

            // Extract the roles directly from the token
            const roles = decodedToken.roles || [];  // Default to an empty array if no roles found
            const role = roles.length > 0 ? roles[0] : null;  // Get the first role or null

            // Save token and role to sessionStorage
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("role", role);

            return { accessToken, role }; // Return the response for further usage if needed
        } else {
            throw new Error("Login failed");
        }
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// Function to check if the user is logged in
export const isLoggedIn = () => {
    const token = sessionStorage.getItem("accessToken");
    return token !== null;
};

// Function to get the logged-in user's role
export const getRole = () => {
    return sessionStorage.getItem("role");
};

// Function to logout
export const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("role");
};

// Function to get the stored token (if needed for authorization)
export const getToken = () => {
    return sessionStorage.getItem("accessToken");
};
