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
import { useAppSelector } from 'src/redux/hooks';
import { selectAuthState } from 'src/redux/slices/AuthSlice';
import { selectBookingsState } from 'src/redux/slices/BookingsSlice';
import { selectServicesState } from 'src/redux/slices/ServicesSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReportsTableToolbar from '../reports-table-toolbar';
import ReportsTableHead from '../reports-table-head';
import ReportsTableRow from '../reports-table-row';
import { selectReportsState } from 'src/redux/slices/ReportsSlice';
import { applyFilter, emptyRows, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ReportsView() {
  const { data } = useAppSelector(selectReportsState);
  const servicesState = useAppSelector(selectServicesState);
  const role = useAppSelector(selectAuthState).data.role;
  const userId = useAppSelector(selectAuthState).data.id;
  const { t } = useTranslation();

  let reports = data;

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
      const newSelecteds = reports.map((n) => n.id);
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

  // Filter bookings based on filtered service IDs
  const dataFiltered = applyFilter({
    inputData: reports,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  // Sort bookings based on the selected column
  const sortedReports = dataFiltered.sort(getComparator(order, orderBy));

  const notFound = !sortedReports.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Reports List</Typography>
      </Stack>

      <Card>
        <ReportsTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ReportsTableHead
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'reported', label: 'Reported User' },
                  { id: 'reporter', label: 'Reporter' },
                  { id: 'date', label: t('date') },
                  { id: 'title', label: t('title') },
                  { id: 'reason', label: 'Reason' },
                  { id: 'actions', label: 'Actions' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {sortedReports
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ReportsTableRow
                      id={row.id}
                      key={row.id}
                      reportedId={row.reportedId}
                      reporterId={row.reporterId}
                      date={row.sentAt}
                      reason={row.reason}
                      title={row.title}
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
          count={sortedReports.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
