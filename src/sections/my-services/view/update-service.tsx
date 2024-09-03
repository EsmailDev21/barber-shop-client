import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  Avatar,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { bgGradient } from 'src/theme/css';
import { HStack, useToast } from '@chakra-ui/react';
import {
  selectServicesState,
  updateService,
  uploadServiceImage,
} from 'src/redux/slices/ServicesSlice';
import { useTranslation } from 'react-i18next';

export default function UpdateServiceView({ service }) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { currentService, isLoading, error } = useAppSelector(selectServicesState);

  const [fileData, setFileData] = useState({ file: null });
  const [preview, setPreview] = useState(null);
  const toast = useToast();

  const handleChangePhoto = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileData({ file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const [formData, setFormData] = useState({
    duration: service.duration,
    name: service.name,
    note: service.note,
    price: service.price.toString(),
    reduction: service.reduction.toString(),
    genderType: service.genderType,
    imageUrl: currentService.imageUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitPhoto = async () => {
    const resultAction = await dispatch(uploadServiceImage(fileData));
    if (uploadServiceImage.fulfilled.match(resultAction)) {
      console.log(resultAction);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      updateService({
        data: {
          imageUrl: currentService?.imageUrl || '',
          price: parseFloat(formData.price),
          reduction: parseInt(formData.reduction),
          duration: formData.duration,
          name: formData.name,
          note: formData.note,
        },
        id: service.id,
      })
    ).unwrap();

    if (resultAction) {
      toast({
        title: t('success'),
        description: t('successfullyUpdatedService'),
        duration: 5000,
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    } else {
      toast({
        title: t('fail'),
        description: t('failedToUpdateService'),
        duration: 5000,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const fileInputRef = useRef(null);

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={{ p: 3, width: 1, maxWidth: 1000 }}>
          <Typography variant="h4" gutterBottom>
            {t('updateService')}
          </Typography>
          <Divider sx={{ my: 3 }} />
          <HStack spacing={50} w={'100%'}>
            <Stack direction="column" spacing={2} alignItems="center">
              <Avatar
                src={preview || currentService?.imageUrl || ''}
                alt="Service Picture"
                borderRadius={'lg'}
                sx={{ width: 200, height: 200, cursor: 'pointer' }}
                onClick={() => fileInputRef.current?.click()}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleChangePhoto}
              />
              <LoadingButton
                sx={{ mt: 3 }}
                fullWidth
                size="large"
                onClick={handleSubmitPhoto}
                variant="contained"
                color="primary"
                loading={isLoading}
              >
                {t('upload')}
              </LoadingButton>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack width={'600px'} spacing={3}>
                <TextField
                  fullWidth
                  label={t('serviceDesignation')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label={t('price')}
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label={t('durationInMin')}
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label={t('saleVal')}
                  name="reduction"
                  value={formData.reduction}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label={t('specialNote')}
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                />
              </Stack>
              <RadioGroup
                aria-label="genderType"
                name="genderType"
                value={formData.genderType}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="KID" control={<Radio />} label={t('kids')} />
                <FormControlLabel value="MALE" control={<Radio />} label={t('males')} />
                <FormControlLabel value="FEMALE" control={<Radio />} label={t('females')} />
              </RadioGroup>
              {error && <Typography color="error">{error}</Typography>}
              <LoadingButton
                sx={{ mt: 3 }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                loading={isLoading}
              >
                {t('updateNow')}
              </LoadingButton>
            </form>
          </HStack>
        </Card>
      </Stack>
    </Box>
  );
}
