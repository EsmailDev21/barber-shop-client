import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import Iconify from 'src/components/iconify';
import { User } from 'src/types/models';

// ----------------------------------------------------------------------

type BarbersSearchProps = {
  searchValue: string;
  onSearchChange: (inputValue: string) => void;
  barbers: User[];
};

export default function BarberSearch({ searchValue, onSearchChange, barbers }: BarbersSearchProps) {
  const suggestions = barbers.reduce((acc, barber) => {
    const { name, city, address } = barber;
    if (name) acc.push(name);
    if (city) acc.push(city);
    if (address) acc.push(address);
    return acc;
  }, []);

  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      inputValue={searchValue}
      onInputChange={(event, newInputValue) => {
        onSearchChange(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search barbers..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
          sx={{ width: 280 }}
        />
      )}
    />
  );
}

BarberSearch.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  barbers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      photoUrl: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
    })
  ).isRequired,
};
