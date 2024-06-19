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
import { loginUser, resetPassword, selectAuthState, setUser } from 'src/redux/slices/AuthSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import useCustomToast from 'src/components/toast/useCustomToast';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthService from 'src/httpClient/services/AuthService';
import UserService from 'src/httpClient/services/UserService';

export default function ForgotPasswordView() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const navigate = useNavigate();
  const [shownForm, setShownForm] = useState<'EMAIL_FORM' | 'CODE_FORM' | 'PASSWORD_FORM'>(
    'EMAIL_FORM'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<any>({
    verificationCode: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const successToastArgs = {
    title: 'Verification code sent successfully',
    desc: 'Check your email',
    duration: 5000,
    isClosable: true,
  };
  const errorToastArgs = {
    title: 'Failed To send verification code',
    desc: 'Try again Later!',
    duration: 5000,
    isClosable: true,
  };

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authService = new AuthService();
      startLoading();
      const res = await authService.resetPassword(formData.email);
      if (res) {
        endLoading();
        toast({ ...successToastArgs, description: successToastArgs.desc, status: 'success' });
        setShownForm('CODE_FORM');
      } else {
        // Assuming you have access to error message from the rejected action payload
        const error = res;
        setError(error);
        endLoading();
        console.log(error);
        toast({ ...errorToastArgs, description: successToastArgs.desc, status: 'error' });
      }
    } catch (error) {
      endLoading();
      toast({
        title: 'Error occured!',
        description: 'Failed to Send code to email!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      // Handle any unexpected errors here
    }
  };

  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authService = new AuthService();
      startLoading();
      const data = await authService.checkCode(formData.verificationCode);
      if (data === true) {
        endLoading();
        toast({ ...successToastArgs, description: successToastArgs.desc, status: 'success' });
        setShownForm('PASSWORD_FORM');
      } else {
        endLoading();
        // Assuming you have access to error message from the rejected action payload
        const error = data as string;
        setError('Wrong verification code!');
        console.log(error);
        toast({ ...errorToastArgs, description: successToastArgs.desc, status: 'error' });
      }
    } catch (error) {
      endLoading();
      toast({
        title: 'Error occured!',
        description: 'Failed to Send code to email!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      // Handle any unexpected errors here
    }
  };

  const handleSubmitNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authService = new AuthService();
      const userService = new UserService();
      startLoading();
      const userId = (await userService.findByEmail(formData.email)).id;
      if (formData.password === formData.confirmPassword) {
        const res = await userService.updatePassword(formData.password, userId);
        if (res) {
          endLoading();
          toast({ ...successToastArgs, description: successToastArgs.desc, status: 'success' });
          navigate('/login');
        } else {
          endLoading();
          // Assuming you have access to error message from the rejected action payload
          setError('Failed to reset password!');
          console.log(error);
          toast({ ...errorToastArgs, description: successToastArgs.desc, status: 'error' });
        }
      } else {
        setError('Passwords are not matched!');
      }
    } catch (error) {
      endLoading();
      toast({
        title: 'Error occured!',
        description: 'Failed to Send code to email!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      // Handle any unexpected errors here
    }
  };
  const { t } = useTranslation();
  const renderVerificationCodeForm = (
    <form onSubmit={handleSubmitCode}>
      <Stack spacing={3}>
        <TextField
          type="number"
          name="verificationCode"
          label={'Verification Code'}
          value={formData.verificationCode}
          onChange={handleChange}
        />
        {error && <Typography color="error">{error}</Typography>}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          loading={isLoading}
        >
          {'Verify Now'}
        </LoadingButton>
      </Stack>
    </form>
  );

  const renderEnterNewPasswordForm = (
    <form onSubmit={handleSubmitNewPassword}>
      <Stack spacing={3}>
        <TextField
          type="password"
          name="password"
          label={'Password'}
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          type="password"
          name="confirmPassword"
          label={'Confirm Password'}
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {error && <Typography color="error">{error}</Typography>}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          loading={isLoading}
        >
          {'Submit'}
        </LoadingButton>
      </Stack>
    </form>
  );

  const renderEnterEmailForm = (
    <form onSubmit={handleSubmitEmail}>
      <Stack spacing={2}>
        <TextField
          type="email"
          name="email"
          label={'Email'}
          value={formData.email}
          onChange={handleChange}
        />
        {error && <Typography color="error">{error}</Typography>}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          loading={isLoading}
        >
          {'Verify Now'}
        </LoadingButton>
      </Stack>
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
          <Typography variant="h4">
            {shownForm === 'EMAIL_FORM'
              ? 'Enter your account Email'
              : shownForm === 'CODE_FORM'
              ? 'Enter verification code'
              : 'Reset your password'}
          </Typography>

          <Box marginTop={6}>
            {shownForm === 'EMAIL_FORM'
              ? renderEnterEmailForm
              : shownForm === 'CODE_FORM'
              ? renderVerificationCodeForm
              : renderEnterNewPasswordForm}
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}
