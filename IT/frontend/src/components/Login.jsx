// src/components/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ onSwitchForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Employee"
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8081/api/login", {
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role
      });

      const { token, role, name, email, photo } = res.data;
      const user = { name, email, photo, role };

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("token", token);
      setMessage("✅ Login successful!");

      setTimeout(() => {
        if (role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/employee-dashboard");
        }
      }, 800);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "❌ Invalid email or password.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <a href="#" className="forgot-link" onClick={() => onSwitchForm("forgot")}>
              Forgot Password?
            </a>

            {message && <p className="form-message">{message}</p>}
          </form>
        </div>

        <div className="login-right">
          <h3>New Here?</h3>
          <p>Create an account to get started!</p>
          <button
            className="register-now-btn"
            onClick={() => onSwitchForm("register")}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
