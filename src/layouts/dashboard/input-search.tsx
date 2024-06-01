import TextField from '@mui/material/TextField';

import Iconify from '../../components/iconify';

export default function InputSearch() {
  return (
    <TextField
      placeholder="Search"
      fullWidth
      size="small"
      InputProps={{
        startAdornment: <Iconify icon="eva:search-fill" />,
        endAdornment: <Iconify icon="ph:camera" />,
      }}
    />
  );
}
