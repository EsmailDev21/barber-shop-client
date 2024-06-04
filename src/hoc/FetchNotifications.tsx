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
import { fetchNotifications, selectNotificationState } from 'src/redux/slices/NotificationSlice';
import { Spinner } from '@chakra-ui/react';
import { Button, CircularProgress, IconButton, Snackbar } from '@mui/material';

const FetchNotifications = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(selectNotificationState);
  const [open, setOpen] = React.useState(false);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    const fetchNotificationsData = async () => {
      try {
        console.log('fetching ...');
        await dispatch(fetchNotifications()).unwrap();
      } catch (error) {
        console.error('An error occurred while fetching analytics data:', error);
      }
    };

    fetchNotificationsData();
    console.log(error);
  }, [dispatch]);
  const action = (
    <React.Fragment>
      <Button
        onClick={() => dispatch(fetchNotifications()).unwrap()}
        color="secondary"
        size="small"
      >
        Refresh
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          color={'#4c86ff'}
          fill={'none'}
        >
          <path
            d="M10.247 6.7402C11.0734 7.56657 11.4866 7.97975 12.0001 7.97975C12.5136 7.97975 12.9268 7.56658 13.7531 6.74022L13.7531 6.7402L15.5067 4.98669L15.5067 4.98668C15.9143 4.5791 16.1181 4.37524 16.3302 4.25283C17.3965 3.63716 18.2748 4.24821 19.0133 4.98669C19.7518 5.72518 20.3628 6.60345 19.7471 7.66981C19.6247 7.88183 19.4209 8.08563 19.0134 8.49321L17.26 10.2466C16.4336 11.073 16.0202 11.4864 16.0202 11.9999C16.0202 12.5134 16.4334 12.9266 17.2598 13.7529L19.0133 15.5065C19.4209 15.9141 19.6247 16.1179 19.7471 16.3299C20.3628 17.3963 19.7518 18.2746 19.0133 19.013C18.2749 19.7516 17.3964 20.3626 16.3302 19.7469C16.1181 19.6246 15.9143 19.4208 15.5067 19.013L13.7533 17.2598L13.7533 17.2597C12.9271 16.4336 12.5135 16.02 12.0001 16.02C11.4866 16.02 11.073 16.4336 10.2468 17.2598L10.2468 17.2598L8.49349 19.013C8.08586 19.4208 7.88204 19.6246 7.67001 19.7469C6.60373 20.3626 5.7253 19.7516 4.98689 19.013C4.24836 18.2746 3.6374 17.3963 4.25303 16.3299C4.37545 16.1179 4.57926 15.9141 4.98689 15.5065L6.7404 13.7529C7.56678 12.9266 7.97996 12.5134 7.97996 11.9999C7.97996 11.4864 7.56656 11.073 6.74019 10.2466L4.98681 8.49321C4.57924 8.08563 4.37544 7.88183 4.25303 7.66981C3.63737 6.60345 4.24841 5.72518 4.98689 4.98669C5.72539 4.24821 6.60365 3.63716 7.67001 4.25283C7.88203 4.37524 8.0859 4.5791 8.49348 4.98668L8.49349 4.98669L10.247 6.7402Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>
    </React.Fragment>
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Snackbar open={open} autoHideDuration={6000} message={error} action={action} />;
  }

  return children;
};

export default FetchNotifications;
