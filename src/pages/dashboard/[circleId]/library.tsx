// next
import Head from 'next/head';
import { Suspense, useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { Container, Grid, Button } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../../components/settings';
import Iconify from '../../../components/iconify';
import Video from '../../../components/ChapterDisplayer';
import {CourseSection} from "../../../sections/AddCoursSection"
import SectionPanel from "../../../sections/SectionPanel"
import { useDispatch, useSelector } from '../../../redux/store';
import {
  apiCreateASection,
  CreateACourse,
  getCourse,
  CreateCourseData,
  apiEditOrSaveCourse,
} from '../../../redux/slices/course';
import { Chapter, Section } from '../../../@types/course';
import { useAuthContext } from 'src/auth/useAuthContext';
import CircleAccessGuard, { CircleAccessRoleContext, RoleType } from 'src/auth/CircleAccessGuard';
// ----------------------------------------------------------------------

Library.getLayout = (page: React.ReactElement) => <CircleAccessGuard pageName='Library'><DashboardLayout>{page}</DashboardLayout></CircleAccessGuard>;
// ----------------------------------------------------------------------

const enum LibraryPageType {
  EDITING_COURSE = 'EDITING_COURSE',
  SAVED_COURSE = 'SAVED_COURSE',
  NO_COURSE = 'NO_COURSE',
  ONLY_VIEW = 'ONLY_VIEW'
}

const GetCustomBreadcrumbsAction =({userName, pageType, isAdmin, actionHandler}:
  {
    userName: string
    pageType: string
    isAdmin: boolean
    actionHandler: () => void;
  }
  )=>{
  
  const getInputs = (pageType:string) => {
    switch(pageType){
      case LibraryPageType.EDITING_COURSE:
        return {
          icon : null,
          linkName: 'Finish editing your course and save it.',
          action: true,
          btnText: 'Save Course'
        }
      case LibraryPageType.SAVED_COURSE:
        return {
          icon : null,
          linkName: ``,
          action: true,
          btnText: 'Edit Course'
        }
      case LibraryPageType.NO_COURSE:
        return {
          icon : <Iconify icon="eva:plus-fill" />,
          linkName: `You have not created a course yet.`,
          action: true,
          btnText: 'Add Course'
        }
      case LibraryPageType.ONLY_VIEW:
        return {
          icon : null,
          linkName: isAdmin? 'What will you learn today ?':`The owner of this circle has not created a course yet.`,
          action: false,
          btnText: ''
        }
    }
    }
  const welcomeHeading = `Welcome ${userName} !`
  const inputs = getInputs(pageType)

  return(
    <CustomBreadcrumbs
    heading={welcomeHeading}
    links={[
      {
        name: inputs?.linkName,
        // href: PATH_DASHBOARD.root,
      },
    ]}
    action={inputs?.action?
      <Button
        variant="contained"
        startIcon={inputs.icon}
        onClick={actionHandler}
        style={{ marginTop:"20px"}}
      >
        {inputs.btnText}
      </Button>: null
    }
  />
  )
}

export default function Library() {
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { query: { circleId} } = useRouter();
  const courseStore = useSelector((state) => state.course)
  const [pageType, setPageType] = useState(LibraryPageType.EDITING_COURSE)
  const [hasCourse, setHasCourse] = useState<boolean|undefined>()
  const context = useContext(CircleAccessRoleContext)
  const isAdmin = context?.role === RoleType.admin

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
    const hasCourse = courseStore && courseStore.name &&  (!!courseStore.sections.length)
    setHasCourse(hasCourse as boolean)
      if(isAdmin){
        if(!hasCourse){
          setPageType(LibraryPageType.NO_COURSE)
        }else{
          if(courseStore.isSaved){
            setPageType(LibraryPageType.SAVED_COURSE)
          }
          else{
            setPageType(LibraryPageType.EDITING_COURSE)
          }
        }
      }else{
        setPageType(LibraryPageType.ONLY_VIEW)
      }
      if(hasCourse){
        setSectionList(courseStore?.sections)
        const indexOfLastSection = courseStore.sections.length - 1
        const lastSection = courseStore.sections[indexOfLastSection]
        setIsLastSectionValidated(!!lastSection?.isValidated)
      }
  },[courseStore])

  useEffect(() => {
    if(courseStore.currentChapter && courseStore.currentSection){
      setCurrentChapter(undefined)
      const currentSec = courseStore.sections.find(sec=>sec.id===courseStore.currentSection)
      const currentChap = currentSec?.chapters.find(chap=>chap.id===courseStore.currentChapter)
      setCurrentChapter(currentChap)
  }
  },[courseStore.currentChapter, courseStore.currentSection])

  const createCourse = () => {
    dispatch(CreateACourse({groupId: circleId} as CreateCourseData))
  }

  const saveCourse = () => {
    const notSavedSection = sectionList.filter(sec => !sec.isValidated)
    if( notSavedSection.length > 0 ) return
    dispatch(
      apiEditOrSaveCourse(
        {
          groupId: courseStore.groupId as string,
          courseId: courseStore.id as string,
          forSave: true
        }
      )
    )
  }

  const editCourse = () => {
    dispatch(
      apiEditOrSaveCourse(
        {
          groupId: courseStore.groupId as string,
          courseId: courseStore.id as string,
          forSave: false
        }
      )
    )
  }

  const addAsection = () =>{
    dispatch(apiCreateASection(courseStore.id as string))
  }

  const actionHandler = () => {
    switch(pageType){
      case LibraryPageType.EDITING_COURSE:
        return saveCourse()
      case LibraryPageType.NO_COURSE:
        return createCourse()
      case LibraryPageType.SAVED_COURSE:
        return editCourse()
      case LibraryPageType.ONLY_VIEW:
        return
    }
  }

  if (!circleId || !courseStore) return <>loading...</>
  return (
    <>
      <Head>
        <title> Library | SmallCircle </title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <GetCustomBreadcrumbsAction
          isAdmin={!!hasCourse}
          userName={user!.displayName} 
          pageType={pageType} 
          actionHandler={actionHandler}
      />
        <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={5}>
          {sectionList.map((section)=>( 
          <CourseSection 
              key={section.name}
              section={section}
              isCurrentSection={section.id===courseStore.currentSection}
              currentChapter={courseStore.currentChapter}
              readMode={[
                LibraryPageType.ONLY_VIEW,
                LibraryPageType.SAVED_COURSE
              ].includes(pageType)}
              />
            ))
          }
          {[
            LibraryPageType.ONLY_VIEW,
            LibraryPageType.SAVED_COURSE
          ].includes(pageType)? null : isLastSectionValidated 
            && <SectionPanel
            title="Add a section"
            onOpen={addAsection}
            sx={{ mt: 5 }}
          />}
          </Grid>
          <Grid item xs={12} md={6}>
          <Suspense fallback={<>loading...</>}>
           {currentChapter && <Video chapter={currentChapter as Chapter}/>}
          </Suspense>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
