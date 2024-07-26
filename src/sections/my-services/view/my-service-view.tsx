import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { Button } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useAppSelector } from 'src/redux/hooks';
import { selectServicesState } from 'src/redux/slices/ServicesSlice';
import { selectAuthState } from 'src/redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShopServiceCard from 'src/sections/products/service-card';
import ServiceCartWidget from 'src/sections/products/service-cart-widget';
import ServicesFilters from 'src/sections/products/services-filters';
import ShopServiceSort from 'src/sections/products/services-sort';
import BarberServiceCard from '../BarberServiceCard';

// ----------------------------------------------------------------------

export default function ServicesView() {
  const { t } = useTranslation();
  const [openFilter, setOpenFilter] = useState(false);
  const { data } = useAppSelector(selectServicesState);
  const role = useAppSelector(selectAuthState).data?.role || 'CUSTOMER';
  const barberId = useAppSelector(selectAuthState).data?.id;

  const [dataFiltered, setDataFiltered] = useState(false);
  const navigate = useNavigate();
  const handleNavigateAddService = () => {
    navigate('/services/new');
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('myServices')}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ServicesFilters
            dataFiltered={dataFiltered}
            setDataFiltered={setDataFiltered}
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ShopServiceSort />
        </Stack>
        {role === 'BARBER' ? (
          <Button
            onClick={handleNavigateAddService}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            {t('newService')}
          </Button>
        ) : null}
      </Stack>

      <Grid container spacing={5}>
        {data
          ? data
              .filter((s) => s.barberId === barberId)
              .map((service) => (
                <Grid key={service.id} xs={12} sm={6} md={3}>
                  <BarberServiceCard service={service} />
                </Grid>
              ))
          : null}
      </Grid>

      <ServiceCartWidget />
    </Container>
  );
}
