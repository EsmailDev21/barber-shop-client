import { Helmet } from 'react-helmet-async';

import { NotAuthenticatedView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function NotAuthenticatedPage() {
  return (
    <>
      <Helmet>
        <title> 400 Not Authenticated </title>
      </Helmet>

      <NotAuthenticatedView />
    </>
  );
}
