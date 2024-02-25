// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// @types
import { IUserProfileAbout } from '../../../@types/user';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function ProfileAbout({ about, country, email, job, company }: IUserProfileAbout) {
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {about && <Typography variant="body2">{about}</Typography>}

        {country && (
          <Stack direction="row">
            <StyledIcon icon="eva:pin-fill" />

            <Typography variant="body2">
              Live at &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {country}
              </Link>
            </Typography>
          </Stack>
        )}

        {email && (
          <Stack direction="row">
            <StyledIcon icon="eva:email-fill" />
            <Typography variant="body2">{email}</Typography>
          </Stack>
        )}

        {job && (
          <Stack direction="row">
            <StyledIcon icon="ic:round-business-center" />

            <Typography variant="body2">
              {job}

              {company && (
                <Link component="span" variant="subtitle2" color="text.primary">
                  at &nbsp; {company}
                </Link>
              )}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
