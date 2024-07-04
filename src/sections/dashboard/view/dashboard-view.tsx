import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  List,
  Stack,
  Avatar,
  Divider,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSearchImage } from 'src/hooks/use-search-image';

import { getLink } from 'src/utils/image';

import { useImageCaption, useImageOverview, searchImageByCaption } from 'src/api/image';

import { LoadingScreen } from 'src/components/loading-screen';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { ImageItem } from 'src/types/image';

import ImagesList from '../image-list';

export default function DashboardView() {
  const [imageSelected, setImageSelected] = useState<ImageItem>();
  const loading = useBoolean();
  const { images, dataset, setImages } = useSearchImage();
  const { data, isLoading, isValidating } = useImageOverview(dataset, images.length === 0);
  const { data: captions, isLoading: captionLoading } = useImageCaption(
    dataset,
    imageSelected?.name
  );

  const onSelectImage = (item: ImageItem) => {
    setImageSelected(item);
  };

  const imagesList: ImageItem[] =
    images.length > 0
      ? images
      : data?.names.map((image) => ({
          name: image,
          url: getLink(image),
        }));

  const CaptionFormSchema = Yup.object().shape({
    caption: Yup.string().required('Caption is required'),
  });

  const defaultValues = useMemo(
    () => ({
      caption: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(CaptionFormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    try {
      loading.onTrue();
      const res = await searchImageByCaption(
        dataset,
        imageSelected?.name as string,
        formData.caption
      );
      setImages([...res.group_names, ...res.names]);
      console.log('res', res);
    } catch (error) {
      console.error('error', error);
      enqueueSnackbar(error?.message || 'Error', { variant: 'error' });
    } finally {
      loading.onFalse();
    }
  });

  return (
    <Box>
      {imageSelected && (
        <Stack pb={3} spacing={3}>
          <Stack direction="row" spacing={8} p={2}>
            <Avatar src={imageSelected.url} variant="square" sx={{ width: 400, height: 400 }} />
            <Stack width="100%">
              <List>
                {captions?.names.map((item, key) => (
                  <>
                    {key !== 0 && <Divider component="li" />}
                    <ListItem disablePadding key={key}>
                      <ListItemButton onClick={() => setValue('caption', item)}>
                        <ListItemText primary={item} />
                      </ListItemButton>
                    </ListItem>
                  </>
                ))}
              </List>
              <FormProvider methods={methods} onSubmit={onSubmit}>
                <Stack spacing={2} alignItems="center" pt={2} width="100%">
                  <RHFTextField name="caption" fullWidth />
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{ width: 100 }}
                  >
                    Submit
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </Stack>
          </Stack>
          <Divider />
        </Stack>
      )}
      {loading.value || isLoading || isValidating || captionLoading ? (
        <LoadingScreen />
      ) : (
        <ImagesList images={imagesList} onSelectImage={onSelectImage} />
      )}
    </Box>
  );
}
