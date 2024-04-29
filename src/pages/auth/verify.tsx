import { Helmet } from 'react-helmet-async';

// sections
import { VerifyView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function VerifyPage() {
  return (
    <>
      <Helmet>
        <title>Verify</title>
      </Helmet>

      <VerifyView />
    </>
  );
}
