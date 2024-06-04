import { Helmet } from 'react-helmet-async';
import { ServicesView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ServicessPage() {
  return (
    <>
      <Helmet>
        <title> Services | Barber Shop </title>
      </Helmet>

      <ServicesView />
    </>
  );
}
