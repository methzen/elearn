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
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore } from '../components/CardExpender'
// utils
// components
import Iconify from '../components/iconify';
import SectionPanel from "./SectionPanel"
import {ChangeSectionNameDialog} from "./ChangeNameDialog"
import Chapter from "./Chapter"
import {Chapter as ChapterType, Section } from '../@types/course';
import { useDispatch } from '../redux/store';
import {
  apiAddChapter,
  chapterData,
  apiUpdateSection,
} from '../redux/slices/course';
import Label from 'src/components/label/Label';
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
  edit?: boolean
}

const SectionUpdate=({section, edit}:ChangeNameProps) => {
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
    const AllowSectionUpdate = () =>{
      dispatch(apiUpdateSection({
        isValidated: false,
        sectionId: thisSection.id
      }))
    }

    const label = edit? "Edit Section": "Change Section Name"
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
      
        <Chip size="small" label={label} 
              sx={{ mr: 1, mb: 1, color: 'text.secondary', cursor:"pointer", mt: edit? 3: -2}}
          onClick={edit? AllowSectionUpdate: ()=>setOpenModal(true)} />
      </>
    )
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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [chapterList, setChapterList] = useState<ChapterType[]>([])
  useEffect(()=> {
    setChapterList(section.chapters)
  }, [section])

  const subheader = chapterList.length === 0 ? "This section has 0 chapter" : `${chapterList.length} Chatper(s)`
  const [addChapterModal, setAddChapterModal] = useState(false)
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
    <Card {...other} sx={{mb:2}}>
      <CardHeader
        title={section.name}
        subheader={subheader}
        action={section.isValidated? 
        <Label variant={'soft'} color={'success'}> validated </Label>: <SectionUpdate section={section}/>}
        sx={{
          '& .MuiCardHeader-action': { alignSelf: 'center', mt:-2},
          py:1,
          marginBottom: 0
        }}
      />
      {!section.isValidated && 
        <ChangeSectionNameDialog
        open={addChapterModal}
        onClose={()=>setAddChapterModal(false)}
        title="Give a name to this chapter"
        inputValue={addedChapterName}
        onChangeInputValue={onChangeInputValue}
        onCreate={handleAddChapter}
      />
      }
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
          {
        chapterList.map((chapter, index) => (
          <Chapter key={index} chapter={chapter} courseId={section.course as string}/>
        ))
      }
       {!section.isValidated && 
       <SectionPanel
            title="Add a Chapter"
            onOpen={()=> setAddChapterModal(true)}
            sx={{ ml: 3, mt: 2 }}
        />}
      <Stack
        direction="row"
        gap={5}
      >
        {
          section.isValidated?
          <SectionUpdate section={section} edit/>
          :
          <>
          <Button
            fullWidth
            color="success"
            variant="contained"
            startIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
            onClick={() => dispatch(apiUpdateSection({sectionId:section.id, isValidated:true}))}
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
          </>
        }
      </Stack>
          </CardContent>
      </Collapse>
    </Card>
  );
}

