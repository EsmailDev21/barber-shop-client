import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
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
import { selectAuthState } from 'src/redux/slices/AuthSlice';
import { bgGradient } from 'src/theme/css';
import { HStack, Image } from '@chakra-ui/react';
import { Service } from 'src/types/models';
import {
  createService,
  selectServicesState,
  uploadServiceImage,
} from 'src/redux/slices/ServicesSlice';
import { useTranslation } from 'react-i18next';

export default function AddServiceView() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const auth = useAppSelector(selectAuthState);
  const { data, isLoading, error, currentService } = useAppSelector(selectServicesState);
  const [fileData, setFileData] = useState<{ file: any }>({
    file: '',
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileData({
      file: file,
    });

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const [formData, setFormData] = useState({
    duration: '',
    name: '',
    note: '',
    price: '',
    reduction: '',
    genderType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitPhoto = async () => {
    const resultAction = await dispatch(uploadServiceImage(fileData));
    if (uploadServiceImage.fulfilled.match(resultAction)) {
      console.log(resultAction);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(
      createService({
        barberId: auth.data.id,
        imageUrl: currentService.imageUrl,
        price: parseFloat(formData.price),
        reduction: parseInt(formData.reduction),
        duration: formData.duration,
        name: formData.name,
        note: formData.note,
      })
    );
    if (createService.fulfilled.match(resultAction)) {
      return null;
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
        <Card
          sx={{
            p: 3,
            width: 1,
            maxWidth: 1000,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('newService')}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <HStack spacing={50} w={'100%'}>
            <Stack direction="column" spacing={2} alignItems="center">
              <Avatar
                src={
                  preview ||
                  'https://miro.medium.com/v2/resize:fit:1000/1*snM3JG_mRoN8rexOEZdiaQ.jpeg'
                }
                alt="Service Picture"
                borderRadius={'lg'}
                sx={{ width: 200, height: 200, cursor: 'pointer' }}
                onClick={() => fileInputRef.current?.click()}
              ></Avatar>
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
                      d="M17.4776 9.01106C17.485 9.01102 17.4925 9.01101 17.5 9.01101C19.9853 9.01101 22 11.0294 22 13.5193C22 15.8398 20.25 17.7508 18 18M17.4776 9.01106C17.4924 8.84606 17.5 8.67896 17.5 8.51009C17.5 5.46695 15.0376 3 12 3C9.12324 3 6.76233 5.21267 6.52042 8.03192M17.4776 9.01106C17.3753 10.1476 16.9286 11.1846 16.2428 12.0165M6.52042 8.03192C3.98398 8.27373 2 10.4139 2 13.0183C2 15.4417 3.71776 17.4632 6 17.9273M6.52042 8.03192C6.67826 8.01687 6.83823 8.00917 7 8.00917C8.12582 8.00917 9.16474 8.38194 10.0005 9.01101"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 13L12 21M12 13C11.2998 13 9.99153 14.9943 9.5 15.5M12 13C12.7002 13 14.0085 14.9943 14.5 15.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
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
                      d="M20.002 11V10C20.002 6.22876 20.002 4.34315 18.7615 3.17157C17.521 2 15.5245 2 11.5314 2H10.4726C6.47947 2 4.48293 2 3.24244 3.17157C2.00195 4.34315 2.00195 6.22876 2.00195 10V14C2.00195 17.7712 2.00195 19.6569 3.24244 20.8284C4.48293 22 6.47946 22 10.4726 22H11.002"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7.00195 7H15.002"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7.00195 12H15.002"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20.8624 14.4393L21.5567 15.1317C22.1441 15.7175 22.1441 16.6672 21.5567 17.253L17.9192 20.9487C17.6331 21.234 17.2671 21.4264 16.8693 21.5005L14.6149 21.9885C14.259 22.0656 13.942 21.7504 14.0183 21.3952L14.4981 19.1599C14.5724 18.7632 14.7653 18.3982 15.0515 18.1129L18.7352 14.4393C19.3226 13.8536 20.275 13.8536 20.8624 14.4393Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                {t('createNow')}
              </LoadingButton>
            </form>
          </HStack>
        </Card>
      </Stack>
    </Box>
  );
}
