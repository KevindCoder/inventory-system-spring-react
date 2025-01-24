import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // If you're using react-router
import axios from "axios"; // Import axios

const LoginPage = () => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // For redirecting after successful login

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error
        setError(null);

        // Mock login request (replace with your actual authentication logic)
        try {
            // Replace this with actual API call using Axios
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            });

            // Check if login was successful
            if (response.status === 200) {
                // Redirect to dashboard on successful login
                navigate("/dashboard"); // Replace with the actual route you want to redirect to
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message); // Set error if login fails
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 8,
                }}
            >
                <Typography variant="h5">Login</Typography>

                {/* Error Message */}
                {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 20 }}>
                    {/* Username Field */}
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                    />

                    {/* Password Field */}
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;