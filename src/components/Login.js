import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "admin@example.com" && password === "123456") {
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true"); // Save login state
            navigate("/home");
        } else {
            alert("Invalid Credentials");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: 20, marginTop: 50, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <form onSubmit={handleLogin}>
                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField 
                        label="Password" 
                        type="password" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 10 }}>
                        Login
                    </Button>
                </form>
                <Typography style={{ marginTop: 10 }}>
                    Don't have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/register")}>Register</span>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;
