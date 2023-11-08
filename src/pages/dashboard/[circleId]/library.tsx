// next
import Head from 'next/head';
import {useState} from 'react'
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
  addSection,
  updateSection,
  startLoading
} from '../../../redux/slices/course';
import { Video as VideoProps, Attachment, Chapter, Section ,Course } from '../../../@types/course';
// ----------------------------------------------------------------------

Library.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Library() {
  const { themeStretch } = useSettingsContext();

  const courseStore = useSelector( state => state.course )
  const dispatch = useDispatch()

  const [sectionList, setSectionList] = useState<Section[]>(courseStore.sections)
  const [isLastSectionValidated, setIsLastSectionValidated] = useState(false)

  const addAsection = () =>{
    dispatch(addSection())
    setSectionList(courseStore.sections)
  }

  const updateSection = () =>{
    console.log("update sections...")
  }

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
              onClick={addAsection}
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
              updateSection={updateSection}/>
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
