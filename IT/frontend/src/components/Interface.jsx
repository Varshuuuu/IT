import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ Add useNavigate
import Navbar from './Navbar';
import '../styles/Interface.css';

const Interface = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="interface-wrapper">
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-card">
            <h1 className="card-title">
              BridgeTech Group is a full-stack technology solutions provider specializing in building scalable, secure, and user-focused digital products.
            </h1>
            <p className="card-description">
              With deep expertise in both frontend and backend development, BridgeTech acts as the "bridge" between ideas and execution, turning complex business needs into high-performing applications.
            </p>
            <button className="read-more-btn">Read more →</button>
          </div>
        </section>

        <div className="section-spacer" />

        {/* Careers Section */}
        <section className="second-section" id="careers-section">
          <div className="second-content">
            <div className="second-image">
              <img src="/images/join-us.jpg" alt="Join Us" />
            </div>
            <div className="second-text">
              <h2>Join us</h2>
              <p>
                Deciding the career for you is more than simply “landing the job.” It’s finding a place
                where you make a difference each day, where you can be your most authentic self.
                It’s choosing your impact.
              </p>
              <div className="btn-group">
                <button className="btn-primary" onClick={() => navigate('/careers')}>
                  Explore careers
                </button>
               <button className="btn-secondary" onClick={() => navigate('/jobs')}>
  Search and apply
</button>

              </div>
            </div>
          </div>
        </section>

        <div className="section-spacer" />

        {/* Latest News Section */}
        <section className="latest-section">
          <h2 className="section-title">The latest from BridgeTech</h2>
          <div className="card-container">
            <div className="info-card">
              <img src="/images/ai.jpg" alt="AI" className="card-img" />
              <h3>BridgeTech's AI Platform</h3>
              <p>We empower businesses with AI-driven tools for innovation, scalability, and automation.</p>
              <span>5 min read</span>
            </div>

            <div className="info-card">
              <img src="/images/cloud.png" alt="Cloud Solutions" className="card-img" />
              <h3>Full-stack Cloud Solutions</h3>
              <p>Scalable cloud-native development using React, Node.js, and secure backend services.</p>
              <span>6 min read</span>
            </div>

            <div className="info-card">
              <img src="/images/agile.jpg" alt="Agile Delivery" className="card-img" />
              <h3>Agile Product Delivery</h3>
              <p>Agile-first approach ensures faster releases and high-quality user experiences.</p>
              <span>4 min read</span>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="footer-section">
          <div className="footer-container">
            <div className="footer-columns">
              
              <div className="footer-col">
                <h2>Let's connect</h2>
                <ul>
                  <li>Get in touch</li>
                  <li>Explore careers</li>
                  <li>View locations</li>
                  <li>Learn about BridgeTech</li>
                </ul>
              </div>

              <div className="footer-col">
                <ul>
                  <li>Who we are</li>
                  <li>What we do</li>
                  <li>Our thinking</li>
                  <li>Submit RFP</li>
                </ul>
              </div>

              <div className="footer-col">
                <ul>
                  <li>Newsroom</li>
                  <li>Events</li>
                  <li>Press releases</li>
                </ul>
              </div>

              <div className="footer-col social-col">
                <p>Follow us</p>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-x-twitter"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Interface;
