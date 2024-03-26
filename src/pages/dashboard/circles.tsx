// next
import Head from 'next/head';
import { Container, Box, Button } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import CourseCard from '../../components/CourseCard';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useAuthContext } from '../../auth/useAuthContext';
// hooks
import getAllGroupsByPage from '../../api/getAllGroupsByPage';
import useSWR from 'swr';
import { PATH_DASHBOARD, PATH_PAGE } from 'src/routes/paths';
import { useRouter } from 'next/router';
import LoadingScreen from 'src/components/loading-screen';
import { useEffect, useState } from 'react';
// ----------------------------------------------------------------------

PageTwo.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function PageTwo() {
  const { push } = useRouter();
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const { data, isLoading } = useSWR(`/groups/get/all?page=${1}`, (url: string) =>
    getAllGroupsByPage(url)
  );
  const [userHasSubscription, setUserHasSub] = useState(false);

  useEffect(() => {
    if (!!user?.subscription?.is_active) {
      setUserHasSub(true);
    }
  }, [user]);

  const handleCreateCircle = () => {
    if (userHasSubscription) {
      push(PATH_DASHBOARD.create);
    } else {
      push(`${PATH_PAGE.payment}?p=Basic`);
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title> My Circles </title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`Welcome ${user?.displayName} !`}
          links={[
            {
              name:
                data?.items.length > 0
                  ? 'Below are the circles you are part of.'
                  : "You don't have any circle yet.",
            },
          ]}
          action={
            userHasSubscription ? (
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={handleCreateCircle}
                style={{ marginTop: '20px' }}
              >
                Create a circle
              </Button>
            ) : null
          }
        />
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
        >
          {data?.items?.map((course: any) => (
            <CourseCard key={course._id} circle={course} myProfile={true} />
          ))}
        </Box>
      </Container>
    </>
  );
}
