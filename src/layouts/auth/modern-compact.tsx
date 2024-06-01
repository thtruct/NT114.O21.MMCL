import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  children: React.ReactNode;
  showLogo?: boolean;
};

export default function AuthModernCompactLayout({ children, title, showLogo = true }: Props) {
  const renderLogo = <Logo disabledLink sx={{ height: 80 }} />;

  return (
    <Box
      component="main"
      sx={{
        py: 12,
        display: 'flex',
        minHeight: '100vh',
        textAlign: 'center',
        px: { xs: 2, md: 0 },
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        '&:before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          opacity: 0.24,
          position: 'absolute',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: 'url(/assets/background/overlay_4.jpg)',
        },
      }}
    >
      <Card
        sx={{
          py: 5,
          px: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={4}>
          <Stack alignItems="start">
            {title && (
              <Typography variant="h4" sx={{ maxWidth: 480, textAlign: 'center' }}>
                {title}
              </Typography>
            )}
            {showLogo && renderLogo}
          </Stack>
          <Stack sx={{ minWidth: 500 }}>{children}</Stack>
        </Stack>
      </Card>
    </Box>
  );
}
