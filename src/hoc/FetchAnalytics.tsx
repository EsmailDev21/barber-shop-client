import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Navigate } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import {
  fetchNumberOfUsers,
  fetchNumberOfBarbers,
  fetchNumberOfCustomers,
  fetchTotalSales,
  fetchMonthlySales,
  fetchWeeklySales,
  fetchTopServices,
  fetchCustomerInsights,
  fetchServiceRatings,
  fetchBookingTrends,
  fetchBarbersPerformance,
  selectAnalyticsState,
  fetchServiceGenderTypes,
} from 'src/redux/slices/AnalyticsSlice';
import { useTranslation } from 'react-i18next';

const FetchAnalytics = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(selectAnalyticsState);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        console.log('fetching ...');
        await Promise.all([
          dispatch(fetchNumberOfUsers()).unwrap(),
          dispatch(fetchNumberOfBarbers()).unwrap(),
          dispatch(fetchNumberOfCustomers()).unwrap(),
          dispatch(fetchTotalSales()).unwrap(),
          dispatch(fetchMonthlySales()).unwrap(),
          dispatch(fetchWeeklySales()).unwrap(),
          dispatch(fetchTopServices()).unwrap(),
          dispatch(fetchCustomerInsights()).unwrap(),
          dispatch(fetchServiceRatings()).unwrap(),
          dispatch(fetchBookingTrends()).unwrap(),
          dispatch(fetchBarbersPerformance()).unwrap(),
          dispatch(fetchServiceGenderTypes()).unwrap(),
        ]);
      } catch (error) {
        console.error(t('errAnalytics'), error);
      }
    };
    fetchAnalyticsData();
    console.log(error);
  }, [dispatch]);

  if (isLoading) {
    return <Loader text={t('loadingAnalytics')} />;
  }

  if (error) {
    return <Navigate to="/error" />;
  }

  return children;
};

export default FetchAnalytics;
