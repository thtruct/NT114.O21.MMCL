import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
// import { PATH_AFTER_LOGIN } from 'src/config-global';
// import AuthSocialCallback from 'src/pages/callback/social-callback';
import { LoadingScreen } from 'src/components/loading-screen';

import AuthModernCompactLayout from '../../layouts/auth/modern-compact';

// ----------------------------------------------------------------------

// AUTH
const LoginPage = lazy(() => import('src/pages/auth/login'));
const RegisterPage = lazy(() => import('src/pages/auth/register'));
const NewPasswordPage = lazy(() => import('src/pages/auth/new-password'));
const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'));
const VerifyPage = lazy(() => import('src/pages/auth/verify'));

// ----------------------------------------------------------------------

const auth = {
  element: (
    <GuestGuard>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthModernCompactLayout title="Welcome back">
          <LoginPage />
        </AuthModernCompactLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthModernCompactLayout title="Welcom to">
          <RegisterPage />
        </AuthModernCompactLayout>
      ),
    },
    {
      path: 'new-password',
      element: (
        <AuthModernCompactLayout>
          <NewPasswordPage />
        </AuthModernCompactLayout>
      ),
    },
    {
      path: 'forgot-password',
      element: (
        <AuthModernCompactLayout>
          <ForgotPasswordPage />
        </AuthModernCompactLayout>
      ),
    },
    {
      path: 'verify',
      element: (
        <AuthModernCompactLayout>
          <VerifyPage />
        </AuthModernCompactLayout>
      ),
    },
    // {
    //   path: 'social/callback',
    //   element: (
    //     <AuthSocialCallback>
    //       <Navigate to={PATH_AFTER_LOGIN}/>
    //     </AuthSocialCallback>
    //   ),
    // },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [auth],
  },
];
