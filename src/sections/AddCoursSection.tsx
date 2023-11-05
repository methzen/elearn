import { createContext, useState } from 'react';
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

interface section {
  id: number;
  name: string;
  isValidated: boolean;
}

interface ChangeNameProps {
  section: section;
  update: (value: section) => void;
}

const ChangeName=({section, update}:ChangeNameProps)=>{
    const [openModal, setOpenModal] = useState(false)
    const [thisSection, setThisSection] = useState<section>(section)

    const handleCloseNewFolder = ()=>{
        setOpenModal(false)
    }

    const onChangeInputValue = (event:React.ChangeEvent<HTMLInputElement>)=>{
      event.preventDefault()
      setThisSection( s => ({...s, name: event.target.value}))
    }

    const saveChangeName = ()=>{
        setOpenModal(false)
        update(thisSection)
    }

    return(
        <>
        <ChangeSectionNameDialog
        open={openModal}
        onClose={handleCloseNewFolder}
        title="Give a name to this section"
        inputValue={thisSection.name}
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

interface section {
  id: number;
  name: string;
  isValidated: boolean;
}

interface CourseSection extends CardProps {
  section: section;
  updateSection: (section: section)=> void;
}

interface ChapterType {
  id?: number;
  name: string;
  videoContent: string;
  textContent: string;
  attachement: any
}


export type ChapterProps = {
  index: number;
  chapter: ChapterType;
  handleAddAttachment: (index:number)=>void;
  handleAddArticle: (index:number)=>void;
  handleAddVideo: (index:number)=>void;
  onDelete: (index:number)=>void;
};




export function CourseSection({ section, updateSection, ...other }: CourseSection) {
  const theme = useTheme();
  const [chapterList, setChapterList] = useState<ChapterType[]>([])
  const subheader = chapterList.length===0 ? "This section has 0 chapter" : `${chapterList.length} Chatpers`
  const [addChapterModal, setAddChapterModal] = useState(false)
  const [openCloudinaryDialog, setOpenCloudinaryDialog] = useState<{value : boolean, index: number | null}>({value : false, index: null})
  
  const [currentChapter, setCurentChapter] = useState<ChapterType>({
    name: `Chapter ${chapterList.length}`,
    videoContent: "",
    textContent: "",
    attachement: []
  })

  const [localSection, setSection] = useState(section)

  const update = (section:section) => {
    setSection( s => ({...s, ...section}))
  }

  const onChangeInputValue = (event:React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    setCurentChapter( s => ({...s, name: event.target.value}))
  }

  const saveChangeChapterName = () => {
    setChapterList(list=>([...list, currentChapter]))
    setAddChapterModal(false)
  }

  const handleAddAttachment = (index:number) => {
    console.log('user want to add attachment', index)
  };

  const handleAddArticle = (index:number) => {
    console.log('user want to add article', index)
  };

  const handleAddVideo = (index:number, publicId:string) => {
    const newChapterList = chapterList;
    const chapter = newChapterList[index]
    chapter.videoContent = publicId
    newChapterList[index] = chapter;
    setChapterList(newChapterList)
  };

  const onDelete = (index:number) => {
    console.log('user want to delete chapter', index)
  }

  const linkVideoAddedToChapter = (value:any) =>{

  }
  return (
    <Card {...other}>
      <CardHeader
        title={localSection.name}
        subheader={subheader}
        action={<ChangeName section={localSection} update={update}/>}
        sx={{
          '& .MuiCardHeader-action': { alignSelf: 'center' },
          marginBottom: 5
        }}
      />
      <ChangeSectionNameDialog
        open={addChapterModal}
        onClose={()=>setAddChapterModal(false)}
        title="Give a name to this chapter"
        inputValue={currentChapter.name}
        onChangeInputValue={onChangeInputValue}
        onCreate={saveChangeChapterName}
      />
        {
          chapterList.map((chapter, index) => (
            <Chapter key={index} {...{
                index,
                chapter,
                handleAddAttachment,
                handleAddArticle,
                handleAddVideo,
                onDelete
            }}/>
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
          Create Section
        </Button>

        <Button
          fullWidth
          color="error"
          variant="contained"
          startIcon={<Iconify icon="eva:close-circle-fill" />}
          onClick={() => console.log('REJECT')}
        >
          Cancel Section
        </Button>
      </Stack>
    </Card>
  );
}

