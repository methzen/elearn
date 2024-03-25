import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, CardProps, CardHeader, Chip } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { ExpandMore as MUIExpandMore } from '@mui/icons-material';

import { ExpandMore } from '../components/CardExpender';
// utils
// components
import Iconify from '../components/iconify';
import SectionPanel from './SectionPanel';
import { ChangeSectionNameDialog } from './ChangeNameDialog';
import Chapter from './Chapter';
import { Chapter as ChapterType, Section } from '../@types/course';
import { useDispatch } from '../redux/store';
import {
  apiAddChapter,
  chapterData,
  apiUpdateSection,
  apiDeleteSection,
} from '../redux/slices/course';
import Label from 'src/components/label/Label';
// ----------------------------------------------------------------------
interface ChangeNameProps {
  section: Section;
  edit?: boolean;
}

const SectionUpdate = ({ section, edit }: ChangeNameProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [thisSection, setThisSection] = useState<Section>(section);
  const dispatch = useDispatch();
  const handleCloseNewFolder = () => {
    setOpenModal(false);
  };

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setThisSection((s) => ({ ...s, name: event.target.value }));
  };

  const saveChangeName = () => {
    setOpenModal(false);
    dispatch(
      apiUpdateSection({
        name: thisSection.name as string,
        sectionId: thisSection._id,
      })
    );
  };
  const AllowSectionUpdate = () => {
    dispatch(
      apiUpdateSection({
        isValidated: false,
        sectionId: thisSection._id,
      })
    );
  };

  const label = edit ? 'Edit section' : 'Change section same';
  return (
    <>
      <ChangeSectionNameDialog
        open={openModal}
        onClose={handleCloseNewFolder}
        title="Give a name to this section"
        inputValue={thisSection.name as string}
        onChangeInputValue={onChangeInputValue}
        onCreate={saveChangeName}
      />
      <Chip
        size="small"
        label={label}
        sx={{ mr: 1, mb: 1, color: 'text.secondary', cursor: 'pointer', mt: edit ? 3 : -2 }}
        onClick={edit ? AllowSectionUpdate : () => setOpenModal(true)}
      />
    </>
  );
};

interface CourseSectionProps extends CardProps {
  section: Section;
  setCurrent: (sectionId: string, chapterId: string) => void;
  current: { sectionId: string; chapterId: string };
  readOnly?: boolean;
}

export function CourseSection({
  section,
  setCurrent,
  current,
  readOnly = true,
  ...other
}: CourseSectionProps) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [readMode] = useState(readOnly);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [chapterList, setChapterList] = useState<ChapterType[]>([]);

  useEffect(() => {
    if (section.chapters) {
      setChapterList(section.chapters);
    }
  }, [section]);

  const subheader =
    chapterList.length === 0 ? 'This section has 0 chapter' : `${chapterList.length} Chatper(s)`;
  const [addChapterModal, setAddChapterModal] = useState(false);
  const [addedChapterName, setAddedChapterName] = useState<string>(
    `Chapter ${chapterList.length + 1}`
  );

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAddedChapterName(event.target.value);
  };

  const handleAddChapter = () => {
    setAddChapterModal(false);
    dispatch(apiAddChapter({ name: addedChapterName, sectionId: section._id } as chapterData));
  };

  if (readMode) {
    return <SectionReader setCurrent={setCurrent} current={current} section={section} />;
  }

  return (
    <Card {...other} sx={{ mb: 2 }}>
      <CardHeader
        title={section.name}
        subheader={subheader}
        action={
          section.isValidated ? (
            <Label variant="soft" color="success">
              {' '}
              validated{' '}
            </Label>
          ) : (
            <SectionUpdate section={section} />
          )
        }
        sx={{
          '& .MuiCardHeader-action': { alignSelf: 'center', mt: -2 },
          py: 1,
          marginBottom: 0,
        }}
      />
      {!section.isValidated && (
        <ChangeSectionNameDialog
          open={addChapterModal}
          onClose={() => setAddChapterModal(false)}
          title="Give a name to this chapter"
          inputValue={addedChapterName}
          onChangeInputValue={onChangeInputValue}
          onCreate={handleAddChapter}
        />
      )}
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
          {chapterList.map((chapter, index) => (
            <Chapter
              key={index}
              chapter={chapter}
              courseId={section.course as string}
              isSelected={current.chapterId === chapter._id}
              readMode={readMode}
            />
          ))}
          {!section.isValidated && (
            <SectionPanel
              title="Add a Chapter"
              onOpen={() => setAddChapterModal(true)}
              sx={{ ml: 1, mt: 3 }}
            />
          )}
          <Stack direction="row" justifyContent="space-between">
            {section.isValidated ? (
              <SectionUpdate section={section} edit />
            ) : (
              <>
                <Button
                  color="success"
                  variant="contained"
                  startIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
                  onClick={() =>
                    dispatch(apiUpdateSection({ sectionId: section._id, isValidated: true }))
                  }
                >
                  Save
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  startIcon={<Iconify icon="eva:close-circle-fill" />}
                  onClick={() =>
                    dispatch(apiDeleteSection(section.course as string, section._id as string))
                  }
                >
                  Delete
                </Button>
              </>
            )}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export function SectionReader({ section, current, setCurrent }: CourseSectionProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (section && current) {
      setOpen(section._id === current.sectionId);
    }
  }, [section, current]);

  return (
    <List
      sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText
          primaryTypographyProps={{
            fontSize: 22,
            color: 'primary.main',
            fontWeight: 'bold',
          }}
          primary={section.name}
        />
        {open ? <ExpandLess /> : <MUIExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {section.chapters?.map((chapter) => (
            <ListItemButton
              sx={{ pl: 4 }}
              key={chapter._id}
              selected={current.chapterId === chapter._id}
              onClick={(event) => setCurrent(section._id as string, chapter._id as string)}
            >
              <ListItemText
                primary={chapter.name}
                sx={{ fontWeight: 'bold' }}
                primaryTypographyProps={{
                  fontSize: 17,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
