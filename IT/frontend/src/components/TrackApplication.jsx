import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TrackApplication.css';

const TrackApplication = () => {
  const [email, setEmail] = useState('');
  const [application, setApplication] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    setApplication(null);
    setMessage('');
    
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8081/api/public/track-application?email=${encodeURIComponent(email)}`);
      setApplication(data);
    } catch (err) {
      console.error("Tracking error:", err);
      if (err.response?.status === 404) {
        setMessage("No application found for this email.");
      } else {
        setMessage("Error retrieving application. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-page">
      <h2>📩 Track Your Application</h2>
      <p>Enter the email you used in the application form.</p>

      <input
        type="email"
        placeholder="your.email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleTrack} disabled={loading}>
        {loading ? "Tracking..." : "Track"}
      </button>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      {application && (
        <div className="application-details">
          <h3>🎉 Application Found</h3>
          <p><strong>Job Title:</strong> {application.job_title}</p>
          <p><strong>Full Name:</strong> {application.full_name}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Status:</strong> ✅ We have received your application.</p>

          {/* ✅ Show admin message */}
          {application.admin_message ? (
            <div className="admin-message">
              <h4>📨 Message from BridgeTech</h4>
              <p style={{ background: '#f6f6f6', padding: '10px', borderLeft: '4px solid #007bff' }}>
                {application.admin_message}
              </p>
            </div>
          ) : (
            <p>No message from admin yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackApplication;
