// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components

import { useState } from 'react';
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

// ----------------------------------------------------------------------

Admin.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Admin() {
  const [filterStatus, setFilterStatus] = useState('circle');
  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setFilterStatus(newValue);
  };
  const {
    query: { circleId },
  } = useRouter();

  const Group = {
    name: "Community Builder",
    description: "Let's build something very cool for this community",
    image: null,
    isPaying: true,
    price: 40.99,
    community: true,
    plan: 'year'
  } 

  const TABS = [
    {
      value: 'circle',
      label: 'circle',
      component: <EditCircle currentCircle={Group}/>,
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
