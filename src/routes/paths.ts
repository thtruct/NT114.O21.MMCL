// ----------------------------------------------------------------------

const ROOTS = {
  HOST: `${window.location.protocol}//${window.location.host}`,
  DOMAIN: window.location.host,
  AUTH: '/auth',
  ADMIN: '/admin',
  DASHBOARD: '/',
};

// ----------------------------------------------------------------------

export const paths = {
  host: ROOTS.HOST,
  domain: ROOTS.DOMAIN,
  comingSoon: '/coming-soon',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
    newPassword: `${ROOTS.AUTH}/new-password`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    verify: `${ROOTS.AUTH}/verify`,
    socialCallback: `${ROOTS.AUTH}/social/callback`,
  },
  // ADMIN
  admin: {
    root: ROOTS.ADMIN,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
    },
  },
};
