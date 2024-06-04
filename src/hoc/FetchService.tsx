import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import Suspense from './Suspense';
import {
  endLoading,
  fetchUser,
  selectAuthState,
  setUser,
  setUserNotLoggedInError,
  startLoading,
} from 'src/redux/slices/AuthSlice';
import { Progress, Spinner } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import AuthService from 'src/httpClient/services/AuthService';
import ErrorPage from 'src/pages/error-page';
import ErrorView from 'src/sections/error/error-view';
import { Navigate } from 'react-router-dom';
import ServicesService from 'src/httpClient/services/ServicesService';

const FetchService = ({ children, id }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(selectAuthState);
  useEffect(() => {
    const fetch = async () => {
      try {
        const service = new ServicesService();
        dispatch(startLoading());
        const res = await service.getRecordById(id);
        if (res) {
          //dispatch(setUser(res));
        }
        dispatch(endLoading());
      } catch (error) {
        dispatch(setUserNotLoggedInError());
        dispatch(endLoading());
      }
    };
    fetch();
  }, [dispatch]);
  return isLoading === true ? <Spinner /> : error != null ? <Navigate to="/error" /> : children;
};

export default FetchService;
