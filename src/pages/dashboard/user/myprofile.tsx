import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// _mock_
import {
  _userList,
  _userAbout,
  _userFeeds,
  _userFriends,
  _userGallery,
  _userFollowers,
  _userPayment, _userAddressBook, _userInvoices,
} from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
import { paramCase } from 'change-case';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import {
  Profile,
  ProfileCover,
  ProfileCircles,
} from '../../../sections/profile';
import {
  AccountBilling,
  AccountChangePassword,
} from '../../../sections/account';
// sections
import UserNewEditForm from '../../../sections/UserNewEditForm';
import { useRouter } from 'next/router';
import getUserData from 'src/api/getUserData';
import { IUserAccountGeneral } from 'src/@types/user';
// ----------------------------------------------------------------------

MyProfilePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function MyProfilePage() {
  const { themeStretch } = useSettingsContext();
  const { user, logout } = useAuthContext()

  const [currentTab, setCurrentTab] = useState('profile');
  const [currentUser, setCurrentUser] = useState<IUserAccountGeneral | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getUserData(user?.id as string)
      if (response){
        setCurrentUser({...response, id:user?.id})
      }
      else {
        logout();
      }
    };
    if (!currentUser){
      getData();
    }
  },[currentUser]);


  const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={currentUser} />,
    },
    {
      value: 'Circles',
      label: 'circles',
      icon: <Iconify icon="ic:round-perm-media" />,
      component: <ProfileCircles />,
    },
    {
      value: 'Edit',
      label: 'Edit',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <UserNewEditForm isEdit currentUser={currentUser && currentUser} />,
    },
    {
      value: 'change_password',
      label: 'Change password',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword user={currentUser}/>,
    },
    {
      value: 'billing',
      label: 'Billing',
      icon: <Iconify icon="ic:round-receipt" />,
      component: (
        <AccountBilling
          cards={_userPayment}
          addressBook={_userAddressBook}
          invoices={_userInvoices}
        />
      ),
    },
  ];

  const loading = <div> loading...</div>

  return (
    <>
      <Head>
        <title> User: Profile | Minimal UI</title>
      </Head>
      {!currentUser? loading :
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'User', href: PATH_DASHBOARD.user.myprofile},
          { name: currentUser? `${currentUser.firstname} ${currentUser.lastname}` : ""},
        ]}
      />
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: 'relative',
        }}
      >
        <ProfileCover {...currentUser} />

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
      }
      
    </>
  );
}
