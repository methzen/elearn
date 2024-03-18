// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { IUserAccountGeneral } from 'src/@types/user';
import ProfileAbout from './ProfileAbout';
import ProfileSocialInfo from './ProfileSocialInfo';
// ----------------------------------------------------------------------

type Props = {
  info: IUserAccountGeneral | null;
};

export default function Profile({ info }: Props) {
  return (
    <Stack sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Stack spacing={3}>
          {/* <Contributions contribution={info && info.contribution} karma={info && info.karma} /> */}

          {info && (
            <ProfileAbout
              about={info.about}
              country={info.country}
              email={info.email}
              job={info.job}
              company={info.company}
            />
          )}

          {info?.socialLinks && <ProfileSocialInfo socialLinks={info?.socialLinks} />}
        </Stack>
      </Grid>
    </Stack>
  );
}
