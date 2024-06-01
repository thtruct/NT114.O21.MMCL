// import { useEffect, useCallback } from 'react';

// hooks
// import { useRouter } from 'src/routes/hooks';
//
// import { useAuthContext } from 'src/auth/hooks';
import { useEffect, useCallback } from 'react';

// components
import { LoadingScreen } from 'src/components/loading-screen';

import { useRouter } from '../../routes/hooks';
import { useAuthContext } from '../../auth/hooks';

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function AfterLoginCallback({ children }: Props) {
  const router = useRouter();

  const { user } = useAuthContext();
  console.log('user', user);
  const redirect = useCallback(() => {
    if (user) {
      router.replace('/app');
    } else {
      router.replace('/auth/login');
    }
  }, [user, router]);

  useEffect(() => {
    redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children || <LoadingScreen />}</>;
}
