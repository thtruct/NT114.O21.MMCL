import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { searchImages } from 'src/api/image';

import FormProvider, { RHFUpload, RHFTextField, RHFRadioGroup } from 'src/components/hook-form';

import { useSearchImage } from '../../hooks/use-search-image';

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function ImageSearchPopup({ open, handleClose }: Props) {
  const { setImages, setDataset, dataset: defaultDataset } = useSearchImage();
  const SearchFormSchema = Yup.object().shape({
    dataset: Yup.string().required('Dataset is required'),
    caption: Yup.string().required('Caption is required'),
    file: Yup.mixed().required('File is required'),
    fiqCategory: Yup.string().required('Category is required'),
  });

  const defaultValues = useMemo(
    () => ({
      dataset: defaultDataset || 'cirr',
      caption: '',
      file: '',
      fiqCategory: defaultDataset === 'fashionIQ' ? 'dress' : '',
    }),
    [defaultDataset]
  );

  const methods = useForm({
    resolver: yupResolver(SearchFormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dataset = watch('dataset');

  useEffect(() => {
    if (dataset === 'fashionIQ') {
      setValue('fiqCategory', 'dress');
    } else {
      setValue('fiqCategory', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append('dataset', data.dataset);
      formData.append('caption', data.caption);
      formData.append('file', data.file as File);
      if (data.dataset === 'fashionIQ') {
        formData.append('fiq-category', data.fiqCategory);
      }
      const res = await searchImages(formData);

      if (res.ok) {
        reset(defaultValues);
        setImages(res.group_names ? [...res.group_names, ...res.names] : res.names);
        setDataset(data.dataset);
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
    <Dialog open={open} onClose={!isSubmitting ? handleClose : undefined} fullWidth>
      <DialogTitle />
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack py={2} spacing={2}>
            <RHFRadioGroup
              label="Dataset"
              name="dataset"
              options={[
                { value: 'cirr', label: 'CIRR' },
                { value: 'fashionIQ', label: 'FashionIQ' },
              ]}
              row
              disabled={isSubmitting}
            />
            {dataset === 'fashionIQ' && (
              <RHFRadioGroup
                label="Fashion category"
                name="fiqCategory"
                options={[
                  { value: 'dress', label: 'Dress' },
                  { value: 'shirt', label: 'Shirt' },
                  { value: 'toptee', label: 'Toptee' },
                ]}
                row
                disabled={isSubmitting}
              />
            )}
            <RHFUpload name="file" disabled={isSubmitting} />
            <RHFTextField name="caption" label="Caption" fullWidth disabled={isSubmitting} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isSubmitting}
            onClick={() => {
              reset(defaultValues);
              handleClose();
            }}
          >
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
