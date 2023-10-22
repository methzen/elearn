// next
import Head from 'next/head';
import { Container, Typography, Box } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import CourseCard from '../../components/CourseCard';

import {
  _userGroups
} from '../../_mock/arrays';
// ----------------------------------------------------------------------

PageTwo.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function PageTwo() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Circles | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <Typography variant="h3" component="h1" paragraph>
          Circles
        </Typography> */}
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
