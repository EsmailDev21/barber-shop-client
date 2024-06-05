import { Helmet } from 'react-helmet-async';
import FetchAnalytics from 'src/hoc/FetchAnalytics';
import FetchBarberAnalytics from 'src/hoc/FetchBarberAnalytics';
import { useAppSelector } from 'src/redux/hooks';
import { selectAuthState } from 'src/redux/slices/AuthSlice';

import { AdminAnalyticsView, BarberAnalyticsView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  const role = useAppSelector(selectAuthState).data.role;
  return role === 'ADMIN' ? (
    <FetchAnalytics>
      <Helmet>
        <title> Dashboard | Barber Shop</title>
      </Helmet>

      <AdminAnalyticsView />
    </FetchAnalytics>
  ) : role === 'BARBER' ? (
    <FetchBarberAnalytics>
      <Helmet>
        <title> Dashboard | Barber Shop</title>
      </Helmet>

      <BarberAnalyticsView />
    </FetchBarberAnalytics>
  ) : null;
}
