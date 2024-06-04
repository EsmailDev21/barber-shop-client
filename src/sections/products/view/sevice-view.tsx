import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, FormControlLabel, Radio, Rating, TextField, IconButton } from '@mui/material';
import Animated from 'src/hoc/Animated';
import { Service } from 'src/types/models';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectUsersState } from 'src/redux/slices/UsersSlice';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { fCurrency } from 'src/utils/format-number';
import { createReview, selectReviewsState } from 'src/redux/slices/ReviewsSlice';
import { useState } from 'react';
import { selectAuthState } from 'src/redux/slices/AuthSlice';
import { LoadingButton } from '@mui/lab';
import BookingModal from './service-booking';
import { createBooking, selectBookingsState } from 'src/redux/slices/BookingsSlice';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

type ShopServiceViewProps = {
  service: Service;
};

export default function ShopServiceView({ service }: ShopServiceViewProps) {
  const { t } = useTranslation();
  const barbers = useAppSelector(selectUsersState).data.filter((u) => u.role === 'BARBER');
  const reviews = useAppSelector(selectReviewsState).data.filter((r) => r.serviceId === service.id);
  const { isLoading, error } = useAppSelector(selectReviewsState);
  const bookingState = useAppSelector(selectBookingsState);
  const users = useAppSelector(selectUsersState).data;
  const auth = useAppSelector(selectAuthState).data;
  const dispatch = useAppDispatch();
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const [errReview, setErrReview] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = async () => {
    if (newReview.trim() === '' || newRating === 0) {
      // Check if the review or rating is empty
      setErrReview('Please enter a review and rating before submitting.');
      return;
    }

    await dispatch(
      createReview({
        comment: newReview,
        rating: newRating,
        serviceId: service.id,
        reviewPosterId: auth.id,
      })
    );
    console.log('Review submitted:', newReview, newRating);
    setNewReview('');
    setNewRating(0);
    setReviewSuccess(true);
    setErrReview('');
  };

  const [errBooking, setErrorBoking] = useState('');
  const [success, setSuccess] = useState(false);

  const handleBooking = async (bookingData) => {
    console.log(errBooking, bookingData);
    const bookingDate = new Date(bookingData.bookingDate);
    const bookingStartTime = bookingDate.getHours();
    const bookingEndTime = bookingStartTime + Math.ceil(parseInt(service.duration) / 60);

    // Check if the booking date is within working hours
    if (bookingStartTime < 8 || bookingEndTime > 22) {
      setErrorBoking(t('workingTimeErr'));
      return;
    }

    // Check for overlapping bookings
    const isOverlapping = bookingState.data.some((b) => {
      const existingBookingDate = new Date(b.date);
      const existingStartTime = existingBookingDate.getHours();
      const existingEndTime = existingStartTime + Math.ceil(parseInt(service.duration) / 60);
      return (
        b.serviceId === service.id &&
        bookingDate.toDateString() === existingBookingDate.toDateString() &&
        ((bookingStartTime >= existingStartTime && bookingStartTime < existingEndTime) ||
          (bookingEndTime > existingStartTime && bookingEndTime <= existingEndTime) ||
          (bookingStartTime <= existingStartTime && bookingEndTime >= existingEndTime))
      );
    });

    if (isOverlapping) {
      setErrorBoking(t('overlappingBookingsErr'));
      return;
    }

    // Proceed with booking
    await dispatch(
      createBooking({
        customerId: auth.id,
        date: bookingDate,
        note: bookingData.note,
        serviceId: service.id,
        status: 'PENDING',
      })
    );
    setSuccess(true);
    setErrorBoking('');
  };
  const renderStatus = service.reduction > 0 && (
    <Label
      variant="filled"
      color="error"
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {t('sale')} -{service.reduction}%
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={service.name}
      src={service.imageUrl}
      sx={{
        width: 1,
        height: 'auto',
        objectFit: 'cover',
      }}
    />
  );

  const renderPrice = (
    <Stack direction="column">
      <Typography variant="subtitle1">
        <Typography
          component="span"
          variant="body1"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
          }}
        >
          {service.reduction > 0 && fCurrency(service.price)}DT
        </Typography>
      </Typography>
      <Typography variant="subtitle1">
        {service.reduction > 0 && fCurrency(service.price * ((100 - service.reduction) / 100))}DT
      </Typography>
    </Stack>
  );

  const renderPriceWithoutDiscount = (
    <Typography variant="subtitle1">{service.price} DT</Typography>
  );

  const barber = barbers.find((b) => b.id === service.barberId);

  const renderBarber = barber && (
    <>
      <Typography variant="subtitle1">
        <Typography
          component="span"
          variant="body1"
          sx={{
            color: 'text.disabled',
          }}
        >
          {barber.name}
        </Typography>
      </Typography>
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
        }}
      >
        {barber.address}, {barber.city}
      </Typography>
    </>
  );

  const renderPhoneNumber = barber && (
    <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
      +216 {barber.phoneNumber}
    </Link>
  );

  return (
    <Card sx={{ width: '800px', mx: 'auto', mt: 3, display: 'flex', height: '600px' }}>
      <Box sx={{ width: '40%', position: 'relative' }}>
        {renderStatus}
        {renderImg}
      </Box>
      <Box sx={{ width: '60%', p: 3, overflowY: 'auto' }}>
        <Stack spacing={3}>
          <Link color="inherit" underline="hover" variant="h6" noWrap>
            {service.name}
          </Link>
          {renderBarber}
          {renderPhoneNumber}
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {t('duration')}: {service.duration} min
          </Link>
          <Stack spacing={2}>
            <Typography variant="h6">Rating</Typography>
            <Stack spacing={1}>
              {reviews.length > 0 ? (
                reviews.map((item, index) => (
                  <Stack key={index} spacing={1}>
                    <FormControlLabel
                      control={
                        <Radio
                          disableRipple
                          color="default"
                          icon={<Rating readOnly value={item.rating} />}
                          checkedIcon={<Rating readOnly value={item.rating} />}
                          sx={{
                            '&:hover': { bgcolor: 'transparent' },
                          }}
                        />
                      }
                      label=""
                      sx={{
                        my: 0.5,
                        borderRadius: 1,
                        '&:hover': { opacity: 0.48 },
                      }}
                    />
                    <Box
                      sx={{
                        my: 0.5,
                        borderRadius: 1,
                        p: 1,
                        borderColor: '#eeeeee',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                        {users.find((u) => u.id === item.reviewPosterId)?.name}
                      </Typography>
                      <Typography variant="body2">{item.comment}</Typography>
                    </Box>
                  </Stack>
                ))
              ) : (
                <Typography variant="body2" color="text.disabled">
                  {t('noRevYet')}
                </Typography>
              )}
            </Stack>
          </Stack>
          <Box>
            <Typography variant="h6">{t('addReview')}</Typography>
            <Rating
              name="new-review-rating"
              value={newRating}
              onChange={(event, newValue) => setNewRating(newValue)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={t('yourReview')}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Stack direction="row" justifyContent="flex-end">
              <LoadingButton
                variant="contained"
                color={errReview.length > 0 ? 'error' : 'primary'}
                loading={isLoading}
                endIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={'#ffffff'}
                    fill={'none'}
                  >
                    <path
                      d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11.5 12.5L15 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                onClick={handleReviewSubmit}
              >
                {errReview.length > 0 ? errReview : reviewSuccess ? t('revSubmitted') : t('submit')}
              </LoadingButton>
            </Stack>
          </Box>
          <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
            <Animated>
              <LoadingButton
                loading={bookingState.isLoading}
                variant="contained"
                color={errBooking.length > 0 ? 'error' : success === false ? 'primary' : 'success'}
                startIcon={
                  errBooking.length > 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      color={'#ffffff'}
                      fill={'none'}
                    >
                      <path
                        d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M11.992 16H12.001"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 13L12 8.99997"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : success ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      color={'#ffffff'}
                      fill={'none'}
                    >
                      <path
                        d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      color={'#ffffff'}
                      fill={'none'}
                    >
                      <path
                        d="M11 2C7.22876 2 5.34315 2 4.17157 3.12874C3 4.25748 3 6.07416 3 9.70753V17.9808C3 20.2867 3 21.4396 3.77285 21.8523C5.26947 22.6514 8.0768 19.9852 9.41 19.1824C10.1832 18.7168 10.5698 18.484 11 18.484C11.4302 18.484 11.8168 18.7168 12.59 19.1824C13.9232 19.9852 16.7305 22.6514 18.2272 21.8523C19 21.4396 19 20.2867 19 17.9808V13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 10L17 2M13 6H21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )
                }
                onClick={() => setBookingModalOpen(true)}
              >
                {errBooking.length > 0
                  ? errBooking
                  : success === true
                  ? t('bookedSuccessfully')
                  : t('bookNow')}
              </LoadingButton>
            </Animated>
            {service.reduction > 0 ? renderPrice : renderPriceWithoutDiscount}
          </Stack>
        </Stack>
      </Box>
      <BookingModal
        open={bookingModalOpen}
        handleClose={() => setBookingModalOpen(false)}
        handleBooking={handleBooking}
      />
    </Card>
  );
}

ShopServiceView.propTypes = {
  service: PropTypes.object.isRequired,
};
