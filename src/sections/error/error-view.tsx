import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import Logo from 'src/components/logo';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { clearError, selectAuthState } from 'src/redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { selectUsersState, clearError as clearUserError } from 'src/redux/slices/UsersSlice';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

export default function ErrorView() {
  const authError = useAppSelector(selectAuthState).error;
  const usersError = useAppSelector(selectUsersState).error;
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const errorSetter = () => {
      if (authError) {
        setError(authError);
      }
      if (usersError) {
        setError(usersError);
      }
      if (authError && usersError) {
        setError(authError + ' ' + usersError);
      }
    };
    errorSetter();
  }, []);
  console.log(error);
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      <Logo />
    </Box>
  );

  function handleClick(): void {
    dispatch(clearError());
    dispatch(clearUserError());
    navigate('/');
  }

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            {t('error1')}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>{error}</Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button
            onClick={handleClick}
            href="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            {t('back')}
          </Button>
        </Box>
      </Container>
    </>
  );
}
