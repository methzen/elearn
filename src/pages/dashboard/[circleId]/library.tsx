// next
import Head from 'next/head';
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { Container, Grid, Button } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../../components/settings';
import Iconify from '../../../components/iconify';
import Video from '../../../components/Video';
import Menu from '../../../components/CourseMenu';
import {CourseSection} from "../../../sections/AddCoursSection"
import SectionPanel from "../../../sections/SectionPanel"
import { useDispatch, useSelector } from '../../../redux/store';
import {
  apiCreateASection,
  updateSection,
  startLoading,
  CreateACourse,
  initalizeCourse,
  getCourse,
} from '../../../redux/slices/course';
import { Video as VideoProps, Attachment, Chapter, Section ,Course } from '../../../@types/course';
import getCourseByGroupId from "../../../api/getCourseByGroupId"
// ----------------------------------------------------------------------

Library.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;
// ----------------------------------------------------------------------

export default function Library() {
  const { themeStretch } = useSettingsContext();
  const { query:{ circleId} } = useRouter();

  const dispatch = useDispatch()
  const [sectionList, setSectionList] = useState<Section[]>([])
  const [isLastSectionValidated, setIsLastSectionValidated] = useState(false)

  const courseStore = useSelector( (state) => state.course )
  
  useEffect(()=>{
    setSectionList(courseStore.sections)
  },[courseStore])

  useEffect(() => {
    if (circleId){
      dispatch(getCourse(circleId as string))
    }
  },[circleId])

  const createCourse = () =>{
    dispatch(CreateACourse(circleId as string))
    // dispatch(addSection())
  }

  const addAsection = () =>{
    dispatch(apiCreateASection(circleId as string, courseStore.id as string))
  }

  const updateSection = () =>{
    console.log("update sections...")
  }

  if (!circleId || !courseStore) return <>loading...</>
  return (
    <>
      <Head>
        <title> Page Three | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
          heading={`Welcome ${"meth"} !`}
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
              onClick={createCourse}
              style={{ marginTop:"20px"}}
            >
              Create a course
            </Button>
          }
        /> 
      {/* <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={3}>
          <Menu />
        </Grid>
          <Grid item xs={12} md={6}>
        <Video  />
          </Grid>
        </Grid> */}

        {sectionList.map((section)=>( 
          <CourseSection 
              key={section.name}
              section={section}
              />
        ))}

        {isLastSectionValidated && <SectionPanel
          title="Add a section"
          onOpen={addAsection}
          sx={{ mt: 5 }}
        />}
      </Container>
    </>
  );
}
