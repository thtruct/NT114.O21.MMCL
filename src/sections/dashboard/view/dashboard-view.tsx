import { useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import {
  Box,
  Stack,
  Divider,
  ImageList,
  TextField,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';

import { useSearchImage } from 'src/hooks/use-search-image';

import { getLink } from 'src/utils/image';

import { useImageCaption, useImageOverview } from 'src/api/image';

import Iconify from 'src/components/iconify';
import { LoadingLayer } from 'src/components/loading-screen';

export default function DashboardView() {
  const [imageSelected, setImageSelected] = useState<{ name: string; url: string }>();
  const { images, dataset } = useSearchImage();
  const { data, isLoading, isValidating } = useImageOverview(dataset, images.length === 0);
  const { data: captions, isLoading: captionLoading } = useImageCaption(
    dataset,
    imageSelected?.name
  );

  console.log('captions', captions.names);

  const onSelectImage = (item: { name: string; url: string }) => {
    console.log('item', item);
    setImageSelected(item);
  };

  return (
    <Box>
      {imageSelected && (
        <Stack pb={3} spacing={3}>
          <img
            srcSet={`${imageSelected.url}`}
            src={`${imageSelected.url}`}
            alt={imageSelected.name}
            loading="lazy"
            style={{ borderRadius: '20px', cursor: 'pointer', width: '300px' }}
          />
          <Autocomplete
            fullWidth
            options={captions.names}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Combo box" margin="none" />}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            freeSolo
          />
          <Divider />
        </Stack>
      )}
      {isLoading || isValidating || captionLoading ? (
        <LoadingLayer />
      ) : (
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.length <= 0 &&
            !!data?.names &&
            data.names
              .map((path) => ({ name: path, url: getLink(path) }))
              .map((item, key) => (
                <ImageListItem key={key} sx={{ borderRadius: 16 }}>
                  <img
                    srcSet={`${item.url}`}
                    src={`${item.url}`}
                    alt={item.name}
                    loading="lazy"
                    style={{ borderRadius: '20px', cursor: 'pointer' }}
                    onClick={() => onSelectImage(item)}
                  />
                  <ImageListItemBar
                    sx={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    position="top"
                    actionIcon={
                      <IconButton>
                        <Iconify icon="eva:checkmark-circle-2-fill" width={24} />
                      </IconButton>
                    }
                    actionPosition="left"
                  />
                </ImageListItem>
              ))}
          {images.length > 0 &&
            images.map((item, key) => (
              <ImageListItem key={key} sx={{ borderRadius: 16 }}>
                <img
                  srcSet={`${item.url}`}
                  src={`${item.url}`}
                  alt={`${item.name}`}
                  loading="lazy"
                  style={{ borderRadius: '20px', cursor: 'pointer' }}
                  onClick={() => onSelectImage(item)}
                />
                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  position="top"
                  actionIcon={
                    <IconButton>
                      <Iconify icon="eva:checkmark-circle-2-fill" width={24} />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            ))}
        </ImageList>
      )}
    </Box>
  );
}
