import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Required for navigation
import '../styles/Careers.css';
import Navbar from './Navbar';

const Careers = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="careers-hero">
        <h1>Build Your Future with Bridgetech</h1>
        <p>
          Join a team of innovators and problem-solvers dedicated to crafting cutting-edge full-stack solutions.
          Discover where your talent can thrive.
        </p>
        <button className="hero-btn" onClick={() => navigate('/jobs')}>
          View Current Openings
        </button>
      </section>

      {/* Why Section */}
      <section className="why-section">
        <h2>Why Bridgetech?</h2>
        <div className="why-cards">
          <div className="why-card">
            <span className="emoji">💡</span>
            <h3>Innovation at Core</h3>
            <p>Work on exciting projects using the latest technologies and methodologies.</p>
          </div>
          <div className="why-card">
            <span className="emoji">🌱</span>
            <h3>Growth & Learning</h3>
            <p>Continuous learning opportunities, mentorship, and career development paths.</p>
          </div>
          <div className="why-card">
            <span className="emoji">🤝</span>
            <h3>Collaborative Culture</h3>
            <p>Be part of a supportive and inclusive team that values every voice.</p>
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="career-paths">
        <h2>Our Career Paths</h2>
        <div className="paths-grid">
          <div className="path-card">
            <div className="circle">FE</div>
            <h3>Frontend Developer</h3>
            <p>Craft engaging and responsive UIs using React, Angular or Vue.</p>
            <ul>
              <li>HTML5, CSS3, JavaScript (ES6+)</li>
              <li>React, Angular, Vue</li>
              <li>Responsive Design, UI/UX</li>
            </ul>
          </div>
          <div className="path-card">
            <div className="circle">BE</div>
            <h3>Backend Developer</h3>
            <p>Build scalable server-side apps, APIs & database integrations.</p>
            <ul>
              <li>Node.js, Django, Flask, Spring Boot</li>
              <li>SQL/NoSQL</li>
              <li>API Design, Microservices</li>
            </ul>
          </div>
          <div className="path-card">
            <div className="circle">FS</div>
            <h3>Full Stack Developer</h3>
            <p>Master both frontend and backend for full app delivery.</p>
            <ul>
              <li>FE & BE Tech Stacks</li>
              <li>Deployment & Cloud</li>
              <li>Architecture & Problem Solving</li>
            </ul>
          </div>
          <div className="path-card">
            <div className="circle">DO</div>
            <h3>DevOps Engineer</h3>
            <p>Optimize deployment pipelines and cloud environments.</p>
            <ul>
              <li>CI/CD, Docker, Kubernetes</li>
              <li>AWS, Azure, GCP</li>
              <li>Scripting (Bash, Python)</li>
            </ul>
          </div>
          <div className="path-card">
            <div className="circle">UX</div>
            <h3>UI/UX Designer</h3>
            <p>Design intuitive and engaging user experiences.</p>
            <ul>
              <li>Figma, Sketch, Adobe XD</li>
              <li>User Testing, Prototyping</li>
              <li>Interaction Design</li>
            </ul>
          </div>
          <div className="path-card">
            <div className="circle">PM</div>
            <h3>Project Manager</h3>
            <p>Drive delivery from planning to deployment.</p>
            <ul>
              <li>Agile/Scrum</li>
              <li>Stakeholder Management</li>
              <li>Risk Planning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="perks-section">
        <h2>Perks & Benefits</h2>
        <div className="perks-grid">
          <div className="perk-card">
            <span className="emoji">💰</span>
            <h4>Competitive Salary</h4>
            <p>Rewarding your skills and dedication.</p>
          </div>
          <div className="perk-card">
            <span className="emoji">🩺</span>
            <h4>Health & Wellness</h4>
            <p>Comprehensive insurance and wellness programs.</p>
          </div>
          <div className="perk-card">
            <span className="emoji">📚</span>
            <h4>Learning Budget</h4>
            <p>Access to courses, certifications, and conferences.</p>
          </div>
          <div className="perk-card">
            <span className="emoji">🏖️</span>
            <h4>Flexible Work</h4>
            <p>Remote options and work-life balance support.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="careers-footer">
        <p>© 2025 Bridgetech. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </>
  );
};

export default Careers;
