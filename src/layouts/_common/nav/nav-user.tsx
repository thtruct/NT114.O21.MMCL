// @mui
import { Avatar, Box, Stack, Typography } from '@mui/material';

import { VERSION } from 'src/config-global';
// hooks
import { useAuthContext } from 'src/auth/hooks';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function NavUser() {
  const { user } = useAuthContext();

  return (
    <Stack
      sx={{
        px: 2,
        pt: 5,
        pb: 2,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar src={user?.picture} alt={user?.name} sx={{ width: 48, height: 48 }} />
          {/* <Label */}
          {/*  color="success" */}
          {/*  variant="filled" */}
          {/*  sx={{ */}
          {/*    top: -6, */}
          {/*    px: 0.5, */}
          {/*    left: 40, */}
          {/*    height: 20, */}
          {/*    position: 'absolute', */}
          {/*    borderBottomLeftRadius: 2, */}
          {/*  }} */}
          {/* > */}
          {/*  Free */}
          {/* </Label> */}
        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {user?.email}
          </Typography>
        </Stack>
        <div>
          <Label color="primary" sx={{ textTransform: 'lowercase' }}>
            {VERSION}
          </Label>
        </div>
      </Stack>
    </Stack>
  );
}
