// next
import Head from 'next/head';
import { Container, Box, Button} from '@mui/material';

// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import CourseCard from '../../components/CourseCard';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useAuthContext } from '../../auth/useAuthContext';
import createGroup from 'src/api/createGroup';
// hooks
import getAllGroupsByPage from '../../api/getAllGroupsByPage';
import { useSnackbar } from '../../components/snackbar';
import useSWR from 'swr';
import { CircleFormProps } from 'src/sections/form/CreateGroupForm';
import { PATH_DASHBOARD, PATH_PAGE } from 'src/routes/paths';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

PageTwo.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;
const fetcher = (url: string) => getAllGroupsByPage(url);


export default function PageTwo() {
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter()
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const { data , mutate } = useSWR(`/groups/get/all?page=${1}`, fetcher)


  const submitGroup = async (d: CircleFormProps) => {
    try {
      await createGroup(d)
      mutate()
      enqueueSnackbar("The group has been created successfully.")
    }catch (err) {
      console.error(err);
    }

  };
  const handleCreateCircle = () => {
    const subscription = user?.subscription
    if(subscription.is_active){
      push(PATH_DASHBOARD.create)
    }
    else{
      push(`${PATH_PAGE.payment}?p=Basic`)
    }
  }

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
              name: data?.items.length> 1 ? "Below are the circles you are part of.": "You don't have any circle yet.",
            },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleCreateCircle}
              style={{ marginTop:"20px"}}
            >
              Create a circle
            </Button>
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
          {data?.items?.map((course:any) =>
              <CourseCard key={course.id} {...course}/>
          )}
      </Box>
      </Container>
    </>
  );
}
