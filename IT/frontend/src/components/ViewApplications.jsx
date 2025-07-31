import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ViewApplications.css";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/applications")
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Failed to fetch applications:", err));
  }, []);

  return (
    <div className="applications-section">
      <h2>Job Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="applications-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Job Title</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Applied On</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.job_title}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>
                  {app.resume ? (
                    <a
                      href={`http://localhost:8081/${app.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>
                <td>{new Date(app.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewApplications;
