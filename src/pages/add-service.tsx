import { Helmet } from 'react-helmet-async';
import { AddServiceView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function AddServicePage() {
  return (
    <>
      <Helmet>
        <title> New Service | Barber Shop </title>
      </Helmet>

      <AddServiceView />
    </>
  );
}
