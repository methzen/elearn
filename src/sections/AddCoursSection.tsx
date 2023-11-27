import { createContext, useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Stack,
  Button,
  CardProps,
  CardHeader,
  Chip,
} from '@mui/material';
// utils
// components
import Iconify from '../components/iconify';
import SectionPanel from "./SectionPanel"
import {ChangeSectionNameDialog} from "./ChangeNameDialog"
import Chapter from "./Chapter"
import { Video as VideoProps, Attachment, Chapter as ChapterType, Section , Course } from '../@types/course';
import { useDispatch, useSelector } from '../redux/store';
import {
  addSection,
  updateSection,
  startLoading,
  apiAddChapter,
  chapterData,
  apiUpdateSection,
} from '../redux/slices/course';
// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  rating: number;
  postedAt: Date | string | number;
  tags: string[];
};

interface ChangeNameProps {
  section: Section;
}

const ChangeName=({section}:ChangeNameProps)=>{
    const [openModal, setOpenModal] = useState(false)
    const [thisSection, setThisSection] = useState<Section>(section)
    const dispatch = useDispatch()
    const handleCloseNewFolder = ()=>{
        setOpenModal(false)
    }

    const onChangeInputValue = (event:React.ChangeEvent<HTMLInputElement>)=>{
      event.preventDefault()
      setThisSection( s => ({...s, name: event.target.value}))
    }

    const saveChangeName = ()=>{
      setOpenModal(false)
      dispatch(apiUpdateSection({
        name: thisSection.name as string,
        sectionId: thisSection.id
      }))
    }

    return(
      <>
        <ChangeSectionNameDialog
        open={openModal}
        onClose={handleCloseNewFolder}
        title="Give a name to this section"
        inputValue={thisSection.name as string}
        onChangeInputValue={onChangeInputValue}
        onCreate={saveChangeName}
        />
      
        <Chip size="small" label={"Change Section Name"} sx={{ mr: 1, mb: 1, color: 'text.secondary', cursor:"pointer"}}
          onClick={()=>setOpenModal(true)} />
      </>
    )
}

interface Props extends CardProps {
  title?: string;
  list?: ItemProps[];
}

interface CourseSection extends CardProps {
  section: Section;
}

export type ChapterProps = {
  index: number;
  chapter: ChapterType;
  handleAddAttachment: (index:number)=>void;
  handleAddArticle: (index:number)=>void;
  handleAddVideo: (index:number)=>void;
  onDelete: (index:number)=>void;
};


export function CourseSection({ section, ...other }: CourseSection) {
  const theme = useTheme();
  const dispatch = useDispatch()

  const [chapterList, setChapterList] = useState<ChapterType[]>([])
  useEffect(()=> {
    setChapterList(section.chapters)
  }, [section])

  const subheader = chapterList.length===0 ? "This section has 0 chapter" : `${chapterList.length} Chatper(s)`
  const [addChapterModal, setAddChapterModal] = useState(false)
  // const [openCloudinaryDialog, setOpenCloudinaryDialog] = useState<{value : boolean, index: number | null}>({value : false, index: null})
  
  const [addedChapterName, setAddedChapterName] = useState<string>(`Chapter ${chapterList.length +1}`)

  const onChangeInputValue = (event:React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    setAddedChapterName(event.target.value)
  }

  const handleAddChapter = () => {
    setAddChapterModal(false)
    dispatch(apiAddChapter({name : addedChapterName, sectionId: section.id} as chapterData))
  }

  return (
    <Card {...other}>
      <CardHeader
        title={section.name}
        subheader={subheader}
        action={<ChangeName section={section}/>}
        sx={{
          '& .MuiCardHeader-action': { alignSelf: 'center' },
          marginBottom: 5
        }}
      />
      <ChangeSectionNameDialog
        open={addChapterModal}
        onClose={()=>setAddChapterModal(false)}
        title="Give a name to this chapter"
        inputValue={addedChapterName}
        onChangeInputValue={onChangeInputValue}
        onCreate={handleAddChapter}
      />
        {
          chapterList.map((chapter, index) => (
            <Chapter key={index} chapter={chapter} courseId={section.course as string}/>
          ))
        }
        <SectionPanel
            title="Add a Chapter"
            onOpen={()=> setAddChapterModal(true)}
            sx={{ ml: 3, mt: 2 }}
        />
      <Stack
        spacing={4}
        maxWidth={500}
        direction="row"
        alignItems="flex-end"
        sx={{
          p: theme.spacing(0, 3, 3, 3),
        }}
      >
        <Button
          fullWidth
          color="success"
          variant="contained"
          startIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          onClick={() => console.log('ACCEPT')}
        >
          Save
        </Button>

        <Button
          fullWidth
          color="error"
          variant="contained"
          startIcon={<Iconify icon="eva:close-circle-fill" />}
          onClick={() => console.log('REJECT')}
        >
          Delete
        </Button>
      </Stack>
    </Card>
  );
}

