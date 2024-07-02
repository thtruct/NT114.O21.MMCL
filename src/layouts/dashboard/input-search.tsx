import TextField from '@mui/material/TextField';

import Iconify from '../../components/iconify';

type Props = {
  onClick: () => void;
};

export default function InputSearch({ onClick }: Props) {
  return (
    <TextField
      placeholder="Search"
      fullWidth
      size="small"
      onClick={onClick}
      name="search"
      InputProps={{
        startAdornment: <Iconify icon="eva:search-fill" />,
        endAdornment: <Iconify icon="ph:camera" />,
      }}
    />
  );
}
