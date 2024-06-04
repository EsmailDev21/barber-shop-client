import { Helmet } from 'react-helmet-async';
import FetchAnalytics from 'src/hoc/FetchAnalytics';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <FetchAnalytics>
      <Helmet>
        <title> Dashboard | Barber Shop</title>
      </Helmet>

      <AppView />
    </FetchAnalytics>
  );
}
