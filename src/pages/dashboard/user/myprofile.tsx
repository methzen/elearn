import Head from 'next/head';
// @mui
import useSWR from 'swr';
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import { getUserProfileData } from 'src/api/getUserData';
import { ProfileData } from 'src/@types/user';
import LoadingScreen from 'src/components/loading-screen';
import ProfileComponent from 'src/sections/account/ProfileComponent';

// ----------------------------------------------------------------------

MyProfilePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function MyProfilePage() {
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();

  const { data, isLoading, error, mutate } = useSWR<ProfileData>(
    `/users/profile/data?id=${user?._id}`,
    getUserProfileData
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <div> Une erreur est survenue!</div>;

  return (
    <>
      <Head>
        <title> Profile | Inner Circle</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.myprofile },
            { name: user ? `${user?.firstname} ${user?.lastname}` : '' },
          ]}
        />
        {data && <ProfileComponent data={data} myProfile={true} mutate={mutate}/>}
      </Container>
    </>
  );
}
