import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import {
  Box,
  Link,
  Card,
  Stack,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { LoginDTO } from 'src/types/auth';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import {
  clearError,
  endLoading,
  loginUser,
  selectAuthState,
  setUser,
} from 'src/redux/slices/AuthSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import useCustomToast from 'src/components/toast/useCustomToast';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LoginView() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginDTO>({ email: '', password: '' });
  const successToastArgs = {
    title: 'Logged in successfully',
    desc: 'Welcome back!',
    duration: 5000,
    isClosable: true,
  };
  const errorToastArgs = {
    title: 'Failed To Login',
    desc: 'Try again Later!',
    duration: 5000,
    isClosable: true,
  };

  const toast = useToast();

  const { isLoading, error, data } = useAppSelector(selectAuthState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const clearState = () => {
      dispatch(endLoading());
      dispatch(clearError());
    };
    clearState();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser(formData));
      localStorage.setItem('USER_EMAIL', formData.email);
      if (loginUser.fulfilled.match(resultAction)) {
        toast({ ...successToastArgs, description: successToastArgs.desc, status: 'success' });

        navigate('/services');
      } else if (loginUser.rejected.match(resultAction)) {
        // Assuming you have access to error message from the rejected action payload
        const error = resultAction.payload as string;
        console.log(error);
        toast({ ...errorToastArgs, description: successToastArgs.desc, status: 'error' });
        navigate('/login');
      }
    } catch (error) {
      toast({
        title: 'Error occured!',
        description: 'Failed to login!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      // Handle any unexpected errors here
    }
  };

  useEffect(() => {
    const clearUserData = () => {
      dispatch(setUser(null));
    };
    clearUserData();
  }, []);
  const { t } = useTranslation();
  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label={t('emailAddress')}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link href={'/forgot-password'} variant="subtitle2" underline="hover">
          {t('forgotPassword')}
        </Link>
      </Stack>

      {error && <Typography color="error">{error}</Typography>}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={isLoading}
      >
        {t('login')}
      </LoadingButton>
    </form>
  );

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
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">{t('signInToBarberShop')}</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            {t('dontHaveAnAccount')}
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={() => router.push('/register')}>
              {t('getStarted')}
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
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
