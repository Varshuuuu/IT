import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/JobBoard.css';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('http://localhost:8081/api/public/jobs');
        setJobs(data);
      } catch (error) {
        console.error("Could not fetch jobs:", error);
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="job-board">
      <section className="job-hero">
        <h1>Find Your Next Opportunity</h1>
        <p>Search our current job openings and apply to become a part of the Bridgetech team.</p>
      </section>

      <section className="job-search">
        <h2>Search Job Openings</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, keyword, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>Search</button>
        </div>

        <div className="track-app-btn-wrapper" style={{ textAlign: 'right', marginTop: '10px' }}>
          <button className="track-btn" onClick={() => navigate('/track-application')}>
            📩 Track My Application
          </button>
        </div>

        <div className="job-list">
          {filteredJobs.length > 0 ? filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.location} • {job.type}</p>
              <p>{job.description}</p>
              <button
                className="apply-btn"
                onClick={() => navigate(`/apply/${job.id}`)}
              >
                Apply for this Job
              </button>
            </div>
          )) : (
            <p>No job openings match your search. Please check back later.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobBoard;
