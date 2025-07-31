import React from 'react';
import Navbar from './Navbar';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <>
      <Navbar />

      {/* Banner Section */}
      <section className="contact-hero">
        <img src="/images/contact.jpg" alt="Contact Banner" className="contact-banner" />
        <div className="contact-overlay">
          <h1>Contact us</h1>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="contact-info-container">
          <p>
            Thank you for your interest in BridgeTech. Whether you’re a client, job seeker, journalist,
            analyst or investor, you can find the best way to contact us below.
          </p>

          <div className="contact-details">
            <p><strong>📞 Phone:</strong> +91 9491059212</p>
            <p><strong>📧 Email:</strong> contact@bridgetech.com</p>
            <p><strong>📍 Address:</strong> Hitech city, Hyd, telangana</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
