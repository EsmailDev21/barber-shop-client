'use client';

import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Badge,
  Stack,
  Modal,
  Backdrop,
  Fade,
  TextField,
  styled,
  Grid,
  Container,
} from '@mui/material';
import { User } from 'src/types/models';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectServicesState } from 'src/redux/slices/ServicesSlice';
import ShopServiceCard from '../products/service-card';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'green',
    color: 'green',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

type BarberCardProps = {
  data: User;
};

export default function BarberCard({ data }: BarberCardProps) {
  const [open, setOpen] = useState(false);
  const barberServices = useAppSelector(selectServicesState).data.filter(
    (s) => s.barberId === data.id
  );
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="center" py={6} mx={3}>
      <Card sx={{ width: 250, textAlign: 'center', boxShadow: 24, p: 2 }}>
        <CardContent>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar src={data.photoUrl} alt={data.name} sx={{ width: 80, height: 80, mb: 2 }} />
          </StyledBadge>
          <Typography variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            +216 {data.phoneNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.address}
            <Typography variant="body2" color="primary">
              {data.city}
            </Typography>
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
            <Badge badgeContent={data.gender} color="primary" sx={{ p: 1, borderRadius: 1 }} />
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOpen}
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={'#ffffff'}
                fill={'none'}
              >
                <path
                  d="M15 7.5C15 7.5 15.5 7.5 16 8.5C16 8.5 17.5882 6 19 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 7C22 9.76142 19.7614 12 17 12C14.2386 12 12 9.76142 12 7C12 4.23858 14.2386 2 17 2C19.7614 2 22 4.23858 22 7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3.60746 21.0095L4.07229 20.4209L3.60746 21.0095ZM3.0528 20.4875L3.61262 19.9884L3.0528 20.4875ZM20.9472 20.4875L20.3874 19.9884L20.9472 20.4875ZM20.3925 21.0095L19.9277 20.4209L20.3925 21.0095ZM3.60746 6.99127L3.14263 6.40268L3.60746 6.99127ZM3.0528 7.5133L3.61262 8.0124L3.0528 7.5133ZM22.75 13.2445C22.7493 12.8302 22.4129 12.495 21.9987 12.4958C21.5845 12.4965 21.2493 12.8329 21.25 13.2471L22.75 13.2445ZM9.06582 6.75292C9.48003 6.75057 9.81391 6.41289 9.81157 5.99869C9.80922 5.58448 9.47154 5.2506 9.05734 5.25294L9.06582 6.75292ZM13.5 21.2504H10.5V22.7504H13.5V21.2504ZM10.5 21.2504C8.60311 21.2504 7.24353 21.2493 6.19895 21.1313C5.16816 21.0148 4.54359 20.7931 4.07229 20.4209L3.14263 21.5981C3.926 22.2168 4.86842 22.4905 6.03058 22.6218C7.17896 22.7515 8.63832 22.7504 10.5 22.7504V21.2504ZM1.25 14.0004C1.25 15.7493 1.24857 17.1321 1.38762 18.2226C1.52932 19.3337 1.82681 20.2394 2.49298 20.9866L3.61262 19.9884C3.22599 19.5547 2.99708 18.9856 2.87558 18.0328C2.75143 17.0593 2.75 15.789 2.75 14.0004H1.25ZM4.07229 20.4209C3.90545 20.2892 3.7517 20.1444 3.61262 19.9884L2.49298 20.9866C2.69068 21.2084 2.90811 21.4129 3.14263 21.5981L4.07229 20.4209ZM21.25 14.0004C21.25 15.789 21.2486 17.0593 21.1244 18.0328C21.0029 18.9856 20.774 19.5547 20.3874 19.9884L21.507 20.9866C22.1732 20.2394 22.4707 19.3337 22.6124 18.2226C22.7514 17.1321 22.75 15.7493 22.75 14.0004H21.25ZM13.5 22.7504C15.3617 22.7504 16.821 22.7515 17.9694 22.6218C19.1316 22.4905 20.074 22.2168 20.8574 21.5981L19.9277 20.4209C19.4564 20.7931 18.8318 21.0148 17.801 21.1313C16.7565 21.2493 15.3969 21.2504 13.5 21.2504V22.7504ZM20.3874 19.9884C20.2483 20.1444 20.0946 20.2892 19.9277 20.4209L20.8574 21.5981C21.0919 21.4129 21.3093 21.2084 21.507 20.9866L20.3874 19.9884ZM10.5 21.2504C12.3969 21.2504 13.7565 21.2493 14.801 21.1313C15.8318 21.0148 16.4564 20.7931 16.9277 20.4209L15.8574 19.5981C15.6241 19.7766 15.4129 19.9098 15.1989 20.0019C14.7593 20.1842 14.2069 20.2504 13.5 20.2504V21.7504C14.2069 21.7504 14.7593 21.8167 15.1989 21.999C15.4129 22.0911 15.6241 22.2244 15.8574 22.4029L16.9277 21.5999C16.4564 21.2277 15.8318 21.006 14.801 20.8895C13.7565 20.7715 12.3969 20.7704 10.5 20.7704V21.2504ZM19.9277 20.4209C19.4564 20.7931 18.8318 21.0148 17.801 21.1313C16.7565 21.2493 15.3969 21.2504 13.5 21.2504V22.7504C15.3969 22.7504 16.7565 22.7515 17.801 22.6218C18.8318 22.4905 19.4564 22.2168 19.9277 21.5981L20.8574 22.6029C20.3093 22.9952 19.1316 23.2755 17.9694 23.3719C16.7916 23.469 15.3338 23.469 13.5 23.469V21.969C15.3338 21.969 16.7916 21.969 17.9694 21.8725C19.1316 21.7761 20.3093 21.4958 20.8574 21.1025L19.9277 20.4209ZM19.9277 20.4209C20.0946 20.2892 20.2483 20.1444 20.3874 19.9884L21.507 20.9866C21.3093 21.2084 21.0919 21.4129 20.8574 21.5981L19.9277 20.4209ZM13.5 21.2504V20.2504H10.5V21.2504H13.5ZM17.9694 21.8725C16.7916 21.969 15.3338 21.969 13.5 21.969V20.469C15.3338 20.469 16.7916 20.469 17.9694 20.3725C19.1316 20.2761 20.3093 19.9958 20.8574 19.6025L21.507 20.9866C21.4707 20.8966 21.4348 20.8062 21.3993 20.7155C20.9268 19.5728 19.9503 18.3241 18.5 17.2109V18.7383C20.0435 19.8838 21.0513 21.0775 21.6224 22.0172C21.6887 22.1274 21.7538 22.2345 21.8182 22.3381C21.8187 22.3389 21.8191 22.3397 21.8196 22.3405L22.75 21.0989C21.8182 19.9146 20.0435 18.7614 18.5 17.6168V18.7383C18.5 18.7613 18.5001 18.7843 18.5 18.8073V19.3295C18.5 19.3524 18.5001 19.3753 18.5 19.3982V21.0994L18.5 21.6168L17.9694 21.8725ZM20.8574 21.1025C21.0048 20.9565 21.1371 20.8115 21.2574 20.669C21.3703 20.5372 21.4743 20.4093 21.5704 20.2859C21.6218 20.2212 21.6709 20.1593 21.7172 20.1008L20.8574 21.1025ZM20.3874 19.9884C20.1294 20.2623 19.8632 20.5344 19.5878 20.8038L18.9214 20.0175L20.3874 19.9884ZM21.2574 20.669C21.0655 20.8673 20.859 21.0535 20.6424 21.2315L19.5143 20.2454L21.2574 20.669ZM3.14263 21.5981C4.43029 22.5085 6.0566 22.8712 7.72289 23.0269C8.82082 23.1201 10.322 23.1286 12 23.1286C13.678 23.1286 15.1792 23.1201 16.2771 23.0269C17.9434 22.8712 19.5697 22.5085 20.8574 21.5981L21.8182 22.3381C20.5303 23.2485 18.504 23.6776 16.469 23.8311C15.1925 23.9284 13.6037 23.9284 12 23.9284C10.3963 23.9284 8.80747 23.9284 7.531 23.8311C5.496 23.6776 3.46971 23.2485 2.18189 22.3381L3.14263 21.5981ZM7.72289 23.0269C6.0566 22.8712 4.43029 22.5085 3.14263 21.5981L2.18189 22.3381C3.46971 23.2485 5.496 23.6776 7.531 23.8311C8.80747 23.9284 10.3963 23.9284 12 23.9284C13.6037 23.9284 15.1925 23.9284 16.469 23.8311C18.504 23.6776 20.5303 23.2485 21.8182 22.3381L20.8574 21.5981C19.5697 22.5085 17.9434 22.8712 16.2771 23.0269C15.1792 23.1201 13.678 23.1286 12 23.1286C10.322 23.1286 8.82082 23.1201 7.72289 23.0269Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Book a service now
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Container
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              bgcolor: 'background.paper',
              borderRadius: '20px',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Book a Service
            </Typography>
            <Grid container spacing={20}>
              {barberServices
                ? barberServices.map((service) => (
                    <Grid key={service.id} xs={12} sm={6} md={3}>
                      <ShopServiceCard service={service} />
                    </Grid>
                  ))
                : null}
            </Grid>
          </Container>
        </Fade>
      </Modal>
    </Box>
  );
}
