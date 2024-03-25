// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useEffect, useState } from 'react';
// @mui
import { Divider, Container, Card, Tabs, Tab } from '@mui/material';
// sections
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import EditCircle from 'src/sections/group/EditCircle';
import getGroupDataForAdmin from 'src/api/getGroupDataForAdmin';
import { CircleFormProps } from 'src/sections/form/CreateGroupForm';
import { PATH_DASHBOARD } from 'src/routes/paths';
import UserListPage from 'src/sections/group/groupUsers';
import updateGroup from 'src/api/updateGroup';
import { useSnackbar } from '../../../components/snackbar';

// ----------------------------------------------------------------------

Admin.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Admin() {
  const { enqueueSnackbar } = useSnackbar();
  const [filterStatus, setFilterStatus] = useState('circle');
  const [currentGroup, setCurrentGroup] = useState<CircleFormProps>();
  const [isLoading, setIsLoading] = useState(false);
  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setFilterStatus(newValue);
  };
  const {
    push,
    query: { circleId },
  } = useRouter();

  useEffect(() => {
    const getGroup = async () => {
      const response = await getGroupDataForAdmin(circleId as string);
      if (!response) {
        return push(PATH_DASHBOARD.root);
      }
      return setCurrentGroup({ ...response });
    };
    if (circleId && !isLoading) {
      getGroup();
    }
  }, [circleId, push, isLoading]);

  const handleUpdate = async (data: Partial<CircleFormProps>) => {
    setIsLoading(true);
    try {
      await updateGroup(data);
      setIsLoading(false);
      enqueueSnackbar('The circle has been updated successfully.');
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar('Could not update circle', { variant: 'error' });
    }
  };
  const TABS = [
    {
      value: 'circle',
      label: 'circle',
      component: currentGroup ? (
        <EditCircle
          currentCircle={currentGroup as CircleFormProps}
          update={handleUpdate}
          isLoading={isLoading}
        />
      ) : (
        <span>loading...</span>
      ),
    },
    {
      value: 'users',
      label: 'users',
      component: <UserListPage />,
    },
  ];

  return (
    <>
      <Head>
        <title>Admin Circle</title>
      </Head>
      <Container sx={{ my: 10 }}>
        <Card sx={{ mt: 2 }}>
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
