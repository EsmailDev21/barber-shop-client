import { Helmet } from 'react-helmet-async';

import { BarbersView } from 'src/sections/barbers/view';

// ----------------------------------------------------------------------

export default function BarbersPage() {
  return (
    <>
      <Helmet>
        <title>Barber Shop | Barbers</title>
      </Helmet>

      <BarbersView />
    </>
  );
}
