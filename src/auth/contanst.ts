import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const GROUP_FIELD = 'cognito:groups'; // admin or undefined for normal user
export const ROLE_FIELD = 'role'; // SystemAdmin, AccountManager, CVL or undefined for transforter/user

export const NAVIGATIONS = {
  home: paths,
  admin: {
    pagePrefix: paths.admin.root,
    home: paths.admin.root,
  },
  user: {
    pagePrefix: paths.dashboard.root,
  },
};
