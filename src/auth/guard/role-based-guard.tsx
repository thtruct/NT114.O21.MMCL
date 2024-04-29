import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// @mui
import { SxProps, Theme } from '@mui/material/styles';

// assets
import { ForbiddenIllustration } from 'src/assets/illustrations';

// components
import { MotionContainer, varBounce } from 'src/components/animate';

// hooks
import { useAuthContext } from '../hooks';
import { GROUP_FIELD, ROLE_FIELD } from '../contanst';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  groups?: string[];
  roles?: string[];
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({
  hasContent,
  groups,
  roles,
  children,
  sx,
}: RoleBasedGuardProp) {
  // Logic here to get current user role
  const { user } = useAuthContext();

  const currentRole = user ? user[ROLE_FIELD] : ''; // SystemAdmin|AccountManager|CVL or Transporter;

  const currentGroups = user ? user[GROUP_FIELD] || [] : []; // [admin]

  // TODO: IF DON'T ALLOW admin ACCESS page of dashboard

  if (
    (typeof groups !== 'undefined' && !groups.some((r) => currentGroups.includes(r))) ||
    (typeof roles !== 'undefined' && !roles.includes(currentRole))
  ) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
