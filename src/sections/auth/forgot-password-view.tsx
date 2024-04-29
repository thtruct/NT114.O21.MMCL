import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const { forgotPassword } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotPassword?.(data.email);

      const searchParams = new URLSearchParams({
        email: data.email,
      }).toString();

      const href = `${paths.auth.newPassword}?${searchParams}`;
      router.push(href);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message || 'Something went wrong', { variant: 'error' });
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="email" label="Your email" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Reset Password
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Back to Login
      </Link>
    </Stack>
  );

  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 }}>
      <Typography variant="h4">Forgot Password</Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Enter your email to reset the password
      </Typography>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
