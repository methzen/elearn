// next
import Head from 'next/head';
import { Suspense, useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { Container, Grid, Button } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Markdown from '../../../components/markdown/Markdown';
// components
import { useSettingsContext } from '../../../components/settings';
import Iconify from '../../../components/iconify';
import Video from '../../../components/ChapterDisplayer';
import Menu from '../../../components/CourseMenu';
import { AttachmentDisplayer } from '../../../components/AttachmentDisplayer';
import {CourseSection} from "../../../sections/AddCoursSection"
import SectionPanel from "../../../sections/SectionPanel"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from '../../../redux/store';
import {
  apiCreateASection,
  CreateACourse,
  getCourse,
  CreateCourseData,
} from '../../../redux/slices/course';
import { Video as VideoProps, Chapter, Section, Attachment, Videodata } from '../../../@types/course';
import { CldVideoPlayer } from 'next-cloudinary';
// ----------------------------------------------------------------------

Library.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;
// ----------------------------------------------------------------------

export default function Library() {
  const { themeStretch } = useSettingsContext();
  const { query: { circleId} } = useRouter();
  const courseStore = useSelector((state) => state.course)

  useEffect(() => {
    if (circleId){
      dispatch(getCourse(circleId as string))
    }
  },[circleId])

  const dispatch = useDispatch()
  const [sectionList, setSectionList] = useState<Section[]>([])
  const [currentChapter, setCurrentChapter] = useState<Chapter>()
  const [isLastSectionValidated, setIsLastSectionValidated] = useState(false)

  useEffect(() => {
    if(courseStore?.sections){
      setSectionList(courseStore?.sections)
      const indexOfLastSection = courseStore.sections.length - 1
      const lastSection = courseStore.sections[indexOfLastSection]
      setIsLastSectionValidated(!!lastSection?.isValidated)
    }
  },[courseStore])

  useEffect(() => {
    if(courseStore.currentChapter && courseStore.currentSection){
      setCurrentChapter(undefined)
      setTimeout(()=>{
        const currentSec = courseStore.sections.find(sec=>sec.id===courseStore.currentSection)
        const currentChap = currentSec?.chapters.find(chap=>chap.id===courseStore.currentChapter)
        setCurrentChapter(currentChap)
      }, 1000)
    }
  },[courseStore.currentChapter, courseStore.currentSection])

  const createCourse = () => {
    dispatch(CreateACourse({groupId: circleId} as CreateCourseData))
    // dispatch(addSection())
  }
  const addAsection = () =>{
    dispatch(apiCreateASection(courseStore.id as string))
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
        <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={5}>
            {sectionList.map((section)=>( 
            <CourseSection 
                key={section.name}
                section={section}
                isCurrentSection={section.id===courseStore.currentSection}
                currentChapter={courseStore.currentChapter}
                />
              ))}

              {isLastSectionValidated && <SectionPanel
                title="Add a section"
                onOpen={addAsection}
                sx={{ mt: 5 }}
              />}
          </Grid>
          <Grid item xs={12} md={6}>
          <Suspense key={(Math.random() + 1).toString(36).substring(7)} fallback={<>loading...</>}>
           {currentChapter && <Video chapter={currentChapter as Chapter}/>}
          </Suspense>
          </Grid>
        </Grid>

      </Container>
    </>
  );
}


export function ContentDisplayer(chapter: Chapter) {
  if(!chapter.content) return 
  return (
    <Card >
          <CardContent>
          <Markdown
              key={chapter.id}
              children={chapter.content}
          />
          </CardContent>
    </Card>
  );
}

export function AttachDisplayer(attachments: Attachment[]) {

  if(!!attachments.length) return 
  return (
    <Card >
          <CardContent>
            {attachments.map(
              (Attachment) => <AttachmentDisplayer key={Attachment.id} file={Attachment} />
            )}
          </CardContent>
    </Card>
  );
}

export function videoDisplayer(data: Videodata) {
  if(!!data) return
  return (
    <Card key={(data as Videodata).public_id}>
      <CardContent>
      <CldVideoPlayer
        id={(data as Videodata).public_id}
        width="1920"
        height="1080"
        src={(data as Videodata).public_id}
        logo={false}
        />
      </CardContent>
    </Card>
  );
}