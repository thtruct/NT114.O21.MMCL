import { useState } from 'react';

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

import { useSearchImage } from 'src/hooks/use-search-image';

import { getLink } from 'src/utils/image';

import { useImageCaption, useImageOverview } from 'src/api/image';

import { LoadingLayer } from 'src/components/loading-screen';

import { ImageItem } from 'src/types/image';

import ImagesList from '../image-list';

export default function DashboardView() {
  const [imageSelected, setImageSelected] = useState<ImageItem>();
  const { images, dataset } = useSearchImage();
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

  return (
    <Box>
      {imageSelected && (
        <Stack pb={3} spacing={3}>
          <Stack direction="row" spacing={8} p={2}>
            <Avatar src={imageSelected.url} variant="square" sx={{ width: 400, height: 400 }} />
            <Stack>
              <List>
                {captions?.names.map((item, key) => (
                  <>
                    <ListItem disablePadding key={key}>
                      <ListItemButton>
                        <ListItemText primary={item} />
                      </ListItemButton>
                    </ListItem>
                    <Divider component="li" />
                  </>
                ))}
              </List>
            </Stack>
          </Stack>
          <Divider />
        </Stack>
      )}
      {isLoading || isValidating || captionLoading ? (
        <LoadingLayer />
      ) : (
        <ImagesList images={imagesList} onSelectImage={onSelectImage} />
      )}
    </Box>
  );
}
