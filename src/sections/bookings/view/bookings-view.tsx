import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

//import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import BookingsTableRow from '../bookings-table-row';
import BookingsTableHead from '../bookings-table-head';
import TableEmptyRows from '../table-empty-rows';
import BookingsTableToolbar from '../bookings-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { useAppSelector } from 'src/redux/hooks';
import { selectUsersState } from 'src/redux/slices/UsersSlice';
import { selectAuthState } from 'src/redux/slices/AuthSlice';
import { selectBookingsState } from 'src/redux/slices/BookingsSlice';
import { selectServicesState } from 'src/redux/slices/ServicesSlice';
import { services } from 'src/_mock/services';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function BookingsView() {
  const { data, isLoading, error } = useAppSelector(selectBookingsState);
  const servicesState = useAppSelector(selectServicesState);
  const role = useAppSelector(selectAuthState).data.role;
  const userId = useAppSelector(selectAuthState).data.id;
  const { t } = useTranslation();
  let barberBookings =
    role === 'BARBER'
      ? servicesState.data
          .filter((s) => s.barberId === userId)
          .flatMap((s) => data.filter((b) => b.serviceId === s.id))
      : data.filter((b) => b.customerId === userId);

  console.log(barberBookings);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = barberBookings.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: barberBookings,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Bookings</Typography>

        <Button onClick={() => navigate('/services')} variant="contained" color="inherit">
          {t('newBooking')}
        </Button>
      </Stack>

      <Card>
        <BookingsTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <BookingsTableHead
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'service', label: t('service') },
                  { id: 'customer', label: role === 'BARBER' ? t('customer') : t('barber') },
                  { id: 'phoneNumber', label: t('phoneNumber'), align: 'center' },
                  { id: 'date', label: t('date') },
                  { id: 'status', label: t('status') },
                  { id: 'actions', label: 'Actions' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BookingsTableRow
                      id={row.id}
                      key={row.id}
                      status={row.status}
                      customerId={row.customerId}
                      date={row.date}
                      serviceId={row.serviceId}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, data.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={barberBookings.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
