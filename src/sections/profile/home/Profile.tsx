// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { IUserAccountGeneral, IUserProfilePost } from 'src/@types/user';
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import Contributions from './Contributions';

// ----------------------------------------------------------------------

type Props = {
  info: IUserAccountGeneral | null;
  posts?: IUserProfilePost[];
};

export default function Profile({ info }: Props) {
  return (
    <Grid container spacing={3}>
        <Stack spacing={3}>
          {/* <Contributions contribution={info && info.contribution} karma={info && info.karma} /> */}

          {info && <ProfileAbout
            about={info.about}
            country={info.country}
            email={info.email}
            job={info.job}
            company={info.company}
          />}

          {/* <ProfileSocialInfo socialLinks={info.socialLinks} /> */}
        </Stack>
    </Grid>
  );
}
