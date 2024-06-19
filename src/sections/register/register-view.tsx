import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import {
  Box,
  Link,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

import { SignupDTO } from 'src/types/auth';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { registerUser, selectAuthState } from 'src/redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function RegisterView() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignupDTO>({
    email: '',
    password: '',
    role: 'CUSTOMER',
    name: '',
    phoneNumber: '',
    gender: 'MALE',
  });

  const { isLoading, error } = useAppSelector(selectAuthState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      role: e.target.value as 'CUSTOMER' | 'BARBER',
    });
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      gender: e.target.value as 'MALE' | 'FEMALE' | 'KID',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('USER_EMAIL', formData.email);
    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/verify-account');
    }
  };
  const { t } = useTranslation();
  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          name="name"
          label={t('nameSurname')}
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="my-email@example.com"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="phoneNumber"
          label={t('phoneNumber')}
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <Stack direction={'row'} spacing={3}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{t('role')}</FormLabel>
            <RadioGroup row name="role" value={formData.role} onChange={handleRoleChange}>
              <FormControlLabel value="CUSTOMER" control={<Radio />} label={t('customer')} />
              <FormControlLabel value="BARBER" control={<Radio />} label={t('barber')} />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">{t('gender')}</FormLabel>
            <RadioGroup row name="gender" value={formData.gender} onChange={handleGenderChange}>
              <FormControlLabel value="MALE" control={<Radio />} label={t('male')} />
              <FormControlLabel value="FEMALE" control={<Radio />} label={t('female')} />
              <FormControlLabel value="KID" control={<Radio />} label={t('kid')} />
            </RadioGroup>
          </FormControl>
        </Stack>
      </Stack>

      {error && <Typography color="error">{error}</Typography>}

      <LoadingButton
        style={{ marginTop: '30px' }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={isLoading}
      >
        {t('register')}
      </LoadingButton>
    </form>
  );

  return (
    <Box
      padding={2}
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack
        height={'90vh'}
        style={{ scrollBehavior: 'smooth' }}
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1 }}
      >
        <Card
          sx={{
            p: 3,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">{t('registerToBarberShop')}</Typography>

          <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
            {t('alreadyHaveAccount')}
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={() => navigate('/login')}>
              {t('login')}
            </Link>
          </Typography>

          <Divider sx={{ my: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('or')}
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
