import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

const DashboardPage = lazy(() => import('src/pages/dashboard/app'));

// ----------------------------------------------------------------------
export const dashboardRoutes = [
  {
    path: '/app',
    element: (
      <AuthGuard>
        {/* <RoleBasedGuard hasContent> */}
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
        {/* </RoleBasedGuard> */}
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
    ],
  },
];
