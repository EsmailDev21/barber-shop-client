import { Helmet } from 'react-helmet-async';
import { ForgotPasswordView } from 'src/sections/forgot-password';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Forgot Password | Barber Shop</title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
