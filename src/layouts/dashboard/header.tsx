import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';

import ButtonHome from './button-home';
import InputSearch from './input-search';
import { NAV, HEADER } from '../config-layout';
import ImageSearchPopup from './image-search-popup';
import { useBoolean } from '../../hooks/use-boolean';
import AccountPopover from '../common/account-popover';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const open = useBoolean();

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const renderContent = (
    <Stack direction="column" width={1} justifyContent="center" alignItems="center" spacing={2}>
      {/* {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />} */}

      <Logo sx={{ my: 1, width: 'fit-content' }} />
      {/* <Searchbar /> */}

      <Stack
        width={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        {/* <NotificationsPopover /> */}

        {/* <ContactsPopover /> */}

        {/* <SettingsButton/> */}

        <ButtonHome />
        <InputSearch onClick={open.onTrue} />
        <AccountPopover />
      </Stack>
    </Stack>
  );

  return (
    <>
      <AppBar
        sx={{
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: '#EDECF5',
          }),
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - 1px)`,
            backgroundColor: 'transparent',
            // width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
            height: HEADER.H_DESKTOP,
            ...(offsetTop && {
              height: HEADER.H_DESKTOP_OFFSET,
            }),
            ...(isNavHorizontal && {
              width: 1,
              height: HEADER.H_DESKTOP_OFFSET,
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
            px: { lg: 5 },
          }}
        >
          {renderContent}
        </Toolbar>
      </AppBar>
      <ImageSearchPopup open={open.value} handleClose={open.onFalse} />
    </>
  );
}
