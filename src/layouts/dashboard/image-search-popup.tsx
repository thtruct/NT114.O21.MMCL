import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { searchImages } from 'src/api/image';

import FormProvider, { RHFUpload, RHFTextField, RHFRadioGroup } from 'src/components/hook-form';

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function ImageSearchPopup({ open, handleClose }: Props) {
  const SearchFormSchema = Yup.object().shape({
    dataset: Yup.string().required('Dataset is required'),
    caption: Yup.string().required('Caption is required'),
    file: Yup.mixed().required('File is required'),
  });

  const defaultValues = {
    dataset: 'cirr',
    caption: '',
    file: '',
  };

  const methods = useForm({
    resolver: yupResolver(SearchFormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append('dataset', data.dataset);
      formData.append('caption', data.caption);
      formData.append('file', data.file as File);
      const res = await searchImages(formData);
      console.log('res', res);
      if (res.ok) {
        handleClose();
      } else {
        enqueueSnackbar(res.message, { variant: 'error' });
      }
    } catch (e) {
      console.error(e);
      enqueueSnackbar(e?.message ? e.message : 'Search image error', { variant: 'error' });
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle />
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack py={2} spacing={2} alignItems="center">
            <RHFRadioGroup
              name="dataset"
              options={[
                { value: 'cirr', label: 'CIRR' },
                { value: 'fashionIQ', label: 'FashionIQ' },
              ]}
              row
              disabled={isSubmitting}
            />
            <RHFUpload name="file" disabled={isSubmitting} />
            <RHFTextField name="caption" label="Caption" fullWidth disabled={isSubmitting} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={isSubmitting} onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" loading={isSubmitting}>
            Search
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
