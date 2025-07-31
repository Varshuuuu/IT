// src/components/Register.jsx

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css'; // Ensure this path is correct

const Register = ({ onSwitchForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Employee',
    photo: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, photo: null }));
      setImagePreview(null);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      return setMessage("❌ Passwords do not match");
    }
    if (formData.password.length < 6) {
      return setMessage("❌ Password must be at least 6 characters long");
    }

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('password', formData.password);
      form.append('role', formData.role);
      if (formData.photo) {
        form.append('photo', formData.photo);
      }

      const res = await axios.post('http://localhost:8081/api/register', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage(res.data.message || "✅ Registered successfully!");
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Employee',
        photo: null
      });
      setImagePreview(null);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "❌ Registration failed.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-right">
          <h3>Welcome Back!</h3>
          <p>Already have an account? Log in to access your dashboard.</p>
          <button className="register-now-btn" onClick={() => onSwitchForm('login')}>
            Login
          </button>
        </div>

        <div className="login-left">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="profile-upload-wrapper">
              <label htmlFor="profile-photo" className="profile-upload">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="profile-preview" />
                ) : (
                  <>
                    <span className="upload-icon">📷</span>
                    <p>Upload Photo</p>
                  </>
                )}
              </label>
              <input type="file" id="profile-photo" accept="image/*" onChange={handleImageChange} hidden />
            </div>

            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />

            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />

            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />

            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleInputChange}>
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>

            <button type="submit" className="login-btn">Register</button>
          </form>

          {message && <p className="form-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
