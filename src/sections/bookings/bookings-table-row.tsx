import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { banUser, selectUsersState } from 'src/redux/slices/UsersSlice';
import { selectAuthState } from 'src/redux/slices/AuthSlice';
import { selectServicesState } from 'src/redux/slices/ServicesSlice';
import { fDate, fDateTime } from 'src/utils/format-time';
import {
  changeBookingStatus,
  deleteBooking,
  selectBookingsState,
  updateBooking,
} from 'src/redux/slices/BookingsSlice';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

type BookingsTableRowProps = {
  selected: boolean;
  serviceId: string;
  date: Date;
  customerId: string;
  status: string;
  handleClick: () => void;
  id: string;
};
export default function BookingsTableRow({
  selected,
  serviceId,
  date,
  customerId,
  status,
  handleClick,
  id,
}) {
  const [open, setOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoading } = useAppSelector(selectBookingsState);
  const { data } = useAppSelector(selectAuthState);
  const servicesState = useAppSelector(selectServicesState);
  const usersState = useAppSelector(selectUsersState);
  const service = servicesState.data.find((i) => i.id === serviceId);
  const customer = usersState.data.find((i) => i.id === customerId);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleChangeStatus = (event, newStatus) => {
    // Check if the button is disabled
    if (buttonStates[newStatus]) {
      // If the button is disabled, return early without performing any action
      return;
    }

    // Handle status change logic here
    console.log('New status selected:', newStatus);
    console.log(id);

    switch (newStatus) {
      case 'Confirm':
        dispatch(changeBookingStatus({ data: { status: 'CONFIRMED' }, id }));
        break;
      case 'Refuse':
        dispatch(changeBookingStatus({ data: { status: 'REFUSED' }, id }));
        break;
      case 'Cancel':
        data.role === 'BARBER'
          ? dispatch(changeBookingStatus({ data: { status: 'CANCELLED_BY_BARBER' }, id }))
          : dispatch(changeBookingStatus({ data: { status: 'CANCELLED_BY_CUSTOMER' }, id }));
        break;
      case 'Done':
        dispatch(changeBookingStatus({ data: { status: 'DONE' }, id }));
        break;
      default:
        break;
    }

    handleCloseMenu();
  };

  const handleDelete = async (bookingId: string) => {
    await dispatch(deleteBooking(bookingId));
    handleCloseMenu();
  };

  const buttonStates = {
    CONFIRMED: { Confirm: true, Refuse: true },
    CANCELLED_BY_BARBER: { Confirm: true, Refuse: true, Cancel: true, Done: true },
    CANCELLED_BY_CUSTOMER: { Confirm: true, Refuse: true, Cancel: true, Done: true },
    REFUSED: { Confirm: true, Refuse: true, Cancel: true, Done: true },
    DONE: { Confirm: true, Refuse: true, Cancel: true, Done: true },
    PENDING: { Cancel: true, Done: true },
  };
  const getStatusOptions = () => {
    if (data.role === 'BARBER') {
      return [
        {
          label: 'Confirm',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              width={18}
              height={18}
              color={'#4C86FF'}
              fill={'none'}
            >
              <path
                d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        },
        {
          label: 'Refuse',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              width={18}
              height={18}
              color={'#4C86FF'}
              fill={'none'}
            >
              <path
                d="M20.9977 12.5C20.9977 12.5 21 12.0307 21 11.5C21 7.02166 21 4.78249 19.6088 3.39124C18.2175 2 15.9783 2 11.5 2C7.02166 2 4.78249 2 3.39124 3.39124C2 4.78249 2 7.02166 2 11.5C2 15.9783 2 18.2175 3.39124 19.6088C4.78249 21 7.02166 21 11.5 21C12.0307 21 12.5 20.9977 12.5 20.9977"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M2 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path
                d="M10 16H11.5M6 16H7M10 12H16M6 12H7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 16L19 19M19 19L22 22M19 19L16 22M19 19L22 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        },
        {
          label: 'Cancel',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              width={18}
              height={18}
              color={'#4C86FF'}
              fill={'none'}
            >
              <path
                d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        },
        {
          label: 'Done',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              width={18}
              height={18}
              color={'#4C86FF'}
              fill={'none'}
            >
              <path
                d="M3 13.3333C3 13.3333 4.5 14 6.5 17C6.5 17 6.78485 16.5192 7.32133 15.7526M17 6C14.7085 7.14577 12.3119 9.55181 10.3879 11.8223"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 13.3333C8 13.3333 9.5 14 11.5 17C11.5 17 17 8.5 22 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        },
      ];
    }
    return [
      {
        label: 'Cancel',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            width={18}
            height={18}
            color={'#4C86FF'}
            fill={'none'}
          >
            <path
              d="M20.9977 12.5C20.9977 12.5 21 12.0307 21 11.5C21 7.02166 21 4.78249 19.6088 3.39124C18.2175 2 15.9783 2 11.5 2C7.02166 2 4.78249 2 3.39124 3.39124C2 4.78249 2 7.02166 2 11.5C2 15.9783 2 18.2175 3.39124 19.6088C4.78249 21 7.02166 21 11.5 21C12.0307 21 12.5 20.9977 12.5 20.9977"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M2 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path
              d="M10 16H11.5M6 16H7M10 12H16M6 12H7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 16L19 19M19 19L22 22M19 19L16 22M19 19L22 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    ];
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={service != undefined ? service.name : 'service_image'}
              src={service != undefined ? service.imageUrl : 'service_image'}
            />
            <Typography variant="subtitle2" noWrap>
              {service != undefined ? service.name : 'service_name'}
            </Typography>
          </Stack>
        </TableCell>

        {
          //<TableCell>{gender === 'MALE' ? 'Male' : gender === 'FEMALE' ? 'Female' : 'Kid'}</TableCell>
        }
        <TableCell>
          {data.role === 'BARBER'
            ? customer.name
            : usersState.data.find(
                (u) => servicesState.data.find((s) => s.id === serviceId).barberId === u.id
              ).name}
        </TableCell>

        <TableCell align="center">
          {data.role === 'BARBER'
            ? customer.phoneNumber
            : usersState.data.find(
                (u) => servicesState.data.find((s) => s.id === serviceId).barberId === u.id
              ).phoneNumber}
        </TableCell>
        <TableCell>{fDateTime(date)}</TableCell>
        <TableCell>
          <Label
            color={
              status === 'CANCELLED_BY_CUSTOMER' || status === 'CANCELLED_BY_BARBER'
                ? 'warning'
                : status === 'PENDING'
                ? 'info'
                : status === 'REFUSED'
                ? 'error'
                : status === 'CONFIRMED' || status === 'DONE'
                ? 'success'
                : 'info'
            }
          >
            {t(status.toLowerCase()).toLocaleLowerCase()}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { width: 140 } }}
      >
        {getStatusOptions().map((option) => (
          <MenuItem
            disabled={buttonStates[status]?.[option.label]}
            key={option.label}
            onClick={(event) => handleChangeStatus(event, option.label)}
          >
            <LoadingButton
              sx={{ width: '100%' }}
              disabled={buttonStates[status]?.[option.label]}
              isLoading={isLoading}
              endIcon={option.icon}
            >
              {t(option.label.toLowerCase())}
            </LoadingButton>
          </MenuItem>
        ))}
        <MenuItem onClick={() => handleDelete(id)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:lock-outline" sx={{ mr: 2 }} />
          {t('delete')}
        </MenuItem>
      </Popover>
    </>
  );
}
