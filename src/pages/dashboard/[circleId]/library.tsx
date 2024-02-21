// next
import Head from 'next/head';
import { useContext } from 'react'
import { useRouter } from 'next/router';
import { Container, Grid, Button } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../../components/settings';
import Iconify from '../../../components/iconify';
import {CourseSection} from "../../../sections/AddCoursSection"
import { Chapter, Course } from '../../../@types/course';
import { useAuthContext } from 'src/auth/useAuthContext';
import CircleAccessGuard, { CircleAccessRoleContext, RoleType } from 'src/auth/CircleAccessGuard';
import { useQuery } from '@tanstack/react-query';
import getCourseByGroupId from 'src/api/getCourseByGroupId';
import LoadingScreen from 'src/components/loading-screen';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Video from '../../../components/ChapterDisplayer';
// ----------------------------------------------------------------------

Library.getLayout = (page: React.ReactElement) => <CircleAccessGuard><DashboardLayout>{page}</DashboardLayout></CircleAccessGuard>;
// ----------------------------------------------------------------------

export default function Library() {
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { push, query: { circleId} } = useRouter();
  const context = useContext(CircleAccessRoleContext)
  const isAdmin = context?.role === RoleType.admin

  const {data, error, isLoading} = useQuery<Course, string>({
    queryKey: ['course'],
    queryFn: () => getCourseByGroupId(circleId as string)
  })

  if (!circleId || isLoading) return <LoadingScreen />

  const linkName = !!data? 'What will you learn today ?' 
  : isAdmin? 'You have not created a course yet'
  :`The owner of this circle has not created a course yet.`

  return (
    <>
      <Head>
        <title> Library | Inner Circle </title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={`Welcome ${user?.firstname} !`}
        links={[
          {
            name: linkName,
          },
        ]}
        action={isAdmin?
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={()=> push(PATH_DASHBOARD.group.createCourse(circleId as string))}
            style={{ marginTop:"20px"}}
          >
            {`${!!data? `update` : `create`}`}
          </Button>: null
        }
      />
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} md={5}>
            {data && data.sections.map((section)=>( 
            <CourseSection 
                key={section.name}
                section={section}
                isCurrentSection={section.id===data.sections[0].id}
                currentChapter={data.sections[0].chapters[0].id}
                readOnly={true}
                />
              ))
            }
          </Grid>
          <Grid item xs={12} md={6}>
           {data?.sections[0].chapters[0] && <Video chapter={data?.sections[0].chapters[0] as Chapter}/>}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
