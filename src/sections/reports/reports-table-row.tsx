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

type ReportsTableRowProps = {
  selected: boolean;
  reporterId: string;
  date: Date;
  reportedId: string;
  title: string;
  reason: string;
  handleClick: () => void;
  id: string;
};
export default function ReportsTableRow({
  selected,
  reporterId,
  date,
  reportedId,
  title,
  reason,
  handleClick,
  id,
}) {
  const [open, setOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoading } = useAppSelector(selectBookingsState);
  const { data } = useAppSelector(selectAuthState);
  const servicesState = useAppSelector(selectServicesState);
  const usersState = useAppSelector(selectUsersState);
  const reported = usersState.data.find((i) => i.id === reportedId);
  const reporter = usersState.data.find((i) => i.id === reporterId);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  console.log(id);

  const handleDelete = async (bookingId: string) => {
    await dispatch(deleteBooking(bookingId));
    handleCloseMenu();
  };

  const handleBan = async (id: string) => {
    await dispatch(banUser(id));
    handleCloseMenu();
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
              alt={reported != undefined ? reported.name : 'reportedImage'}
              src={reported != undefined ? reported.photoUrl : 'reportedImage'}
            />
            <Typography variant="subtitle2" noWrap>
              {reported != undefined ? reported.name : 'reported name'}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={reporter != undefined ? reporter.name : 'reporterImage'}
              src={reporter != undefined ? reporter.photoUrl : 'reporterImage'}
            />
            <Typography variant="subtitle2" noWrap>
              {reporter != undefined ? reporter.name : 'reporter name'}
            </Typography>
          </Stack>
        </TableCell>

        {
          //<TableCell>{gender === 'MALE' ? 'Male' : gender === 'FEMALE' ? 'Female' : 'Kid'}</TableCell>
        }

        <TableCell>{fDateTime(date)}</TableCell>
        <TableCell>
          <Label color={'error'}>{title}</Label>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {reason}
          </Typography>
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
        <MenuItem onClick={() => handleBan(reportedId)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:lock-outline" sx={{ mr: 2 }} />
          {'Ban reported User'}
        </MenuItem>
        <MenuItem onClick={() => handleDelete(id)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-outline" sx={{ mr: 2 }} />
          {t('delete')}
        </MenuItem>
      </Popover>
    </>
  );
}
