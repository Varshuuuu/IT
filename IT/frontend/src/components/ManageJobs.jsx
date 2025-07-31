import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManageJobs.css";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", location: "", type: "", description: "" });

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8081/api/jobs", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ title: "", location: "", type: "", description: "" });
      fetchJobs();
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8081/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  return (
    <div className="manage-jobs">
      <h2>Manage Job Postings</h2>

      <form onSubmit={handleSubmit} className="job-form">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="type" placeholder="Job Type" value={form.type} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <button type="submit">Add Job</button>
      </form>

      <table className="job-table">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Location</th><th>Type</th><th>Description</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.title}</td>
              <td>{job.location}</td>
              <td>{job.type}</td>
              <td>{job.description}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(job.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageJobs;
