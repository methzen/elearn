import {
  Container,
  Paper,
} from '@mui/material';

// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { CreateGroupForm } from 'src/sections/form';
import useResponsive from 'src/hooks/useResponsive';
import createGroup from 'src/api/createGroup';
// ----------------------------------------------------------------------


create.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>


export default function create() {

  const { themeStretch } = useSettingsContext();
  const isDesktop = useResponsive('up', 'sm');
  const fullWidth = isDesktop ? 700 : 400

  return (
    <>
      <Head>
        <title> Create a circle</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Paper
        sx={{
          width:`${fullWidth}px`,
          right: `calc((100% - ${fullWidth}px)/2)`,
          margin: "20px auto",
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CreateGroupForm {...{ 
          submitData : createGroup
        }}  />

      </Paper>
      </Container>
    </>
  );
}

