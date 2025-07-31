import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check for the user/token in localStorage
  const loggedInUser = localStorage.getItem('loggedInUser'); 
  // You can also check for just the token if you store that separately
  // const token = localStorage.getItem('token'); 

  const location = useLocation();

  // If no user/token is found, redirect them to the login page
  if (!loggedInUser) {
    // We also pass the current location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a user is found, render the child component (the AdminDashboard)
  return children;
};

export default ProtectedRoute;
