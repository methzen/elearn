import { useCallback, useMemo } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import {
  Box,
  Stack,
  Backdrop,
  Typography,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import FormProvider, {
  RHFUpload,
  RHFTextField,
  RHFRadioGroup,
  RHFSwitch,
} from '../../components/hook-form';

// ----------------------------------------------------------------------

const PAYMENT_OPTION = [
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
  { label: 'One Time', value: 'OneTime' },
];

export type CircleFormProps = {
  name: string;
  description: string;
  imageUrl: File | string | null;
  isPaying: boolean;
  price: number;
  community:boolean;
  plan: string
};

interface CreateForm {
  isEdit?: boolean,
  FormSchema: any
  submitData: (data : CircleFormProps) => void;
}

export default function CreateAgroup(
  { isEdit=false, FormSchema, submitData } : CreateForm) {
  console.log('currentCircle', FormSchema)

  const defaultValues = useMemo(()=>({
    name: FormSchema?.name || '',
    description: FormSchema?.description || '',
    imageUrl: FormSchema?.imageUrl || null,
    isPaying: FormSchema?.isPaying || false,
    price: FormSchema?.price || 0.0,
    community: FormSchema?.community || true,
    plan: FormSchema?.plan || 'month'
  }), [FormSchema])

  const methods = useForm<CircleFormProps>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    watch,
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
        setValue('imageUrl', newFile, { shouldValidate: true });
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
            marginLeft:"auto",
            marginRight:"auto",
            marginBottom: "40px",
            borderRadius: 1,
            display:"flex",
            flexDirection:"column",
            gap: "15px",
            padding:"0 20px",
          }}
        >
            <Stack spacing={2}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Banner
                </Typography>
                <RHFUpload
                  name="imageUrl"
                  maxSize={3145728}
                  onDrop={handleDropSingleFile}
                  onDelete={() => setValue('imageUrl', null, { shouldValidate: true })}
                />
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Name
              </Typography>
              <RHFTextField name="name" label='Name' />
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Give a description
              </Typography>
                <RHFTextField name="description" label='What is this circle for...' 
                multiline
                minRows={4}
                maxRows={8}
                />
            </Stack>

            <Stack spacing={1} >
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Payment
              </Typography>
                <RHFSwitch name="isPaying" label={watch().isPaying? 'Paying Circle': 'Free circle'}/>
            </Stack>

            {watch().isPaying && <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Payment Plan
              </Typography>
              <RHFRadioGroup row spacing={4} name="plan" options={PAYMENT_OPTION} />
              <Stack spacing={1}>
                  <RHFTextField
                  name="price"
                  label="Price"
                  placeholder="0.00"
                  onChange={(event) =>
                    setValue('price', Number(event.target.value), { shouldValidate: true })
                  }
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box component="span" sx={{ color: 'text.disabled' }}>
                          $
                        </Box>
                      </InputAdornment>
                    ),
                    type: 'number',
                  }}
                />
                </Stack>
            </Stack>}

            <Stack spacing={1} >
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Community
              </Typography>
                <RHFSwitch name="community" label="Activate" />
            </Stack>
            <Stack spacing={3}>
              <LoadingButton
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit? 'Create': 'Update'}
              </LoadingButton>
            </Stack>
          </Box>
      </FormProvider>
    </>
  );
}

