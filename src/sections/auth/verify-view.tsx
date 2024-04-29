import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';

// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

// hooks
import { useCountdownSeconds } from 'src/hooks/use-countdown';

import { useTranslate } from 'src/locales';
// auth
import { useAuthContext } from 'src/auth/hooks';
// assets
import { EmailInboxIcon } from 'src/assets/icons';

// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function VerifyView() {
  const router = useRouter();
  const { t } = useTranslate();

  const { enqueueSnackbar } = useSnackbar();

  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  const { confirmRegister, resendCodeRegister } = useAuthContext();

  const { countdown, counting, startCountdown } = useCountdownSeconds(60);

  const VerifySchemaSchema = Yup.object().shape({
    code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    code: '',
    email: email || '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchemaSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await confirmRegister?.(data.email, data.code);
      router.push(paths.auth.login);
      enqueueSnackbar('Congratulations! Please login your account now');
    } catch (error) {
      console.error('error', error);
      enqueueSnackbar(error?.message || 'Something went wrong', { variant: 'error' });
    }
  });

  const handleResendCode = useCallback(async () => {
    try {
      startCountdown();
      await resendCodeRegister?.(values.email);
    } catch (error) {
      console.error(error);
    }
  }, [resendCodeRegister, startCountdown, values.email]);

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField
        name="email"
        label={t('pages.verify.email')}
        placeholder="example@gmail.com"
        InputLabelProps={{ shrink: true }}
      />

      <RHFCode name="code" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t('pages.verify.verify')}
      </LoadingButton>

      <Typography variant="body2">
        {t('pages.verify.do_not_have_a_code')}&nbsp;
        <Link
          variant="subtitle2"
          onClick={handleResendCode}
          sx={{
            cursor: 'pointer',
            ...(counting && {
              color: 'text.disabled',
              pointerEvents: 'none',
            }),
          }}
        >
          {t('pages.verify.resend_code', {
            countdown: `(${countdown}s)`,
          })}
        </Link>
      </Typography>

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
        {t('pages.verify.back')}
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3"> {t('pages.verify.title')}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('pages.verify.subtitle')}
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
