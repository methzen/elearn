import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// _mock_
import {
  _userList,
  _userAbout,
  _userFeeds,
  _userFriends,
  _userGallery,
  _userFollowers,
  _userPayment, _userAddressBook, _userInvoices,
} from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
import { paramCase } from 'change-case';
// components
import Iconify from '../../../../components/iconify';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
// sections
import {
  Profile,
  ProfileCover,
  ProfileGallery,
} from '../../../../sections/@dashboard/user/profile';
import {
  AccountBilling,
  AccountChangePassword,
} from '../../../../sections/@dashboard/user/account';
// sections
import UserNewEditForm from '../../../../sections/@dashboard/user/UserNewEditForm';
import { useRouter } from 'next/router';
import getUserData from 'src/api/users/getUserData';
import { IUserAccountGeneral } from '../../../../@types/user';

// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

type props ={
  query : any,
}


export default function UserProfilePage() {
  const { themeStretch } = useSettingsContext();
  const {
    query,
  } = useRouter();
  const [currentTab, setCurrentTab] = useState('profile');
  const [currentUser, setCurrentUser] = useState<IUserAccountGeneral | null>(null);
  // const { user } = useAuthContext();
  useEffect(()=>{
    const getData = async () => {
      const response = await getUserData(query.name as string)
      if (response){
        setCurrentUser(response)
      }
    };
    if (query.name && !currentUser){
      console.log("condition", query, currentUser)
      getData();
    }
  },[query, currentUser]);


  const TABS = currentUser?.showPrivateUserData ? [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={currentUser} posts={_userFeeds} />,
    },
    {
      value: 'Groups',
      label: 'groups',
      icon: <Iconify icon="ic:round-perm-media" />,
      component: <ProfileGallery gallery={_userGallery} />,
    },
    {
      value: 'Edit',
      label: 'Edit',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <UserNewEditForm isEdit currentUser={currentUser} />,
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
  ] :
  [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={currentUser && currentUser} posts={_userFeeds} />,
    },
    {
      value: 'Groups',
      label: 'groups',
      icon: <Iconify icon="ic:round-perm-media" />,
      component: <ProfileGallery gallery={_userGallery} />,
    },
  ]
  ;

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
          { name: 'User', href: "#"},
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
