import { Helmet } from 'react-helmet-async';

import { NotAuthorizedView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function NotAuthorizedPage() {
  return (
    <>
      <Helmet>
        <title> 400 Not authorized </title>
      </Helmet>

      <NotAuthorizedView />
    </>
  );
}
