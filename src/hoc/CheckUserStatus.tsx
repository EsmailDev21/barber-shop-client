import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'src/hooks/use-auth';
import useRole from 'src/hooks/use-role';
import { Role } from 'src/types/models';
import RequireAuth from './RequireAuth';
import { useAppSelector } from 'src/redux/hooks';
import { selectAuthState } from 'src/redux/slices/AuthSlice';

const CheckUserStatus = ({ children }: { children: JSX.Element }) => {
  const status = useAppSelector(selectAuthState).data?.isBanned || false;
  return status === true ? <Navigate to={'/not-authorized'} /> : children;
};

export default CheckUserStatus;
