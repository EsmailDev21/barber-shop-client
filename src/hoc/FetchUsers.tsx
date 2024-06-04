import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import Suspense from './Suspense';
import { fetchUsers, selectUsersState } from 'src/redux/slices/UsersSlice';
import { Progress, Spinner } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import AuthService from 'src/httpClient/services/AuthService';
import ErrorPage from 'src/pages/error-page';
import ErrorView from 'src/sections/error/error-view';
import { Navigate } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import { useTranslation } from 'react-i18next';

const FetchUsers = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(selectUsersState);
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(fetchUsers());
        console.log(data);
      } catch (error) {
        throw error;
      }
    };
    fetch();
  }, [dispatch]);
  const { t } = useTranslation();
  return isLoading === true ? (
    <Loader text={t('loadingUsers')} />
  ) : error != null ? (
    <Navigate to="/error" />
  ) : (
    children
  );
};

export default FetchUsers;
