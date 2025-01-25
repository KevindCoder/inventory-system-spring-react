import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.js";
import {useAuth} from "../context/AuthContext.jsx"; // Import the login function from auth.js

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUser, role, accessToken } = useAuth(); // Access loginUser and role from context
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const  role1 = await loginUser(username, password);
      console.log(role,"rolelelele",loginUser,"loginuser",accessToken,"acestoken")
      // Login using the context function
      console.log("Role eshte: ", role1);
      // Redirect based on role
      if (role === "ROLE_ADMIN") {

        navigate("/admin/dashboard");
      } else if (role === "ROLE_MANAGER") {
        navigate("/manager/dashboard");
      } else {
        navigate("/unathorized");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8 }}>
          <Typography variant="h5">Login</Typography>

          {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 20 }}>
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
            />
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
