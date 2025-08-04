import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Interface from './components/Interface';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Services from './components/Services';
import AuthPage from './components/AuthPage';
import JobBoard from './components/JobBoard';
import JobApplication from './components/JobApplication';
import AdminDashboard from './components/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import EmployeeDashboard from "./components/EmployeeDashboard";
import TrackApplication from './components/TrackApplication';
import ATSScanner from './components/ATSScanner'; 
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Interface />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/track-application" element={<TrackApplication />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/apply/:id" element={<JobApplication />} />
        <Route path="/admin/ats-scanner" element={<ATSScanner />} />
        <Route
          path="/admin"
          element={
         <ProtectedRoute>
         <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>404: Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
