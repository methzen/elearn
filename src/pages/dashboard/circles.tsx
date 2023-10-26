import { useState } from 'react'
// next
import Head from 'next/head';
import { Container, Typography, Box, Button, Paper, Stack, IconButton, Divider, InputBase} from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import CourseCard from '../../components/CourseCard';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import {
  _userGroups
} from '../../_mock/arrays';
import { useAuthContext } from '../../auth/useAuthContext';

import { CreateGroupForm } from '../../sections/form';
import createGroup from 'src/api/createGroup';
import { FormSchema } from '../../sections/form/schema';
// hooks
import useResponsive from '../../hooks/useResponsive';
// ----------------------------------------------------------------------
interface CreateGroupDialogProps{
  open: boolean;
  cancel: ()=> void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function CreateAGroupDialog({open, cancel}: CreateGroupDialogProps) {

  const isDesktop = useResponsive('up', 'sm');
  const fullWidth = isDesktop ? 700 : 400

  const nameLabel = "name"
  const editorLabel = "What is this group about ?"
  return (
      <BootstrapDialog
        onClose={cancel}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
      <Paper
        sx={{
          width:`${fullWidth}px`,
          top: 90,
          right: `calc((100% - ${fullWidth}px)/2)`,
          margin: "0px auto",
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            py: 2,
            pl: 2.5,
            pr: 1,
          }}
        >
          <IconButton onClick={cancel}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>
        <CreateGroupForm {...{
          FormSchema, 
          nameLabel, 
          editorLabel, 
          submitData : createGroup
        }}  />
        <Divider />
      </Paper>
      </BootstrapDialog>
  );
}
PageTwo.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function PageTwo() {
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () =>{
    setOpenModal(true)
  }
  const cancelCourseCreation = () =>{
    setOpenModal(false)
  }
  return (
    <>
      <Head>
        <title> Circles | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        {openModal && <CreateAGroupDialog open={openModal} cancel={cancelCourseCreation}/>}
      <CustomBreadcrumbs
          heading={`Welcome ${user?.displayName} !`}
          links={[
            {
              name: 'Below are the groups you are part of.',
              // href: PATH_DASHBOARD.root,
            },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenModal}
            >
              Create a group
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
          {_userGroups.map((course) =>
              <CourseCard key={course.id} {...course}/>
          )}
      </Box>
      </Container>
    </>
  );
}
