// next
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Grid, Button } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../../components/settings';
import Iconify from '../../../components/iconify';
import { CourseSection } from '../../../sections/AddCoursSection';
import { Chapter, Course, Section } from '../../../@types/course';
import { useAuthContext } from 'src/auth/useAuthContext';
import { CircleAccessRoleContext, RoleType } from 'src/auth/CircleAccessGuard';
import { useQuery } from '@tanstack/react-query';
import {
  apiSetCurrentChapter,
  getCourseByGroupUrlNameForLecture,
} from 'src/api/getCourseByGroupId';
import LoadingScreen from 'src/components/loading-screen';
import { PATH_DASHBOARD } from 'src/routes/paths';
const Video = dynamic(() => import('../../../components/ChapterDisplayer'), { ssr: false });
// ----------------------------------------------------------------------

Library.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;
// ----------------------------------------------------------------------

export default function Library() {
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const {
    push,
    query: { circleId },
  } = useRouter();

  if (!circleId) return <LoadingScreen />;

  const context = useContext(CircleAccessRoleContext);
  const isAdmin = context?.role === RoleType.admin;

  const [currentChapter, setCurrentChapter] = useState<{ sectionId: string; chapterId: string }>({
    sectionId: '',
    chapterId: '',
  });

  const { data, error, isLoading } = useQuery<Course, string>({
    queryKey: ['course'],
    queryFn: () => getCourseByGroupUrlNameForLecture(circleId as string),
  });

  useEffect(() => {
    if (!!data) {
      setCurrentChapter(data.viewCurrentChapter);
    }
  }, [data]);

  if (isLoading) return <LoadingScreen />;

  const handleSetCurrentChapter = async (sectionId: string, chapterId: string) => {
    setCurrentChapter({ sectionId, chapterId });
    apiSetCurrentChapter({
      chapterId,
      sectionId,
      groupId: data?.groupId as string,
      courseId: data?._id as string,
    });
  };

  const getChapter = () => {
    let cuChapter;
    if (data?.sections.length && currentChapter.chapterId) {
      const currentSection = data.sections.find(
        (section) => section._id === currentChapter.sectionId
      ) as Section;
      cuChapter = currentSection?.chapters.find(
        (chapter) => chapter._id === currentChapter.chapterId
      ) as Chapter;
    }
    return cuChapter;
  };

  const linkName = !!data
    ? 'What will you learn today ?'
    : isAdmin
    ? 'You have not created a course yet'
    : `The owner of this circle has not created a course yet.`;

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
          action={
            isAdmin ? (
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => push(PATH_DASHBOARD.group.createCourse(circleId as string))}
                style={{ marginTop: '20px' }}
              >
                {`${!!data ? `update` : `create`}`}
              </Button>
            ) : null
          }
        />
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={12} md={5}>
            {data &&
              currentChapter &&
              data?.sections.map((section) => (
                <CourseSection
                  key={section.name}
                  section={section}
                  current={currentChapter}
                  setCurrent={handleSetCurrentChapter}
                  readOnly={true}
                />
              ))}
          </Grid>
          <Grid item xs={12} md={7}>
            {currentChapter.chapterId && <Video chapter={getChapter()} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
