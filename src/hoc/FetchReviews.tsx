import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Navigate } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import { fetchReviews, selectReviewsState } from 'src/redux/slices/ReviewsSlice';
import { useTranslation } from 'react-i18next';

const FetchReviews = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(selectReviewsState);
  const { t } = useTranslation();
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(fetchReviews());
        // console.log(data);
      } catch (error) {
        throw error;
      }
    };
    fetch();
  }, [dispatch]);
  return isLoading === true ? (
    <Loader text={t('loadingReviews')} />
  ) : error != null ? (
    <Navigate to="/error" />
  ) : (
    children
  );
};

export default FetchReviews;
