import { Container, Paper } from '@mui/material';

// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { CreateGroupForm } from 'src/sections/form';
import useResponsive from 'src/hooks/useResponsive';
import createGroup from 'src/api/createGroup';
import { CircleFormProps } from 'src/sections/form/CreateGroupForm';
import { useSnackbar } from '../../components/snackbar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';
// ----------------------------------------------------------------------

create.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function create() {
  const { push } = useRouter();
  const { themeStretch } = useSettingsContext();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isDesktop = useResponsive('up', 'sm');
  const fullWidth = isDesktop ? 700 : 400;

  const handleCreateGroup = async (data: CircleFormProps) => {
    try {
      setIsLoading(true);
      const response = await createGroup(data);
      enqueueSnackbar('Circle has been created successfully.');
      setIsLoading(false);
      push(PATH_DASHBOARD.group.community(response.data.urlName));
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || 'failed to create circle', { variant: 'error' });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title> Create a circle</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Paper
          sx={{
            width: `${fullWidth}px`,
            right: `calc((100% - ${fullWidth}px)/2)`,
            margin: '20px auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CreateGroupForm
            {...{
              isLoading: isLoading,
              submitData: handleCreateGroup,
            }}
          />
        </Paper>
      </Container>
    </>
  );
}
