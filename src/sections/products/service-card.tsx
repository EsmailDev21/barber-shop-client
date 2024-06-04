import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Animated from 'src/hoc/Animated';
import { Service } from 'src/types/models';
import { useAppSelector } from 'src/redux/hooks';
import { selectUsersState } from 'src/redux/slices/UsersSlice';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { fCurrency } from 'src/utils/format-number';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

type ServiceShopCardProps = {
  service: Service;
};

export default function ShopServiceCard({ service }: ServiceShopCardProps) {
  const { t } = useTranslation();
  const barbers = useAppSelector(selectUsersState).data.filter((u) => u.role === 'BARBER');
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate('/services/' + service.id);
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
          <Animated>
            <Button
              variant="contained"
              color="inherit"
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={'#ffffff'}
                  fill={'none'}
                >
                  <path
                    d="M21.8966 6.63081C22.2168 7.52828 21.7678 8.14274 20.8986 8.748C20.1973 9.23636 19.3039 9.76542 18.3572 10.6699C17.4291 11.5566 16.5234 12.6246 15.7184 13.6758C14.743 14.9496 13.8206 16.2801 13.0087 17.6655C12.7026 18.1902 12.1521 18.5078 11.5619 18.4999C10.9716 18.4919 10.4293 18.1597 10.1364 17.6267C9.38765 16.264 8.80986 15.7259 8.5443 15.5326C7.8075 14.9963 7 14.9035 7 13.7335C7 12.7762 7.74623 12.0002 8.66675 12.0002C9.32548 12.0266 9.92854 12.3088 10.4559 12.6927C10.7981 12.9418 11.1605 13.2711 11.5375 13.7047C11.9799 13.051 12.5131 12.2968 13.1107 11.5163C13.9787 10.3829 15.0032 9.16689 16.1019 8.11719C17.1819 7.08531 18.4306 6.11941 19.7542 5.60872C20.6172 5.27573 21.5764 5.73333 21.8966 6.63081Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.43961 12.0755C4.28117 12.0236 4.13796 11.9909 4.01252 11.9713C3.94995 11.9615 3.89226 11.955 3.83976 11.951L3.69887 11.9454C2.76061 11.9454 2 12.728 2 13.6933C2 14.5669 2.62294 15.2908 3.43675 15.4205C3.4652 15.4355 3.51137 15.4624 3.57407 15.5076C3.84474 15.7025 4.43367 16.2452 5.19686 17.6193C5.49542 18.1569 6.04811 18.4918 6.64983 18.4999C7.06202 18.5054 7.45518 18.3567 7.76226 18.0924M15 5.5C13.6509 6.015 12.3781 6.98904 11.2773 8.02963C10.8929 8.39299 10.5174 8.77611 10.1542 9.16884"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              {t('bookNow')}
            </Button>
          </Animated>
          {service.reduction > 0 ? renderPrice : renderPriceWithoutDiscount}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
};
