import Container from '@mui/material/Container';

// import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import AccountGeneral from '../account-general';

// ----------------------------------------------------------------------

// const TABS = [
//   {
//     value: 'general',
//     label: 'General',
//     icon: <Iconify icon="solar:user-id-bold" width={24} />,
//   },
//   {
//     value: 'notifications',
//     label: 'Notifications',
//     icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
//   },
//   {
//     value: 'social',
//     label: 'Social links',
//     icon: <Iconify icon="solar:share-bold" width={24} />,
//   },
//   {
//     value: 'security',
//     label: 'Security',
//     icon: <Iconify icon="ic:round-vpn-key" width={24} />,
//   },
// ];

// ----------------------------------------------------------------------

export default function AccountView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <AccountGeneral />

      {/* {currentTab === 'notifications' && <AccountNotifications />} */}

      {/* {currentTab === 'social' && <AccountSocialLinks socialLinks={_userAbout.socialLinks} />} */}

      {/* {currentTab === 'security' && <AccountChangePassword />} */}
    </Container>
  );
}
