import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';
import ManageJobs from './ManageJobs';
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [applications, setApplications] = useState([]);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [form, setForm] = useState({
    name: "", department: "", contact: "", email: "", hire_date: ""
  });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);
  const [view, setView] = useState("employees");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedInAdmin(user);
      if (user.role !== "Admin") {
        alert("Access denied: Admins only.");
        window.location.href = "/";
        return;
      }
    } else {
      window.location.href = "/";
      return;
    }

    fetchEmployees();
    fetchApplications();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/applications");
      setApplications(res.data);

      const drafts = {};
      res.data.forEach(app => {
        drafts[app.id] = app.admin_message || "";
      });
      setReplyDrafts(drafts);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (file) formData.append("photo", file);

    const url = editId
      ? `http://localhost:8081/api/employees/${editId}`
      : "http://localhost:8081/api/employees";
    const method = editId ? "put" : "post";

    try {
      await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchEmployees();
      setForm({ name: "", department: "", contact: "", email: "", hire_date: "" });
      setFile(null);
      setEditId(null);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp.id);
    setForm({
      name: emp.name,
      department: emp.department,
      contact: emp.contact,
      email: emp.email,
      hire_date: emp.hire_date ? emp.hire_date.split("T")[0] : "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8081/api/employees/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleReplyChange = (id, message) => {
    setReplyDrafts((prev) => ({ ...prev, [id]: message }));
  };

  const handleReplySave = async (id) => {
    const message = replyDrafts[id];
    if (!message || message.trim() === "") {
      alert("Reply cannot be empty.");
      return;
    }

    try {
      await axios.put(`http://localhost:8081/api/applications/${id}/message`, {
        admin_message: message,
      });
      alert("Reply saved.");
    } catch (err) {
      console.error("Reply save failed:", err);
      alert("Failed to save reply.");
    }
  };

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (view) {
      case "jobs":
        return <ManageJobs />;
      case "applications":
        return (
          <div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Applicant</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Resume</th>
                  <th>Reply</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>{app.job_title}</td>
                    <td>
                      {app.resume ? (
                        <a href={`http://localhost:8081/${app.resume}`} target="_blank" rel="noreferrer">
                          View
                        </a>
                      ) : "—"}
                    </td>
                    <td>
                      <textarea
                        value={replyDrafts[app.id] || ""}
                        onChange={(e) => handleReplyChange(app.id, e.target.value)}
                        rows={3}
                        placeholder="Reply to applicant..."
                      />
                    </td>
                    <td>
                      <button onClick={() => handleReplySave(app.id)}>💾 Save</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "employees":
      default:
        return (
          <>
            <div className="admin-actions-bar">
              <button className="action-button">Add Employee</button>
            </div>

            <form onSubmit={handleSubmit} className="employee-form" encType="multipart/form-data">
              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
              <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <input name="hire_date" type="date" value={form.hire_date} onChange={handleChange} />
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button type="submit">{editId ? "Update" : "Add"}</button>
            </form>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Hire Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((emp) => (
                    <tr key={emp.id}>
                      <td>
                        {emp.photo ? (
                          <img src={`http://localhost:8081/${emp.photo}`} alt="avatar" className="avatar" />
                        ) : "—"}
                      </td>
                      <td>{emp.id}</td>
                      <td>{emp.name}</td>
                      <td>{emp.department}</td>
                      <td>{emp.contact}</td>
                      <td>{emp.email}</td>
                      <td>{new Date(emp.hire_date).toLocaleDateString()}</td>
                      <td>
                        <button className="icon-button" onClick={() => handleEdit(emp)}>✏️</button>
                        <button className="icon-button" onClick={() => handleDelete(emp.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8">No employees found.</td></tr>
                )}
              </tbody>
            </table>
          </>
        );
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-profile-header">
          {loggedInAdmin?.photo && (
            <img src={loggedInAdmin.photo} alt="Admin" className="admin-avatar" />
          )}
          <h3>{loggedInAdmin?.name}</h3>
          <p>{loggedInAdmin?.email}</p>
        </div>

        <nav>
          <ul>
            <li onClick={() => setView('employees')} className={view === 'employees' ? 'active' : ''}>👤 Employees</li>
            <li onClick={() => setView('jobs')} className={view === 'jobs' ? 'active' : ''}>💼 Job Postings</li>
            <li onClick={() => setView('applications')} className={view === 'applications' ? 'active' : ''}>📄 Applications</li>
            <li> <a href="/admin/ats-scanner">ATS Resume Scanner</a></li>

            <li onClick={handleSignOut}>🚪 Sign Out</li>

          </ul>
        </nav>
      </aside>

      <main className="admin-content">
        <div className="admin-header">
          <div className="admin-header-left">
            <h3>
              {view === 'employees' && 'Company Employees'}
              {view === 'jobs' && 'Manage Job Postings'}
              {view === 'applications' && 'Job Applications'}
            </h3>
            {view === 'employees' && (
              <input
                type="text"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
              />
            )}
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
