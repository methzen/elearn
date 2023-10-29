// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// @mui
import {
  Stack,
  Divider,
  Container,
  Typography,
} from '@mui/material';

// ----------------------------------------------------------------------

ListGroups.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ListGroups() {
  return (
    <>
      <Head>
        <title> list of groups</title>
      </Head>

      <Container sx={{ my: 10 }}>
        <p>Hey</p>
      </Container>
    </>
  );
}
