// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components

import { useEffect, useState } from 'react';
// @mui
import {
  Divider,
  Container,
  Card,
  Tabs,
  Tab,
} from '@mui/material';

// sections
import { useRouter } from 'next/router'
import { Box } from '@mui/system';
import EditCircle from 'src/sections/group/EditCircle';
import getGroupById from 'src/api/getGroupById';
import { CircleFormProps } from 'src/sections/form/CreateGroupForm';
import CircleAccessGuard from 'src/auth/CircleAccessGuard';

// ----------------------------------------------------------------------

Admin.getLayout = (page: React.ReactElement) => <DashboardLayout><CircleAccessGuard>{page}</CircleAccessGuard></DashboardLayout>;

export default function Admin() {
  const [filterStatus, setFilterStatus] = useState('circle');
  const [currentGroup, setCurrentGroup] = useState<CircleFormProps>()
  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setFilterStatus(newValue);
  };
  const {
    query: { circleId },
  } = useRouter();

  useEffect(() => {
    const getGroup = async () => {
        const response =  await getGroupById(circleId as string)
        const plan = response.plans[0]
        const Group = {
          name: response.name,
          imageUrl: response.imageUrl,
          description: response.description,
          image: response.image,
          isPaying: response.isPaying,
          price: plan.price,
          community: response.community,
          plan: plan.interval,
          currency: plan.currency
        }
        setCurrentGroup({...Group})
    }
    if(circleId){
      getGroup()
    }
  }, [circleId])

  const TABS = [
    {
      value: 'circle',
      label: 'circle',
      component: currentGroup? <EditCircle currentCircle={currentGroup as CircleFormProps}/> : <span>loading...</span>,
    },
    {
      value: 'users',
      label: 'users',
      component: <span>Users</span>,
    },
  ];

  return (
    <>
      <Head>
        <title>Admin Circle</title>
      </Head>

      <Container sx={{ my: 10 }}>
      <Card >
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>
          <Divider />
          </Card>
          {TABS.map(
          (tab) => tab.value === filterStatus && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  );
}