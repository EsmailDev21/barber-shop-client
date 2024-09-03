import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Navigate } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import { fetchReviews, selectReviewsState } from 'src/redux/slices/ReviewsSlice';
import { useTranslation } from 'react-i18next';
import { selectReportsState, fetchReports } from 'src/redux/slices/ReportsSlice';

const FetchReports = ({ children }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { data, error, isLoading } = useAppSelector(selectReportsState);
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(fetchReports());
        // console.log(data);
      } catch (error) {
        throw error;
      }
    };
    fetch();
  }, [dispatch]);
  return isLoading === true ? (
    <Loader text={t('loading')} />
  ) : error != null ? (
    <Navigate to="/error" />
  ) : (
    children
  );
};

export default FetchReports;
