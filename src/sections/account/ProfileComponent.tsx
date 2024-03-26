import { useState } from 'react';
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
import { IUserSocialLink, ProfileData } from 'src/@types/user';
import LoadingScreen from 'src/components/loading-screen';
import Iconify from 'src/components/iconify';
import { Profile, ProfileCircles, ProfileCover } from '../profile';
import UserNewEditForm from '../UserNewEditForm';
import AccountSocialLinks from './AccountSocialLinks';
import AccountChangePassword from './AccountChangePassword';
import AccountBilling from './billing/AccountBilling';
import { useSettingsContext } from 'src/components/settings';


interface ProfileProps {
    data: ProfileData;
    myProfile: boolean;
    mutate: ()=> void;
}

export default function ProfileComponent({ data, myProfile, mutate }: ProfileProps) {
  const [currentTab, setCurrentTab] = useState('Profile');

  const userData = data?.user;
  const groups = data?.groups;

  const socialLinks: IUserSocialLink = {
    facebookLink: userData?.socialLinks?.facebookLink || '',
    linkedinLink: userData?.socialLinks?.linkedinLink || '',
    twitterLink: userData?.socialLinks?.twitterLink || '',
    instagramLink: userData?.socialLinks?.instagramLink || '',
    youtubeLink: userData?.socialLinks?.youtubeLink || '',
  };

  const TABS = !myProfile? [
    {
      value: 'Profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: userData && <Profile info={userData} />,
    },
    {
      value: 'Circles',
      label: 'Circles',
      icon: <Iconify icon="ic:round-perm-media" />,
      component: <ProfileCircles circles={groups} myProfile={myProfile}/>,
    }]:[
    {
      value: 'Profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: userData && <Profile info={userData} />,
    },
    {
      value: 'Circles',
      label: 'Circles',
      icon: <Iconify icon="ic:round-perm-media" />,
      component: <ProfileCircles circles={groups} myProfile={myProfile}/>,
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
      </>
  );
}
