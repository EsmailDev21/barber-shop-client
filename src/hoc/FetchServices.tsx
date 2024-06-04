import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Navigate } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import { fetchServices, selectServicesState } from 'src/redux/slices/ServicesSlice';
import { useTranslation } from 'react-i18next';

const FetchServices = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(selectServicesState);
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(fetchServices());
        console.log(data);
      } catch (error) {
        throw error;
      }
    };
    fetch();
  }, [dispatch]);
  const { t } = useTranslation();
  return isLoading === true ? (
    <Loader text={t('loadingServices')} />
  ) : error != null ? (
    <Navigate to="/error" />
  ) : (
    children
  );
};

export default FetchServices;
