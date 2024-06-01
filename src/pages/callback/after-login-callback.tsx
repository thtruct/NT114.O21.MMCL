// import { useEffect, useCallback } from 'react';

// hooks
// import { useRouter } from 'src/routes/hooks';
//
// import { useAuthContext } from 'src/auth/hooks';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function AfterLoginCallback({ children }: Props) {
  // const router = useRouter();
  //
  // const { user } = useAuthContext();
  //
  // const redirect = useCallback(() => {
  //   if (user && user[GROUP_FIELD] && user[GROUP_FIELD].includes('admin')) {
  //     router.replace(NAVIGATIONS.admin.home);
  //   } else {
  // router.replace('/app');
  //   }
  // }, [user, router]);
  //
  // useEffect(() => {
  //   redirect();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return <>{children || <LoadingScreen />}</>;
}
