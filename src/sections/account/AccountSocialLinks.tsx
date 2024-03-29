// form
import { useForm } from 'react-hook-form';
// @mui
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Stack, Card, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
import { IUserSocialLink } from '../../@types/user';
// components
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import updateSocials from 'src/api/updateSocials';

// ----------------------------------------------------------------------

const SOCIAL_LINKS = [
  {
    value: 'facebookLink',
    icon: <Iconify icon="eva:facebook-fill" width={24} />,
  },
  {
    value: 'instagramLink',
    icon: <Iconify icon="ant-design:instagram-filled" width={24} />,
  },
  {
    value: 'linkedinLink',
    icon: <Iconify icon="eva:linkedin-fill" width={24} />,
  },
  {
    value: 'twitterLink',
    icon: <Iconify icon="eva:twitter-fill" width={24} />,
  },
  {
    value: 'youtubeLink',
    icon: <YouTubeIcon width={24} />,
  },
] as const;

// ----------------------------------------------------------------------

type FormValuesProps = IUserSocialLink;

type Props = {
  socialLinks: IUserSocialLink;
  mutate: () => void;
};

export default function AccountSocialLinks({ socialLinks, mutate }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    facebookLink: socialLinks.facebookLink,
    instagramLink: socialLinks.instagramLink,
    linkedinLink: socialLinks.linkedinLink,
    twitterLink: socialLinks.twitterLink,
    youtubeLink: socialLinks.youtubeLink,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await updateSocials(data);
      mutate();
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Update failed!', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <RHFTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>,
              }}
            />
          ))}

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
