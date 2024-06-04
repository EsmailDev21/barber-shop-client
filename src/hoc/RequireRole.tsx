import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'src/hooks/use-auth';
import useRole from 'src/hooks/use-role';
import { Role } from 'src/types/models';
import RequireAuth from './RequireAuth';

const RequireRole = ({ role, children }: { role: Role | Role[]; children: JSX.Element }) => {
  const userRole = useRole();
  return (
    <RequireAuth>
      {!role.includes(userRole) ? <Navigate to={'/not-authorized'} /> : children}
    </RequireAuth>
  );
};

export default RequireRole;
