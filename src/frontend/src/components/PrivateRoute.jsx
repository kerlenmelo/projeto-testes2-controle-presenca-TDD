import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { professor } = useAuth();

  if (!professor) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
