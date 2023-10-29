// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';

import { useState } from 'react';
// @mui
import {
  Stack,
  Divider,
  Container,
  Typography,
} from '@mui/material';

// sections
import { useRouter } from 'next/router'

// ----------------------------------------------------------------------

Circle.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;


export default function Circle() {

  const {
    query: { circleId },
  } = useRouter();

  return (
    <>
      <Head>
        <title> Create a group</title>
      </Head>

      <Container sx={{ my: 10 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4"> {circleId} </Typography>
        </Stack>
      </Container>
    </>
  );
}
