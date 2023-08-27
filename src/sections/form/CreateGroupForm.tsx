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

import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
} from '../../components/hook-form';

// ----------------------------------------------------------------------


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

interface CreateForm {
  FormSchema : any
  nameLabel: string
  editorLabel: string
  submitData : (data : FormValuesProps) => void;
}

export default function ReactHookForm(
  { FormSchema, 
    nameLabel, 
    editorLabel, 
    submitData } : CreateForm) {

  const [fileData, setFileData] = useState<File | null>(null)

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

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await submitData(data)
      reset();
    }catch (err) {
      console.error(err);
    }

  };

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setFileData(file)
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
                <RHFTextField name="name" label={nameLabel} />
              </Block>

              <Block label={editorLabel}>
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
