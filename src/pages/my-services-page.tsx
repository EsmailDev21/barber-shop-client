import { Helmet } from 'react-helmet-async';
import { MyServicesView } from 'src/sections/my-services/view';

// ----------------------------------------------------------------------

export default function MyServicesPage() {
  return (
    <>
      <Helmet>
        <title> My Services | Barber Shop </title>
      </Helmet>

      <MyServicesView />
    </>
  );
}
