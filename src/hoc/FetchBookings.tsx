import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Navigate } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import { fetchReviews, selectReviewsState } from 'src/redux/slices/ReviewsSlice';
import { fetchBookings, selectBookingsState } from 'src/redux/slices/BookingsSlice';
import { useTranslation } from 'react-i18next';

const FetchBookings = ({ children }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { data, error, isLoading } = useAppSelector(selectBookingsState);
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(fetchBookings());
        // console.log(data);
      } catch (error) {
        throw error;
      }
    };
    fetch();
  }, [dispatch]);
  return isLoading === true ? (
    <Loader text={t('loadingBookings')} />
  ) : error != null ? (
    <Navigate to="/error" />
  ) : (
    children
  );
};

export default FetchBookings;
