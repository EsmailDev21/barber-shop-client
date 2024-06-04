import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import BarberSearch from '../barber-search';
import { useAppSelector } from 'src/redux/hooks';
import { selectUsersState } from 'src/redux/slices/UsersSlice';
import BarberCard from '../barber-card';

// ----------------------------------------------------------------------

export default function BarbersView() {
  const barbers = useAppSelector(selectUsersState).data.filter((b) => b.role === 'BARBER');
  const [filteredBarbers, setFilteredBarbers] = useState(barbers);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setFilteredBarbers(
      barbers.filter((barber) =>
        [barber.name, barber.city, barber.address]
          .filter(Boolean) // Filter out null or undefined values
          .some((field) => field.toLowerCase().includes(searchValue.toLowerCase()))
      )
    );
  }, [searchValue, barbers]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Barbers</Typography>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <BarberSearch onSearchChange={setSearchValue} searchValue={searchValue} barbers={barbers} />
      </Stack>

      <Grid container spacing={10}>
        {filteredBarbers.map((barber) => (
          <BarberCard key={barber.id} data={barber} />
        ))}
      </Grid>
    </Container>
  );
}
