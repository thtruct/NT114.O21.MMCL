import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';

import AccountPopover from '../account-popover';
import { HEADER, NAV } from '../../config-layout';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const renderContent = (
    <Stack
      direction={'column'}
      width={1}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={2}
    >
      {/* {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />} */}

      <Logo sx={{ my: 1, width: 'fit-content' }} />
      {/* <Searchbar /> */}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        {/* <NotificationsPopover /> */}

        {/* <ContactsPopover /> */}

        {/*<SettingsButton/>*/}

        <AccountPopover />
        <AccountPopover />
        <AccountPopover />
      </Stack>
    </Stack>
  );

  return (
    <AppBar
      sx={{
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - 1px)`,
          // width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',

            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
