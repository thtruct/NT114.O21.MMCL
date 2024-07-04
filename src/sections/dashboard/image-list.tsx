import { ImageList, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';

import Iconify from 'src/components/iconify';

import { ImageItem } from 'src/types/image';

type Props = {
  images: ImageItem[];
  onSelectImage: (image: ImageItem) => void;
};

export default function ImagesList({ images, onSelectImage }: Props) {
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {images.map((item, key) => (
        <ImageListItem key={key} sx={{ borderRadius: 16 }} onClick={() => onSelectImage(item)}>
          <img
            srcSet={`${item.url}`}
            src={`${item.url}`}
            alt={`${item.name}`}
            loading="lazy"
            style={{ borderRadius: '20px', cursor: 'pointer' }}
          />
          <ImageListItemBar
            sx={{
              borderRadius: '20px',
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
  );
}
