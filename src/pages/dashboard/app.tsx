import { Helmet } from 'react-helmet-async';

import DashboardView from 'src/sections/dashboard/view/dashboard-view';

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard</title>
      </Helmet>

      <DashboardView />
    </>
  );
}
