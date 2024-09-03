import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ShopServiceSort from '../services-sort';
import ServicesFilters from '../services-filters';

import ShopServiceCard from '../service-card';
import ServiceCartWidget from '../service-cart-widget';
import { Button, InputAdornment, OutlinedInput, Menu, MenuItem } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useAppSelector } from 'src/redux/hooks';
import { selectServicesState } from 'src/redux/slices/ServicesSlice';
import { selectAuthState } from 'src/redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { selectUsersState } from 'src/redux/slices/UsersSlice';

// ----------------------------------------------------------------------

export default function ServicesView() {
  const { t } = useTranslation();
  const { data } = useAppSelector(selectServicesState);
  const role = useAppSelector(selectAuthState).data?.role || 'CUSTOMER';
  const barbers = useAppSelector(selectUsersState).data.filter((u) => u.role === 'BARBER');

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data || []);
  const [searchFilter, setSearchFilter] = useState('Service Name');
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleNavigateAddService = () => {
    navigate('/services/new');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredServices = data.filter((service) => {
        if (searchFilter === 'Service Name') {
          return service.name.toLowerCase().includes(query.toLowerCase());
        } else if (searchFilter === 'Barber Name') {
          const barber = barbers.find((b) => b.id === service.barberId);
          return barber?.name.toLowerCase().includes(query.toLowerCase());
        } else if (searchFilter === 'Service Price') {
          return service.price.toString().toLowerCase().includes(query.toLowerCase());
        } else if (searchFilter === 'Service Duration') {
          return service.duration.toString().toLowerCase().includes(query.toLowerCase());
        }
        return false;
      });
      setFilteredData(filteredServices);
    } else {
      setFilteredData(data); // Reset to full data if search query is empty
    }
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filter) => {
    setSearchFilter(filter);
    setAnchorEl(null);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('ourServices')}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1}>
          <OutlinedInput
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t(`Search by ${searchFilter}`) + '...'}
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleFilterClick}
            endIcon={<Iconify icon="eva:arrow-down-fill" />}
          >
            {t(`Filter: ${searchFilter}`)}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleFilterClose(searchFilter)}
          >
            <MenuItem onClick={() => handleFilterClose('Service Name')}>
              {t('Service Name')}
            </MenuItem>
            <MenuItem onClick={() => handleFilterClose('Barber Name')}>{t('Barber Name')}</MenuItem>
            <MenuItem onClick={() => handleFilterClose('Service Price')}>
              {t('Service Price')}
            </MenuItem>
            <MenuItem onClick={() => handleFilterClose('Service Duration')}>
              {t('Service Duration')}
            </MenuItem>
            {/* Add more filter options as needed */}
          </Menu>
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
        {Array.isArray(filteredData)
          ? filteredData.map((service) => (
              <Grid key={service.id} xs={12} sm={6} md={3}>
                <ShopServiceCard service={service} />
              </Grid>
            ))
          : null}
      </Grid>

      <ServiceCartWidget />
    </Container>
  );
}
