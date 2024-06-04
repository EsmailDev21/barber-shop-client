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
import Loader from 'src/components/loader/Loader';
import { useTranslation } from 'react-i18next';

const FetchUser = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(selectAuthState);
  useEffect(() => {
    const fetch = async () => {
      try {
        const authService = new AuthService();
        dispatch(startLoading());
        const res = await authService.getProfile();
        if (res) {
          dispatch(setUser(res));
        }
        dispatch(endLoading());
      } catch (error) {
        dispatch(setUserNotLoggedInError());
        dispatch(endLoading());
      }
    };
    fetch();
  }, []);
  const { t } = useTranslation();
  return isLoading === true ? (
    <Loader text={t('loadingUser')} />
  ) : error != null ? (
    <Navigate to="/error" />
  ) : (
    children
  );
};

export default FetchUser;
