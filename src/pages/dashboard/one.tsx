// next
import Head from 'next/head';
import { Box, Button, Container, Divider, Typography, Grid} from '@mui/material';
import { TreeView, TreeItem, TreeItemProps, treeItemClasses } from '@mui/lab';
import { alpha, styled } from '@mui/material/styles';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import AppWelcome from '../../components/appWelcome';
import { useState } from 'react';
import { Block } from 'src/components/block/Block';
import Iconify from 'src/components/iconify/Iconify';
import { CreateGroupForm } from 'src/sections/form';
import { FormSchema } from '../../sections/form/schema';
const StyledTreeView = styled(TreeView)({
  height: 240,
  flexGrow: 1,
  maxWidth: 400,
});

const StyledTreeItem = styled((props: TreeItemProps) => <TreeItem {...props} />)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));
// ----------------------------------------------------------------------

PageOne.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

enum add {
  MODULE = 'MODULE',
  LESSON = 'LESSON',
  STRUCTURE = 'STRUCTURE',
}

enum Structure {
  STRUCTURED = 'STRUCTURED',
  UNSTRUCTURED = 'UNSTRUCTURED',
}


const Lesson = () =>{
  const { themeStretch } = useSettingsContext();
  const nameLabel = "name"
  const editorLabel = "Write something about your group."
  const addLesson = () =>{

  }
  return (
    <>
      <Head>
        <title> Page One | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Lesson
        </Typography>

        <Typography gutterBottom>
          Please add a Lesson
        </Typography>
        <CreateGroupForm {...{
          FormSchema, 
          nameLabel, 
          editorLabel, 
          submitData : addLesson
        }}  />
      </Container>
    </>
  );
}

const Module = () =>{
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Head>
        <title> Page One | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Module
        </Typography>

        <Typography gutterBottom>
          Please add a Module
        </Typography>

      </Container>
    </>
  );
}

interface StructureProps {
  handleCourseStructure:(value : string )=>void;
}

const StructurePage = ({handleCourseStructure} : StructureProps) =>{
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ my: 10 }}>
      <Typography variant="h3" component="h1" paragraph>
          How do you want to structure your course ?
      </Typography>
      <Divider sx={{ my: 5 }} />
      <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <Block title="A pile of chapters">
            <StyledTreeView
              defaultCollapseIcon={<Iconify icon="eva:chevron-down-fill" />}
              defaultExpandIcon={<Iconify icon="eva:chevron-right-fill" />}
              defaultEndIcon={null}
            >
                <TreeItem nodeId="1" label="Chapter 1"/>
                <TreeItem nodeId="2" label="Chapter 2" />
                <TreeItem nodeId="3" label="Chapter 3"/>
                <TreeItem nodeId="4" label="Chapter 4" />
                <TreeItem nodeId="5" label="Chapter 5" />
                <TreeItem nodeId="10" label="Chapter 6" />
                <TreeItem nodeId="11" label="..." />
                <TreeItem nodeId="12" label="Chapter N" />
            </StyledTreeView>
            <Button size="large" color="warning" variant="contained" sx={{ mt: 5, mb: 2 }} 
            onClick={()=>handleCourseStructure(Structure.UNSTRUCTURED)}>
            Piling my chapters is ok
            </Button>
          </Block>

          <Block title="Chapters are grouped in modules">
            <StyledTreeView defaultExpanded={['m1', 'm2']}>
              <StyledTreeItem nodeId="m1" label="Module 1">
                <StyledTreeItem nodeId="c1" label="Chapter 1"/>
                <StyledTreeItem nodeId="c2" label="Chapter 2"/>
                <StyledTreeItem nodeId="c3" label="Chapter 3"/>
                <StyledTreeItem nodeId="c7" label="..."/>
                <StyledTreeItem nodeId="c8" label="Chapter N"/>
              </StyledTreeItem>
              <StyledTreeItem nodeId="m2" label="Module 2">
                <StyledTreeItem nodeId="c4" label="Chapter 1"/>
                <StyledTreeItem nodeId="c5" label="Chapter 2"/>
                <StyledTreeItem nodeId="c6" label="Chapter 3"/>
                <StyledTreeItem nodeId="c9" label="..."/>
                <StyledTreeItem nodeId="c10" label="Chapter N"/>
              </StyledTreeItem>
            </StyledTreeView>
            <Button size="large" color="primary" variant="contained" sx={{ mt: 5, mb: 2 }} 
              onClick={()=>handleCourseStructure(Structure.STRUCTURED)}>
              I want to structure my chapters in modules
            </Button>
          </Block>
        </Box>
      </Container>
    </>
  );
}

export default function PageOne() {
  
  const [format, setFormat] = useState(add.LESSON)
  const [chapter, setChapter] = useState({name: "", content : "", video : ""})
  const [module, setModule] = useState({name: "", chapters : []})

  const handleCourseStructure = (value : string) => {
    if (value === Structure.STRUCTURED) {
      setFormat(add.MODULE)
    }
    if (value === Structure.UNSTRUCTURED) {
      setFormat(add.LESSON)
    }
  }
  switch (format){
    case add.STRUCTURE:
      return <StructurePage handleCourseStructure={handleCourseStructure}/>
    case add.MODULE: 
      return <Module/>
    case add.LESSON:
      return <Lesson/>
  }

  // return (
  //   <AppWelcome
  //     title={`Welcome back! \n ${"user?.displayName"}`}
  //     description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
  //     action={<Button variant="contained">Create a course</Button>}
  //   />
  // )

}
