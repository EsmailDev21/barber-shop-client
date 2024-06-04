import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'src/hooks/use-auth';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { authToken, isExpired } = useAuth();
  return isExpired === true || authToken == null || authToken == undefined ? (
    <Navigate to={'/not-authenticated'} />
  ) : (
    children
  );
};

export default RequireAuth;
