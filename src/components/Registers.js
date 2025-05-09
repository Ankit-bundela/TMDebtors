import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Registers = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Registering:", email, password);
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/home");
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: 20, marginTop: 50, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>Register</Typography>
                <form onSubmit={handleRegister}>
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
                        Register
                    </Button>
                </form>
                <Typography style={{ marginTop: 10 }}>
                    Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Registers;
