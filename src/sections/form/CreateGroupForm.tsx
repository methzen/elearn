import { useState, useCallback } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import {
  Grid,
  Stack,
  Backdrop,
  Typography,
  StackProps,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
} from '../../components/hook-form';
//
import { FormSchema } from './schema';

// ----------------------------------------------------------------------


type OptionType = {
  value: string;
  label: string;
};

type FormValuesProps = {
  name: string;
  editor: string;
  singleUpload: File | null;
};

export const defaultValues = {
  name: '',
  editor: '',
  singleUpload: null,
};

type Props = {
  debug: boolean;
};

export default function ReactHookForm() {

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  console.log("values", values);

  const onSubmit = async (data: FormValuesProps) => {
    console.log('DATA', data);
  };

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

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Block label="">
                <RHFTextField name="name" label="Group Name" />
              </Block>

              <Block label="Right a short description">
                <RHFEditor simple name="editor"  showMedia={false}/>
              </Block>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Block label="">
                <RHFUpload
                  name="singleUpload"
                  maxSize={3145728}
                  onDrop={handleDropSingleFile}
                  onDelete={() => setValue('singleUpload', null, { shouldValidate: true })}
                />
              </Block>

              <LoadingButton
                fullWidth
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Create
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
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
          textAlign: 'right',
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
