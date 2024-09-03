import { Helmet } from 'react-helmet-async';
import { BookingsView } from 'src/sections/bookings/view';
import { ReportsView } from 'src/sections/reports/view';

// ----------------------------------------------------------------------

export default function ReportsPage() {
  return (
    <>
      <Helmet>
        <title> Reports | Barber Shop </title>
      </Helmet>

      <ReportsView />
    </>
  );
}
