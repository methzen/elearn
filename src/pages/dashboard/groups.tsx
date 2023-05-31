// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

import { useState } from 'react';
// @mui
import {
  Stack,
  Divider,
  Container,
  Typography,
} from '@mui/material';

// sections
import { CreateGroupForm } from '../../sections/form';

// ----------------------------------------------------------------------

CreateGroup.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function CreateGroup() {
  return (
    <>
      <Head>
        <title> Create a group</title>
      </Head>

      <Container sx={{ my: 10 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4"> Create a group </Typography>
        </Stack>
        <Divider sx={{ my: 5 }} />
        <CreateGroupForm  />
      </Container>
    </>
  );
}
