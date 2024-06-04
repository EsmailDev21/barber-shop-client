import { useState } from 'react';
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
import { banUser } from 'src/redux/slices/UsersSlice';
import { selectAuthState } from 'src/redux/slices/AuthSlice';
import { unbanUser } from '../../redux/slices/UsersSlice';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  photoUrl,
  gender,
  role,
  phoneNumber,
  isBanned,
  email,
  handleClick,
  id,
}) {
  const [open, setOpen] = useState(null);
  const { t } = useTranslation();
  const { data } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleBanUser = async (id: string) => {
    isBanned === false ? await dispatch(banUser(id)) : await dispatch(unbanUser(id));
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
            <Avatar alt={name} src={photoUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          {gender === 'MALE' ? t('male') : gender === 'FEMALE' ? t('female') : t('kid')}
        </TableCell>

        <TableCell>
          {role === 'ADMIN' ? t('admin') : role === 'BARBER' ? t('barber') : t('customer')}
        </TableCell>

        <TableCell align="center">{phoneNumber}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>
          <Label color={(isBanned === true && 'error') || 'success'}>
            {isBanned === true ? t('banned') : t('verified')}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {data.role === 'ADMIN' ? (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            {t('edit')}
          </MenuItem>

          <MenuItem
            onClick={() => handleBanUser(id)}
            sx={{ color: isBanned === false ? 'error.main' : 'success.main' }}
          >
            <Iconify icon="eva:lock-outline" sx={{ mr: 2 }} />
            {isBanned === true ? t('unban') : t('ban')}
          </MenuItem>
        </Popover>
      ) : null}
    </>
  );
}

UserTableRow.propTypes = {
  photoUrl: PropTypes.any,
  gender: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  phoneNumber: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
