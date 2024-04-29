import { Helmet } from 'react-helmet-async';

// sections
import { ForgotPasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
