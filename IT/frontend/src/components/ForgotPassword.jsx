import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const ForgotPassword = ({ onSwitchForm }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmNewPassword) {
      return setMessage('❌ Passwords do not match.');
    }

    if (newPassword.length < 6) {
      return setMessage('❌ Password must be at least 6 characters.');
    }

    if (!role) {
      return setMessage('❌ Please select a role.');
    }

    try {
      // ✅ Correct backend route with `/api` prefix
      const res = await axios.post('http://localhost:8081/api/forgot-password', {
        email,
        newPassword,
        confirmNewPassword,
        role,
      });

      setMessage('✅ ' + res.data.message);
      setEmail('');
      setNewPassword('');
      setConfirmNewPassword('');
      setRole('');

      setTimeout(() => {
        onSwitchForm('login');
      }, 2000);
    } catch (err) {
      console.error('Forgot password error:', err);
      setMessage('❌ ' + (err.response?.data?.message || 'Reset failed. Try again.'));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <h2>Reset Password</h2>
          <p>Enter your email and new password.</p>
          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Select Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">-- Select Role --</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>

            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Reset Password
            </button>
          </form>

          {message && (
            <p
              className="form-message"
              style={{
                marginTop: '15px',
                color: message.startsWith('❌') ? 'red' : 'green',
              }}
            >
              {message}
            </p>
          )}

          <p style={{ textAlign: 'center', marginTop: '10px' }}>
            Remembered your password?{' '}
            <span
              style={{
                color: '#007bff',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => onSwitchForm('login')}
            >
              Back to Login
            </span>
          </p>
        </div>

        <div className="login-right">
          <h3>New Here?</h3>
          <p>
            Create an account to get started.
            <br />
            It's quick and easy!
          </p>
          <button className="register-now-btn" onClick={() => onSwitchForm('register')}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
