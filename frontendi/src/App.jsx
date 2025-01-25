import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Box, CircularProgress, Container} from "@mui/material";
import {getRole, isLoggedIn} from "./services/auth.js";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Unauthorized from "./pages/Unathorized.jsx";
import ManagerDashboard from "./pages/ManagerDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import LoginPage from "./components/LoginPage.jsx";
import {useAuth} from "./context/AuthContext.jsx"; // Adjust path as necessary
const ProtectedRoute = ({element, allowedRoles}) => {
    const {accessToken, role} = useAuth();

    if (!accessToken) {
        // Not logged in, redirect to login
        return <Navigate to="/login"/>;
    }

    if (!role) {
        // Role is not loaded yet, show a loading spinner
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Logged in but unauthorized role
        return <Unauthorized/>;
    }

    return element;
};

const App = () => {
    const {accessToken, role} = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Wait until accessToken is available to update isAuthenticated
        setIsAuthenticated(!!accessToken);
    }, [accessToken]);

    if (!role && isAuthenticated) {
        // Show a loading spinner while role is being fetched
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Router>
            <Container component="main" maxWidth="xs">
                <Routes>
                    {/* Public Route */}
                    <Route
                        path="/login"
                        element={
                            isAuthenticated && role ? (
                                <Navigate to={`/${role.toLowerCase().split("_")[1]}/dashboard`}/>
                            ) : (
                                <LoginPage/>
                            )
                        }
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute element={<AdminDashboard/>} allowedRoles={["ROLE_ADMIN"]}/>
                        }
                    />
                    <Route
                        path="/manager/dashboard"
                        element={
                            <ProtectedRoute element={<ManagerDashboard/>} allowedRoles={["ROLE_MANAGER"]}/>
                        }
                    />
                    <Route
                        path="/employee/dashboard"
                        element={
                            <ProtectedRoute element={<EmployeeDashboard/>} allowedRoles={["ROLE_EMPLOYEE"]}/>
                        }
                    />
                    <Route path="/unathorized"
                           element={
                               <ProtectedRoute element={<Unauthorized/>}/>
                           }
                    />

                {/* Fallback for Unknown Routes */}
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </Container>
</Router>
)
    ;
};

export default App;