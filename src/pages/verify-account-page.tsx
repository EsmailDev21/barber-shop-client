import { Helmet } from 'react-helmet-async';
import VerifyAccountView from 'src/sections/register/verify-account';

// ----------------------------------------------------------------------

export default function VerifyAccountPage() {
  return (
    <>
      <Helmet>
        <title> Verify Account | Barber Shop</title>
      </Helmet>

      <VerifyAccountView />
    </>
  );
}
