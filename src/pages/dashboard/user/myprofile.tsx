import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import useSWR from 'swr';
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import { Profile, ProfileCover, ProfileCircles } from '../../../sections/profile';
import {
  AccountBilling,
  AccountChangePassword,
  AccountSocialLinks,
} from '../../../sections/account';
// sections
import UserNewEditForm from '../../../sections/UserNewEditForm';
import { getUserProfileData } from 'src/api/getUserData';
import { IUserSocialLink, ProfileData } from 'src/@types/user';
import LoadingScreen from 'src/components/loading-screen';

// ----------------------------------------------------------------------

MyProfilePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function MyProfilePage() {
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const [currentTab, setCurrentTab] = useState('Circles');

  const { data, isLoading, error, mutate } = useSWR<ProfileData>(
    `/users/profile/data?id=${user?._id}`,
    getUserProfileData
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <div> Une erreur est survenue!</div>;

  const userData = data?.user;
  const groups = data?.groups;

  const socialLinks: IUserSocialLink = {
    facebookLink: userData?.socialLinks?.facebookLink || '',
    linkedinLink: userData?.socialLinks?.linkedinLink || '',
    twitterLink: userData?.socialLinks?.twitterLink || '',
    instagramLink: userData?.socialLinks?.instagramLink || '',
    youtubeLink: userData?.socialLinks?.youtubeLink || '',
  };
  const TABS = [
    {
      value: 'Circles',
      label: 'Circles',
      icon: <Iconify icon="ic:round-perm-media" />,
      component: <ProfileCircles circles={groups} />,
    },
    {
      value: 'Profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: userData && <Profile info={userData} />,
    },
    {
      value: 'Edit',
      label: 'Edit',
      icon: <Iconify icon="ic:round-account-box" />,
      component: userData && <UserNewEditForm isEdit currentUser={userData} mutate={mutate} />,
    },
    {
      value: 'Socials',
      label: 'Social Links',
      icon: <Iconify icon="eva:share-fill" />,
      component: <AccountSocialLinks socialLinks={socialLinks} mutate={mutate} />,
    },
    {
      value: 'change_password',
      label: 'Change password',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: userData && <AccountChangePassword user={userData} />,
    },
    {
      value: 'billing',
      label: 'Billing',
      icon: <Iconify icon="ic:round-receipt" />,
      component: data && <AccountBilling ProfileData={data} mutate={mutate} />,
    },
  ];

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
            { name: userData ? `${userData.firstname} ${userData.lastname}` : '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          {userData && <ProfileCover {...userData} />}

          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Card>

        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  );
}
