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

import Scrollbar from 'src/components/scrollbar';
import TableNoData from '../table-no-data';
import BookingsTableRow from '../reports-table-row';
import BookingsTableHead from '../reports-table-head';
import TableEmptyRows from '../table-empty-rows';
import BookingsTableToolbar from '../reports-table-toolbar';
import { emptyRows, getComparator } from '../utils';
import { useAppSelector } from 'src/redux/hooks';
import { selectAuthState } from 'src/redux/slices/AuthSlice';
import { selectBookingsState } from 'src/redux/slices/BookingsSlice';
import { selectServicesState } from 'src/redux/slices/ServicesSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function ReportsView() {
  const { data } = useAppSelector(selectBookingsState);
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

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('title');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = barberBookings.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  // Filter service name to ID map
  const filteredServices = servicesState.data.filter((service) =>
    service.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const filteredServiceIds = filteredServices.map((service) => service.id);

  // Filter bookings based on filtered service IDs
  const dataFiltered =
    filterName.length > 0
      ? barberBookings.filter((booking) => filteredServiceIds.includes(booking.serviceId))
      : barberBookings;

  // Sort bookings based on the selected column
  const sortedBookings = dataFiltered.sort(getComparator(order, orderBy));

  const notFound = !sortedBookings.length && !!filterName;

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
                {sortedBookings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BookingsTableRow
                      id={row.id}
                      key={row.id}
                      status={row.status}
                      customerId={row.customerId}
                      date={row.date}
                      serviceId={row.serviceId}
                      selected={selected.indexOf(row.id) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
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
          count={sortedBookings.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
