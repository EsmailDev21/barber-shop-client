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
  Avatar,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

import { SignupDTO } from 'src/types/auth';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { registerUser, selectAuthState, uploadProfilePicture } from 'src/redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import UserService from 'src/httpClient/services/UserService';

export default function UploadProfilePhotoView() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const naviate = useNavigate();

  const [formData, setFormData] = useState<{ file: string }>({
    file: '',
  });

  const userState = useAppSelector(selectAuthState);
  const [preview, setPreview] = useState<string | null>(null);

  const { isLoading, error } = useAppSelector(selectAuthState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      [e.target.name]: file,
    });

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(uploadProfilePicture(formData));
    if (uploadProfilePicture.fulfilled.match(resultAction)) {
      console.log(resultAction);
    }
  };

  const renderForm = (
    <form
      onSubmit={(e) =>
        handleSubmit(e).then(async () => {
          const userService = new UserService();
          console.log(userState.data.id);
          const updateUserPhoto = await userService.updateRecord(
            { photoUrl: userState.data.photoUrl },
            userState.data.id
          );
          if (updateUserPhoto) {
            naviate('/login');
          }
        })
      }
    >
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        borderColor={'InfoText'}
        style={{ borderWidth: '2px' }}
        spacing={3}
      >
        {preview && <Avatar src={preview} style={{ height: '200px', width: '200px' }}></Avatar>}
        <TextField type="file" name="file" label="Profile picture" onChange={handleChange} />
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
        Submit
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
            p: 3,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Upload a profile picture</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={() => naviate('/login')}>
              Login
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}></Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
