import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import LocationModal from '../components/LocationModal';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">

          {/* Logo and Company Name */}
          <div className="nav-left" onClick={() => navigate('/')}>
            <img src="/images/logo1.png" alt="BridgeTech Logo" className="logo-img" />
            <span className="company-name">BridgeTech</span>
          </div>

          {/* Navigation Items */}
          <ul className="nav-center">
            <li onClick={() => navigate('/')}>Home</li>
            <li className="dropdown">
  Industries
  <div className="dropdown-content">
    {/* Left Text */}
    <div className="dropdown-left">
      <h3>Industries</h3>
      <p>
        Choose a partner with intimate knowledge of your industry and first-hand experience of defining its future.
      </p>
      <button onClick={() => navigate('/industries')} className="learn-more-btn">
        Learn more →
      </button>
    </div>

    {/* Industry Links */}
    <div className="dropdown-links">
      <ul>
        <li>Aerospace and Defense</li>
        <li>Automotive</li>
        <li>Banking</li>
        <li>Consumer Products</li>
        <li>Energy</li>
        <li>Healthcare</li>
        <li>Travel</li>
      </ul>
    </div>

    <div className="dropdown-links">
      <ul>
        <li>Life Sciences</li>
        <li>Manufacturing</li>
        <li>Media</li>
        <li>Public Sector</li>
        <li>Retail</li>
        <li>Telecoms</li>
      </ul>
    </div>

    {/* Brands */}
    <div className="dropdown-partners">
      <h4>Explore our brands</h4>
      <img src="/images/brand1.png" alt="Brand 1" />
      <img src="/images/brand2.png" alt="Brand 2" />
      <img src="/images/brand3.png" alt="Brand 3" />
    </div>
  </div>
</li>


            <li onClick={() => navigate('/services')}>Services</li>

            <li
              onClick={() => {
                if (window.location.pathname !== '/') {
                  navigate('/', { state: { scrollTo: 'careers-section' } });
                } else {
                  const target = document.getElementById('careers-section');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              Careers
            </li>


       
            <li className="dropdown">
              About us
              <div className="dropdown-content">
              
                <div className="dropdown-left">
                  <h3>About BridgeTech</h3>
                  <p>
                    At BridgeTech Group, we transform ideas into powerful digital experiences. With expertise across full-stack development, cloud architecture, and agile delivery, we build scalable and secure applications tailored to your business goals.
                  </p>
                  <button className="learn-more-btn" onClick={() => navigate('/about')}>Learn more →</button>
                </div>

               
                <div className="dropdown-links">
                  <ul>
                    <li onClick={() => navigate('/about/who-we-are')}>Who we are</li>
                    <li onClick={() => navigate('/about/mission')}>Our mission</li>
                    <li onClick={() => navigate('/about/tech')}>Technologies we use</li>
                    <li onClick={() => navigate('/about/industries')}>Industries we serve</li>
                    <li onClick={() => navigate('/about/values')}>Our values</li>
                    <li onClick={() => navigate('/about/locations')}>Locations</li>
                  </ul>
                </div>

               
                <div className="dropdown-image">
                  <img src="/images/aboutus.jpg" alt="BridgeTech Team" />
                  <p>
                    We act as the “bridge” between concept and execution — bringing your vision to life with React, Node.js, and cloud-native innovation.
                  </p>
                </div>
              </div>
            </li>
          </ul>

          <div className="nav-right">
            <button onClick={() => navigate('/contact')} className="nav-link">Contact us</button>
            <button onClick={() => navigate('/login')}>Sign In</button>
            <button onClick={() => setShowModal(true)}>Global | EN 🌐</button>
          </div>
        </div>
      </nav>

    
      {showModal && <LocationModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
