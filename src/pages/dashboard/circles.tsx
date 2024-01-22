import { useState } from 'react'
// next
import Head from 'next/head';
import { Container, Box, Button, Paper, Stack, IconButton, Divider} from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import CourseCard from '../../components/CourseCard';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useAuthContext } from '../../auth/useAuthContext';

import { CreateGroupForm } from '../../sections/form';
import createGroup from 'src/api/createGroup';
// hooks
import useResponsive from '../../hooks/useResponsive';
import getAllGroupsByPage from '../../api/getAllGroupsByPage';
import { useSnackbar } from '../../components/snackbar';
import useSWR from 'swr';
import { CircleFormProps } from 'src/sections/form/CreateGroupForm';
// ----------------------------------------------------------------------

interface CreateGroupDialogProps{
  open: boolean;
  cancel: ()=> void;
  submit: (data: CircleFormProps)=> void;
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
        <Divider />
        <CreateGroupForm {...{ 
          submitData : createGroup
        }}  />
        <Divider />
      </Paper>
      </BootstrapDialog>
  );
}
PageTwo.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;
const fetcher = (url: string) => getAllGroupsByPage(url);


export default function PageTwo() {
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false)
  const { data , mutate } = useSWR(`/groups/get/all?page=${1}`, fetcher)

  const handleOpenModal = () =>{
    // push('/dashboard/prices')
    setOpenModal(true)
  }
  const cancelCourseCreation = () =>{
    setOpenModal(false)
  }

  const submitGroup = async (d: CircleFormProps) => {
    try {
      await createGroup(d)
      setOpenModal(false)
      mutate()
      enqueueSnackbar("The group has been created successfully.")
    }catch (err) {
      console.error(err);
    }

  };


  return (
    <>
      <Head>
        <title> Login | Inner Circle</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        {openModal && <CreateAGroupDialog open={openModal} cancel={cancelCourseCreation} submit={submitGroup}/>}
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
