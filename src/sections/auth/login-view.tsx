import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import AuthSocial from './auth-social';

// ----------------------------------------------------------------------

export default function LoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset({ email: data.email, password: '' });
      if (error.code === 'UserNotConfirmedException') {
        const param = new URLSearchParams({
          email: data.email,
        }).toString();

        const href = `${paths.auth.verify}?${param}`;

        router.push(href);
      } else {
        setErrorMsg(typeof error === 'string' ? error : error.message);
      }
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ mb: 5 }} alignItems="center">
        <Typography variant="h4" color="#E49D13">
          Login to your account
        </Typography>

        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link
          component={RouterLink}
          href={paths.auth.forgotPassword}
          variant="body2"
          color="inherit"
          underline="always"
          sx={{ alignSelf: 'flex-end' }}
        >
          Forgot password?
        </Link>

        <LoadingButton
          color="inherit"
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          fullWidth
        >
          Login
        </LoadingButton>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Do not have account</Typography>

          <Link component={RouterLink} href={paths.auth.register} variant="subtitle2">
            Register
          </Link>
        </Stack>

        <AuthSocial title="Login your account with" />
      </Stack>
    </FormProvider>
  );
}
