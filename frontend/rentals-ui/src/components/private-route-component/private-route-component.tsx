import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode; // Define the type for children
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }


  return <>{children}</>;
};

export default PrivateRoute;
