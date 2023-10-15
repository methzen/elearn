import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// @types
import { IUserAccountGeneral } from '../@types/user';
// assets
import { countries } from '../assets/data';
// components
import Label from '../components/label';
import { CustomFile } from '../components/upload';
import { useSnackbar } from '../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../components/hook-form';
import updateUserData from 'src/api/updateUserData';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IUserAccountGeneral, 'photoURL'> {
  photoURL: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentUser: IUserAccountGeneral | null;
};

function createFile(fileContent: any) {
  const file = new FormData()
  file.append("file", fileContent)
  console.log("createFile", file, fileContent)
  return file
}


export default function UserNewEditForm({ isEdit = true, currentUser }: Props) {
  const { push } = useRouter();
  console.log("snackbar", useSnackbar())
  const { enqueueSnackbar } = useSnackbar();

  const [fileData, setFileData] = useState<any>(null)

  const NewUserSchema = Yup.object().shape({
    firstname: Yup.string().required('firstname is required'),
    lastname: Yup.string().required('lastname is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string(),
    address: Yup.string(),
    company: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    role: Yup.string(),
    photoURL: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      firstname: currentUser?.firstname || '',
      lastname: currentUser?.lastname || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      photoURL: currentUser?.photoURL || '',
      company: currentUser?.company || '',
      job: currentUser?.job || '',
      about: currentUser?.about || '',
    }),
    [currentUser]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
        await updateUserData(data, fileData);
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // push(PATH_DASHBOARD.user.profile(currentUser?.id as string));
      // console.log('DATA', inputData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(

    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setFileData(file as any)
        setValue('photoURL', newFile.preview, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {/* {isEdit && (
              <Label
                color={values.status === 'active' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )} */}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="photoURL"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            <RHFTextField 
                multiline
                rows={3}
                name="about" 
                label="About" />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="firstname" label="Firstname" />
              <RHFTextField name="lastname" label="Lastname" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField name="state" label="State/Region" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="zipCode" label="Zip/Code" />
              <RHFTextField name="company" label="Company" />
              <RHFTextField name="job" label="Job" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
