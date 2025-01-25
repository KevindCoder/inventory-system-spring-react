import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
    const navigate = useNavigate();

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
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome Manager Dashboard
            </Typography>
            <Typography variant="body1">
                As a manager, you can oversee employee performance and reports.
            </Typography>
            <Button onClick={handleLogout} variant="contained" color="primary" sx={{ mt: 3 }}>
                Logout
            </Button>
        </Box>
    );
};

export default ManagerDashboard;
