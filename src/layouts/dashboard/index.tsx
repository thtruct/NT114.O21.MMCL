import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';

import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const nav = useBoolean();

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Main>{children}</Main>
      </Box>
    </>
  );
}
