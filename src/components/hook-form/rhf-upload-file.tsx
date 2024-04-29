//
import { DropEvent, FileRejection } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import FormHelperText from '@mui/material/FormHelperText';

import { UploadFile, UploadProps } from '../upload';

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
}

// ----------------------------------------------------------------------

export function RHFUploadFile({ name, helperText, onDrop, ...other }: Props) {
  const { control, setValue } = useFormContext();

  const handelOnDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    if (onDrop) {
      onDrop(acceptedFiles, fileRejections, event);
    } else {
      setValue(
        name,
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
        { shouldDirty: true, shouldValidate: true }
      );
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadFile
          multiple
          files={field.value}
          thumbnail={false}
          error={!!error}
          onDrop={handelOnDrop}
          helperText={
            (!!error || helperText) && (
              <FormHelperText error={!!error} sx={{ px: 2 }}>
                {error ? error?.message : helperText}
              </FormHelperText>
            )
          }
          {...other}
        />
      )}
    />
  );
}
