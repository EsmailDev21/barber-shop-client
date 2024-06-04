import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, TextField, Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

const BookingModal = ({ open, handleClose, handleBooking }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [note, setNote] = useState('');
  const { t } = useTranslation();
  const handleSubmit = () => {
    handleBooking({ bookingDate, note });
    handleClose();
  };

  return (
    <Modal sx={{ borderRadius: 1 }} open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {t('bookService')}
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            type="datetime-local"
            label={t('bookingDate')}
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label={t('note')}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            multiline
            rows={4}
          />
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={handleClose}>{t('cancel')}</Button>
            <LoadingButton variant="contained" color="primary" onClick={handleSubmit}>
              {t('bookNow')}
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

BookingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleBooking: PropTypes.func.isRequired,
};

export default BookingModal;
