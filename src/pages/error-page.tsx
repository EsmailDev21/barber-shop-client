import { Helmet } from 'react-helmet-async';
import { useAppSelector } from 'src/redux/hooks';
import { selectAuthState } from 'src/redux/slices/AuthSlice';

import { NotAuthenticatedView } from 'src/sections/error';
import ErrorView from 'src/sections/error/error-view';

// ----------------------------------------------------------------------

export default function ErrorPage() {
  const { error } = useAppSelector(selectAuthState);
  return (
    <>
      <Helmet>
        <title> Error </title>
      </Helmet>

      <ErrorView />
    </>
  );
}
