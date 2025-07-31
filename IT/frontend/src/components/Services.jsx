import React from 'react';
import Navbar from './Navbar';
import '../styles/Services.css';

const Services = () => {
  return (
    <>
      <Navbar />

      <div className="services-hero">
        <div className="hero-overlay">
          <h1>Our Services</h1>
          <p>
            We provide end-to-end solutions in frontend, backend, DevOps, AI, and more —
            all tailored to your business needs.
          </p>
        </div>
      </div>

      <section className="services-section">
        <div className="service-card">
          <h3>Frontend Development</h3>
          <p>React, Next.js, TypeScript — responsive and intuitive UI/UX designs.</p>
        </div>

        <div className="service-card">
          <h3>Backend Development</h3>
          <p>Node.js, Express, GraphQL, authentication, and API design.</p>
        </div>

        <div className="service-card">
          <h3>Cloud & DevOps</h3>
          <p>AWS, Docker, CI/CD, Kubernetes — scalable cloud-native solutions.</p>
        </div>

        <div className="service-card">
          <h3>AI & Data Solutions</h3>
          <p>ML models, analytics dashboards, automation tools using Python & TensorFlow.</p>
        </div>

        <div className="service-card">
          <h3>Cybersecurity</h3>
          <p>Pen testing, secure development, compliance (SOC2, GDPR), data protection.</p>
        </div>
      </section>
    </>
  );
};

export default Services;
