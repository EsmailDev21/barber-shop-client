import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ColorPicker } from 'src/components/color-utils';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectServicesState, setServices } from 'src/redux/slices/ServicesSlice';
import { selectReviewsState } from 'src/redux/slices/ReviewsSlice';

// ----------------------------------------------------------------------

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const PRICE_OPTIONS = [
  { value: 1, label: 'Below DT25' },
  { value: 2, label: 'Between DT25 - DT75' },
  { value: 3, label: 'Above DT75' },
];
export const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

export default function ServicesFilters({
  openFilter,
  onOpenFilter,
  onCloseFilter,
  services,
  setServices,
}) {
  const [genderOptions, setGenderOptions] = useState([]);
  const [priceOption, setPriceOption] = useState(null);
  const [ratingOption, setRatingOption] = useState('');

  const servicesState = useAppSelector(selectServicesState);
  const reviewsState = useAppSelector(selectReviewsState);
  const dispatch = useAppDispatch();

  // Store the original unfiltered data
  const originalServicesData = servicesState.data;

  const handleGenderChange = (event) => {
    const { value } = event.target;
    if (genderOptions.includes(value)) {
      setGenderOptions(genderOptions.filter((option) => option !== value));
    } else {
      setGenderOptions([...genderOptions, value]);
    }
  };

  const handlePriceChange = (event) => {
    const selectedPriceOption = event.target.value;
    setPriceOption(selectedPriceOption);

    let filteredData;
    if (selectedPriceOption === 1) {
      filteredData = originalServicesData.filter((s) => s.price < 25);
    } else if (selectedPriceOption === 2) {
      filteredData = originalServicesData.filter((s) => s.price >= 25 && s.price <= 75);
    } else {
      filteredData = originalServicesData.filter((s) => s.price > 75);
    }

    // Dispatch action to update the services state with the filtered data
    setServices(filteredData);
  };

  const handleRatingChange = (event) => {
    setRatingOption(event.target.value);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Gender</Typography>
              <FormGroup>
                {GENDER_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={genderOptions.includes(item)}
                        onChange={handleGenderChange}
                        value={item === 'Men' ? 'MALE' : item === 'Women' ? 'FEMALE' : 'KID'}
                      />
                    }
                    label={item}
                  />
                ))}
              </FormGroup>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2">Price</Typography>
              <RadioGroup value={priceOption} onChange={handlePriceChange}>
                {PRICE_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2">Rating</Typography>
              <RadioGroup value={ratingOption} onChange={handleRatingChange}>
                {RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                        sx={{
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                      />
                    }
                    label="& Up"
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      '&:hover': { opacity: 0.48 },
                    }}
                  />
                ))}
              </RadioGroup>
            </Stack>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            onClick={() => {
              setPriceOption(null);
              setServices(originalServicesData);
            }}
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

ServicesFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
