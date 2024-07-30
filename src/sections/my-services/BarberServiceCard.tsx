import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Animated from 'src/hoc/Animated';
import { Service } from 'src/types/models';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectUsersState } from 'src/redux/slices/UsersSlice';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { fCurrency } from 'src/utils/format-number';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { deleteService } from 'src/redux/slices/ServicesSlice';
import React from 'react';

// ----------------------------------------------------------------------

type ServiceShopCardProps = {
  service: Service;
};

export default function BarberServiceCard({ service }: ServiceShopCardProps) {
  const { t } = useTranslation();
  const barbers = useAppSelector(selectUsersState).data.filter((u) => u.role === 'BARBER');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleCardClick = () => {
    navigate('/services/' + service.id);
  };
  const handleDelete = async (e:React.MouseEvent) => {
    e.stopPropagation();
    await dispatch(deleteService(service.id)).unwrap();
  };
  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/my-services/update/' + service.id);
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
      Sale -{service.reduction}%
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={service.name}
      src={service.imageUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Stack direction={'column'}>
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
    <Card
      style={{ cursor: 'pointer' }}
      onClick={handleCardClick}
      sx={{
        width: '250px',
        transition: 'opacity 0.3s',
        '&:hover': {
          opacity: 0.7,
        },
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {service.name}
        </Link>
        {renderBarber}
        {renderPhoneNumber}
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {t('duration')}: {service.duration} min
        </Link>
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="inherit"
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={'#f6f6f6'}
                fill={'none'}
              >
                <path
                  d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 4L20 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 22L22 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            {t('update')}
          </Button>

          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={'#f6f6f6'}
                fill={'none'}
              >
                <path
                  d="M19.5 5.5L19.0982 12.0062M4.5 5.5L5.10461 15.5248C5.25945 18.0922 5.33688 19.3759 5.97868 20.299C6.296 20.7554 6.7048 21.1407 7.17905 21.4302C7.85035 21.84 8.68108 21.9631 10 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M20 15L13 21.9995M20 22L13 15.0005"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            }
          >
            {t('delete')}
          </Button>

          {service.reduction > 0 ? renderPrice : renderPriceWithoutDiscount}
        </Stack>
      </Stack>
    </Card>
  );
}

BarberServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
};
