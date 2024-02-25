import { useState, useCallback } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Box, Stack, Backdrop, Typography, StackProps, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import FormProvider, { RHFPdfUpload, RHFTextField } from '../../components/hook-form';
import { AttachmentProps } from '../../@types/file';

// ----------------------------------------------------------------------

export const defaultValues = {
  name: '',
  singleUpload: null,
};

export default function AttachmentUploader({
  nameLabel,
  submitData,
}: {
  nameLabel: string;
  submitData: (data: AttachmentProps) => void;
}) {
  const methods = useForm<AttachmentProps>({
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('singleUpload', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      {isSubmitting && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <FormProvider methods={methods} onSubmit={handleSubmit(submitData)}>
        <Box
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '40px',
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            padding: '0 20px',
          }}
        >
          <Stack spacing={2}>
            <Block label="Select a file">
              <RHFPdfUpload
                name="singleUpload"
                maxSize={3145728}
                onDrop={handleDropSingleFile}
                onDelete={() => setValue('singleUpload', null, { shouldValidate: true })}
              />
            </Block>
          </Stack>
          <Stack spacing={2}>
            <Block label="Give a name">
              <RHFTextField name="name" label={nameLabel} />
            </Block>
          </Stack>
          <Stack spacing={3}>
            <LoadingButton
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

function Block({ label = 'RHFTextField', sx, children }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'left',
          fontStyle: 'italic',
          color: 'text.disabled',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
