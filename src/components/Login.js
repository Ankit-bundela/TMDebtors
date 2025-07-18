/*import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import TMAlert from "./TMAlert";

const Login = ({setUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/"); // Already logged in
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5050/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAlert({ open: true, message: "Login successful!", severity: "success" });

        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/");

        // Redirect after showing success alert
        setTimeout(() => {
          navigate("/");
        }, 1200);
      } else {
        setAlert({
          open: true,
          message: data.error || "Login failed. Please check credentials.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        message: "Server error. Please try again later.",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Not registered yet?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Create an account
          </Link>
        </p>

        <TMAlert
          open={alert.open}
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert({ ...alert, open: false })}
        />
      </div>
    </div>
  );
};

export default Login;

*/
import React, { useState } from "react";
import TMAlert from "./TMAlert";
import { useNavigate } from "react-router-dom";

const Login = ({ switchToRegister }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAlert({ open: true, message: "Login successful", severity: "success" });

        localStorage.setItem("user", JSON.stringify(data.user || {}));

        setTimeout(() => navigate("/"), 1500);
      } else {
        setAlert({ open: true, message: data.error || "Invalid credentials", severity: "error" });
      }
    } catch (error) {
      console.error(error);
      setAlert({ open: true, message: "Server error", severity: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Login to Your Account</h2>

        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={handleChange}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Sign In
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={switchToRegister}
            className="text-blue-500 font-medium hover:underline"
          >
            Register Now
          </button>
        </p>

        <TMAlert
          open={alert.open}
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert({ ...alert, open: false })}
        />
      </div>
    </div>
  );
};

export default Login;
