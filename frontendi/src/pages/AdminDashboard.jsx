import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";
import SideBarComponent from "../components/SideBarComponent.jsx";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { loginUser, role, accessToken } = useAuth();
    const handleLogout = () => {
        // You can clear sessionStorage or cookies here
        // Remove token and role from both sessionStorage and localStorage
        console.log("U shtyp logout!!!!")
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('role');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        console.log("Sesion storage:", sessionStorage);
        console.log("Sesion storage:", localStorage);
        // Optional: Clear all session data, in case there are other session-related items
        sessionStorage.clear();
        console.log("Sesion storage:", sessionStorage)
        // Redirect to the login page
        window.location.href = '/login';  // Correct redirection
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: 250, borderRight: '1px solid #ddd' }}>
                <SideBarComponent /> {/* Add Sidebar here */}
            </Box>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                    {role} Dashboard
                </Typography>
                <Typography variant="body1">
                    Here you can manage the system, user accounts, and settings.
                </Typography>
                <Button onClick={handleLogout} variant="contained" color="primary" sx={{ mt: 3 }}>
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
