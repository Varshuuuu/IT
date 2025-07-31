import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css"; // reuse admin styles

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [view, setView] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (!stored) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(stored);
    if (user.role !== "Employee") {
      alert("Access denied: Employees only");
      navigate("/");
      return;
    }

    if (user.photo && !user.photo.startsWith("http")) {
      user.photo = `http://localhost:8081/${user.photo}`;
    }

    setEmployee(user);
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const renderContent = () => {
    switch (view) {
      case "overview":
        return (
          <div className="card-box">
            <h2>Welcome, {employee?.name}</h2>
            <p>Role: {employee?.role}</p>
            <p>Email: {employee?.email}</p>
          </div>
        );
      case "profile":
        return (
          <div className="card-box">
            <h2>My Profile</h2>
            <p><strong>Name:</strong> {employee?.name}</p>
            <p><strong>Email:</strong> {employee?.email}</p>
            <p><strong>Employee ID:</strong> {employee?.id || "EID-XXX"}</p>
            <p><strong>Department:</strong> {employee?.department || "N/A"}</p>
          </div>
        );
      case "calendar":
      case "attendance":
      case "leave":
      case "assets":
      case "colleagues":
      case "documents":
      case "compensation":
      case "support":
        return (
          <div className="card-box">
            <h2>{view[0].toUpperCase() + view.slice(1)} Section</h2>
            <p>Coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-profile-header">
          {employee?.photo && (
            <img src={employee.photo} alt="Employee" className="admin-avatar" />
          )}
          <h3>{employee?.name}</h3>
          <p>{employee?.email}</p>
          <p style={{ fontSize: "0.85rem", color: "#ccc" }}>
            {employee?.id ? `EID-${employee.id}` : ""}
          </p>
        </div>

        <div className="sidebar-section-title">EMPLOYEE DETAILS</div>
        <nav>
          <ul>
            <li onClick={() => setView("overview")} className={view === "overview" ? "active" : ""}>🏠 Overview</li>
            <li onClick={() => setView("profile")} className={view === "profile" ? "active" : ""}>👤 Profile</li>
            <li onClick={() => setView("calendar")} className={view === "calendar" ? "active" : ""}>📅 Calendar</li>
            <li onClick={() => setView("attendance")} className={view === "attendance" ? "active" : ""}>🕒 Attendance</li>
            <li onClick={() => setView("leave")} className={view === "leave" ? "active" : ""}>🌴 Leave</li>
            <li onClick={() => setView("assets")} className={view === "assets" ? "active" : ""}>💼 Assets</li>
            <li onClick={() => setView("colleagues")} className={view === "colleagues" ? "active" : ""}>👥 Colleagues</li>
            <li onClick={() => setView("documents")} className={view === "documents" ? "active" : ""}>📎 Documents</li>
            <li onClick={() => setView("compensation")} className={view === "compensation" ? "active" : ""}>💰 Compensation</li>
            <li onClick={() => setView("support")} className={view === "support" ? "active" : ""}>🛠 Support</li>
            <li onClick={handleSignOut}>🚪 Sign Out</li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="admin-content">
        <div className="admin-header">
          <h3>{view.charAt(0).toUpperCase() + view.slice(1)} Section</h3>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default EmployeeDashboard;
