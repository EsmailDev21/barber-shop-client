import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Navigate } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import {
  fetchNumberOfCustomers,
  fetchTotalSales,
  fetchMonthlySales,
  fetchWeeklySales,
  fetchTopServices,
  fetchCustomerInsights,
  fetchServiceRatings,
  fetchBookingTrends,
  fetchBarbersPerformance,
  fetchServiceGenderTypes,
  clearError,
  selectBarberAnalyticsState,
} from 'src/redux/slices/BarberAnalyticsSlice'; // Update the import path accordingly
import { useTranslation } from 'react-i18next';
import { selectAuthState } from 'src/redux/slices/AuthSlice';

const FetchBarberAnalytics = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(selectBarberAnalyticsState);
  const { t } = useTranslation();
  const id = useAppSelector(selectAuthState).data.id;
  useEffect(() => {
    const fetchBarberAnalyticsData = async () => {
      try {
        await Promise.all([
          dispatch(fetchNumberOfCustomers(id)).unwrap(),
          dispatch(fetchTotalSales(id)).unwrap(),
          dispatch(fetchMonthlySales(id)).unwrap(),
          dispatch(fetchWeeklySales(id)).unwrap(),
          dispatch(fetchTopServices(id)).unwrap(),
          dispatch(fetchCustomerInsights(id)).unwrap(),
          dispatch(fetchServiceRatings(id)).unwrap(),
          dispatch(fetchBookingTrends(id)).unwrap(),
          dispatch(fetchBarbersPerformance(id)).unwrap(),
          dispatch(fetchServiceGenderTypes(id)).unwrap(),
        ]);
      } catch (error) {
        console.error(t('errBarberAnalytics'), error);
      }
    };
    fetchBarberAnalyticsData();
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      console.error(t('errAnalytics'), error);
      dispatch(clearError());
    }
  }, [error, dispatch, t]);

  if (isLoading) {
    return <Loader text={t('loadingAnalytics')} />;
  }

  if (error) {
    return <Navigate to="/error" />;
  }

  return children;
};

export default FetchBarberAnalytics;
