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
import { CreateGroupForm } from '../../../sections/form';
import { FormValuesProps } from 'src/@types/create';
import createGroup from 'src/api/createGroup';
import { FormSchema } from '../../../sections/form/schema';

// ----------------------------------------------------------------------

CreateGroup.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
const enum CreateGroupSteps {
  CREATE_GROUP_STEP = "CREATE_GROUP_STEP",
  CREATE_COURSE_STEP = "CREATE_COURSE_STEP",
  ADD_CHAPTER_STEP = "ADD_CHAPTER_STEP",
  ADD_MODULE_STEP = "ADD_MODULE_STEP",
  INVITE_PEOPLE_STEP = "INVITE_PEOPLE_STEP",
}

export default function CreateGroup() {
  const nameLabel = "name"
  const editorLabel = "Write something about your group."
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
        <CreateGroupForm {...{
          FormSchema, 
          nameLabel, 
          editorLabel, 
          submitData : createGroup
        }}  />
      </Container>
    </>
  );
}
