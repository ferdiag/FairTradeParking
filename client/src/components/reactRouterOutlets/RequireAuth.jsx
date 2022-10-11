import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(true);
  const location = useLocation();
  return isAuth ? (
    <Dashboard />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default useAuth;
