// next
import Head from 'next/head';
import { Container, Grid } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import Video from '../../components/Video';
import Menu from '../../components/CourseMenu';
// ----------------------------------------------------------------------

PageThree.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageThree() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Page Three | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={3}>
          <Menu />
        </Grid>
          <Grid item xs={12} md={6}>
        <Video  />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
