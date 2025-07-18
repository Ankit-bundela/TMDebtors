/*import React, { useState } from "react";
import TMAlert from "./TMAlert";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      const response = await fetch("/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAlert({ open: true, message: "Registration successful", severity: "success" });
        navigate("/auth"); // or navigate("/login") depending on your route
      } else {
        setAlert({ open: true, message: data.error || "Registration failed", severity: "error" });
      }
    } catch (err) {
      console.error(err);
      setAlert({ open: true, message: "Server error", severity: "error" });
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={form.password}
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all"
        >
          Register
        </button>

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

export default Register;
*/
import React, { useState } from "react";
import TMAlert from "./TMAlert";
import { useNavigate } from "react-router-dom";

const Register = ({ switchToLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAlert({
          open: true,
          message: "Registration successful",
          severity: "success",
        });

        setTimeout(() => {
          navigate("/auth"); // or login page
        }, 1500);
      } else {
        setAlert({
          open: true,
          message: data.error || "Registration failed",
          severity: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        message: "Server error",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={form.password}
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <button onClick={switchToLogin} className="text-blue-500 hover:underline">
            Login
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

export default Register;
