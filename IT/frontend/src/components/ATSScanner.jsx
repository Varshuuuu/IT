import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ATSScanner = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/applications/scanned")
      .then((res) => setResumes(res.data))
      .catch((err) => console.error("Error fetching resumes", err));
  }, []);

  return (
    <div className="p-4">
      <h2>📄 ATS Resume Scanner</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th>Full Name</th>
            <th>Email</th>
            <th>Job ID</th>
            <th>Score</th>
            <th>Submitted At</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume, index) => (
            <tr key={index}>
              <td>{resume.full_name}</td>
              <td>{resume.email}</td>
              <td>{resume.job_id}</td>
              <td>{resume.ats_score}</td>
              <td>{new Date(resume.submitted_at).toLocaleString()}</td>
              <td>
                <a
                  href={`http://localhost:8081/uploads/resumes/${resume.resume_path}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ATSScanner;
