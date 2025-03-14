import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem('jwt');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log('Access denied. User role:', userRole, 'Required roles:', allowedRoles);
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;