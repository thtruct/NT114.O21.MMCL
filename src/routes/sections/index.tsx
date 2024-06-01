import { Navigate, useRoutes } from 'react-router-dom';
// layouts
// import MainLayout from 'src/layouts/main';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    {
      path: '/',
      element: <Navigate to="/app" replace />,
    },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    // {
    //   path: '/',
    //   element: <AfterLoginCallback/>,
    // },

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
