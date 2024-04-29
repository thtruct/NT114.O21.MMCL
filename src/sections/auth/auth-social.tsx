// @mui
import { IconButton, Stack } from '@mui/material';

// components
import Iconify from 'src/components/iconify';

import { useTranslate } from '../../locales';
// hooks
// types
import { ESocialProvider } from '../../auth/types';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
};
export default function AuthSocial({ title }: Props) {
  const { t } = useTranslate();
  // const { generateAuthorizeUri } = useAuthContext();

  const handleSocialLogin = async (provider: ESocialProvider) => {
    console.log(provider);
    // window.location.href = await generateAuthorizeUri(provider);
  };

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
      {title && <Typography variant="subtitle1">{title}</Typography>}
      <IconButton onClick={() => handleSocialLogin(ESocialProvider.google)}>
        <Iconify icon="devicon:google" color="#DF3E30" width={28} height={28} />
      </IconButton>
      <IconButton onClick={() => handleSocialLogin(ESocialProvider.facebook)}>
        <Iconify icon="ic:round-facebook" color="#1877F2" width={30} height={30} />
      </IconButton>
    </Stack>
  );
}
