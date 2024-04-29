import { Helmet } from 'react-helmet-async';

// sections
import { NewPasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      <Helmet>
        <title> New Password</title>
      </Helmet>

      <NewPasswordView />
    </>
  );
}
