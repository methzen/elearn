import { useCallback, useEffect, useMemo, useState } from 'react';
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
  Paper,
  IconButton,
  Button,
  styled,
  Dialog,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import FormProvider, {
  RHFUpload,
  RHFTextField,
  RHFRadioGroup,
  RHFSwitch,
} from '../../components/hook-form';
import { courseDataSchema } from './schema';
import { useAuthContext } from 'src/auth/useAuthContext';
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';
import { getStripeAccountLink } from 'src/api/stripe';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const PAYMENT_OPTION = [
  { label: 'Subscription', value: 'subscription' },
  { label: 'One Time', value: 'onetime' },
];

export type CircleFormProps = {
  _id: string;
  name: string;
  groupUrl: string;
  description: string;
  contributions: number;
  imageUrl: File | string | null;
  isPaying: boolean;
  community: boolean;
  payment_plan?: string;
  month?: number;
  year?: number;
  oneTime?: number;
};

interface CreateForm {
  isEdit?: boolean;
  FormSchema?: CircleFormProps;
  submitData: (data: Partial<CircleFormProps>) => void;
  isLoading?: boolean;
}

export default function CreateAgroup({
  isEdit = false,
  FormSchema,
  submitData,
  isLoading,
}: CreateForm) {
  const [openModal, setOpenModal] = useState(false);
  const { push } = useRouter();
  const [stripeLink, setStripeLink] = useState('');
  const { user } = useAuthContext();

  const defaultValues = useMemo(
    () => ({
      name: FormSchema?.name || '',
      description: FormSchema?.description || '',
      imageUrl: FormSchema?.imageUrl || null,
      isPaying: FormSchema?.isPaying || false,
      community: FormSchema?.community || true,
      payment_plan: FormSchema?.payment_plan || 'subscription',
      month: FormSchema?.month || 0.0,
      year: FormSchema?.year || 0.0,
      oneTime: FormSchema?.oneTime || 0.0,
    }),
    [FormSchema]
  );

  const methods = useForm<Partial<CircleFormProps>>({
    resolver: yupResolver(courseDataSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const getLink = async () => {
      const accountLink = await getStripeAccountLink();
      if (accountLink) {
        setStripeLink(accountLink.url);
        setOpenModal(true);
      }
    };
    if (watch().isPaying && user?.subscription.is_active && !user?.subscription.chargesEnabled) {
      getLink();
    }
  }, [watch().isPaying && user?.subscription]);

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
      {openModal && (
        <OnboardConnectDialog
          open={openModal}
          cancelPost={() => {
            setOpenModal(false);
            setValue('isPaying', false, { shouldValidate: true });
          }}
          setUpStripe={() => push(stripeLink)}
        />
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
            <RHFTextField name="name" label="Name" />
          </Stack>

          <Stack spacing={2}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Give a description
            </Typography>
            <RHFTextField
              name="description"
              label="What is this circle about?"
              multiline
              minRows={4}
              maxRows={8}
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Payment
            </Typography>
            <RHFSwitch name="isPaying" label={watch().isPaying ? 'Paying Circle' : 'Free circle'} />
          </Stack>

          {watch().isPaying && (
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Payment Plan
              </Typography>
              <RHFRadioGroup
                row
                spacing={4}
                name="payment_plan"
                options={PAYMENT_OPTION}
                value={watch().payment_plan}
              />
              <Stack
                spacing={2}
                alignItems="center"
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
              >
                {watch().payment_plan === 'subscription' && (
                  <>
                    <RHFTextField
                      name="month"
                      label="Monthly Price"
                      placeholder="0.00"
                      onChange={(event) =>
                        setValue('month', Number(event.target.value), { shouldValidate: true })
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
                    <RHFTextField
                      name="year"
                      label="Yearly Price"
                      placeholder="0.00"
                      onChange={(event) =>
                        setValue('year', Number(event.target.value), { shouldValidate: true })
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
                  </>
                )}
                {watch().payment_plan === 'onetime' && (
                  <RHFTextField
                    name="oneTime"
                    label="OneTime Price"
                    placeholder="0.00"
                    onChange={(event) =>
                      setValue('oneTime', Number(event.target.value), { shouldValidate: true })
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
                )}
              </Stack>
            </Stack>
          )}

          <Stack spacing={1}>
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
              loading={isLoading || isSubmitting}
            >
              {!isEdit ? 'Create' : 'Update'}
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
    </>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface PostSomeThingDialogProps {
  open: boolean;
  cancelPost: () => void;
  setUpStripe?: () => void;
}

function OnboardConnectDialog({ open, cancelPost, setUpStripe }: PostSomeThingDialogProps) {
  const isDesktop = useResponsive('up', 'sm');
  const width = isDesktop ? 570 : 370;

  return (
    <BootstrapDialog onClose={cancelPost} aria-labelledby="customized-dialog-title" open={open}>
      <Paper
        sx={{
          width: `${width}px`,
          top: `25VH`,
          right: `calc((100% - ${width}px)/2)`,
          margin: '0px auto',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            py: 2,
            px: 3,
          }}
        >
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Set up your stripe account
          </Typography>
          <IconButton onClick={cancelPost}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>
        <Stack
          direction="column"
          alignItems="center"
          sx={{
            py: 2,
            px: 3,
          }}
        >
          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            To be able to collect your users payment you need to set up your stripe account.
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ py: 2, px: 3 }}>
          <Button variant="contained" size="large" sx={{ mx: 'auto' }} onClick={setUpStripe}>
            Setup a stripe account
          </Button>
        </Stack>
      </Paper>
    </BootstrapDialog>
  );
}
