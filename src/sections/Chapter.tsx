import { useState } from 'react';
// @mui
import {
  Box,
  Stack,
  Divider,
  MenuItem,
  Typography,
  PaperProps,
  IconButton,
  Dialog,
  Button,
  Paper,
} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// import useCopyToClipboard from '../../hooks/useCopyToClipboard';
// components
import Iconify from '../components/iconify';
import MenuPopover from '../components/menu-popover';
//
import { CldUploadWidget, CldUploadWidgetPropsOptions } from 'next-cloudinary';
// import { FileShareDialog, FileDetailsDrawer } from '../../file';
import { styled } from '@mui/material/styles';
import { Chapter as ChapterType } from '../@types/course';
import { useDispatch } from '../redux/store';
import {
  apiAddVideoContent,
  videoData,
  apiAddTextContent,
  contentData,
  apiAddAttachment,
  attachmentData,
  apiDeleteChapter,
  setCurrentChapter,
} from '../redux/slices/course';
import Editor from '../components/editor';
import Markdown from '../components/markdown/Markdown';
import { AttachmentUploader } from './form';
import { AttachmentProps } from '../@types/file';
// ----------------------------------------------------------------------

const options = {
  sources: ['local'],
  showAdvancedOptions: false,
  cropping: false,
  multiple: false,
  defaultSource: 'local',
  styles: {
    palette: {
      window: '#F5F5F5',
      sourceBg: '#FFFFFF',
      windowBorder: '#90a0b3',
      tabIcon: '#0094c7',
      inactiveTabIcon: '#69778A',
      menuIcons: '#0094C7',
      link: '#53ad9d',
      action: '#8F5DA5',
      inProgress: '#0194c7',
      complete: '#53ad9d',
      error: '#c43737',
      textDark: '#000000',
      textLight: '#FFFFFF',
    },
    fonts: {
      default: null,
      "'Poppins', sans-serif": {
        url: 'https://fonts.googleapis.com/css?family=Poppins',
        active: true,
      },
    },
  },
};
interface ChapterProps extends PaperProps {
  index?: number;
  chapter: ChapterType;
  courseId: string;
  isSelected: boolean;
  readMode?: boolean;
  handleAddAttachment?: (index: number) => void;
  handleAddArticle?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export default function ChapterComponent({
  chapter,
  courseId,
  isSelected,
  readMode = true,
  sx,
  ...other
}: ChapterProps) {
  const isDesktop = useResponsive('up', 'sm');

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openContentTextDialog, setOpenContentTextDialog] = useState(false);
  const [displayChatperContentText, setDisplayChapterContentText] = useState(false);
  const [openAddAttachmentDialog, setOpenAddAttachmentDialog] = useState(false);

  const dispatch = useDispatch();

  const handleAddVideo = (info: any) => {
    const vd: videoData = {
      title: '',
      chapterId: chapter.id as string,
      courseId,
      data: { ...info },
    };
    dispatch(apiAddVideoContent(vd));
  };

  const handleAddArticle = (content: string) => {
    setDisplayChapterContentText(false);
    setOpenContentTextDialog(false);
    const cd: contentData = {
      chapterId: chapter.id as string,
      content,
      courseId,
    };
    dispatch(apiAddTextContent(cd));
  };

  const handleSubmitAttachment = (data: AttachmentProps) => {
    setOpenAddAttachmentDialog(false);
    const InputData: attachmentData = {
      title: data.name,
      chapterId: chapter.id as string,
      courseId,
      singleUpload: data.singleUpload,
    };
    dispatch(apiAddAttachment(InputData));
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleEditArticle = () => {
    setDisplayChapterContentText(false);
  };

  if (readMode)
    return <ChapterOnReadOnly chapter={chapter} courseId={courseId} isSelected={isSelected} />;
  return (
    <>
      {openAddAttachmentDialog && (
        <AddAttachmentDialog
          open={openAddAttachmentDialog}
          cancel={() => setOpenAddAttachmentDialog(false)}
          submitData={handleSubmitAttachment}
        />
      )}
      {openContentTextDialog && (
        <AddTextContentDialog
          open={openContentTextDialog}
          display={displayChatperContentText}
          chapter={chapter}
          cancel={() => setOpenContentTextDialog(false)}
          handleAddArticle={handleAddArticle}
          handleEditArticle={handleEditArticle}
        />
      )}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          position: 'relative',
          ...sx,
        }}
        {...other}
      >
        <Stack
          onClick={() =>
            dispatch(setCurrentChapter({ chapterId: chapter.id, sectionId: chapter.section }))
          }
          direction="row"
          sx={{
            margin: '3px 1px',
            px: 1.5,
            borderRadius: 1,
            width: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            border: (theme) => `solid 1px ${isSelected ? 'green' : theme.palette.divider}`,
          }}
        >
          <Typography variant="subtitle2" sx={{ cursor: 'pointer', py: 1.5 }}>
            {chapter.name}
          </Typography>

          <Stack
            spacing={0.75}
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', color: 'text.disabled' }}
          >
            {chapter.video && (
              <IconButton>
                <Iconify icon="mdi:youtube" />
              </IconButton>
            )}

            {chapter.content && (
              <IconButton>
                <Iconify icon="mdi:text-box-outline" />
              </IconButton>
            )}

            {chapter.attachments.length ? (
              <IconButton>
                <Iconify icon="mdi:file-document" />
              </IconButton>
            ) : null}
          </Stack>
        </Stack>

        <Box
          sx={{
            top: 8,
            right: 8,
            flexShrink: 0,
            position: 'absolute',
            ...(isDesktop && {
              position: 'unset',
            }),
          }}
        >
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>
      </Stack>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <CldUploadWidget
          options={{ ...options } as CldUploadWidgetPropsOptions}
          uploadPreset="oshhrjgn"
          onSuccess={(result, _) => handleAddVideo(result.info)}
        >
          {({ open }) => (
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                handleClosePopover();
                open();
              }}
            >
              <Iconify icon="mdi:youtube" />
              {!chapter.video ? 'Add a video' : 'Replace video'}
            </MenuItem>
          )}
        </CldUploadWidget>

        <MenuItem
          onClick={() => {
            handleClosePopover();
            setDisplayChapterContentText(false);
            setOpenContentTextDialog(true);
          }}
        >
          <Iconify icon="mdi:text-box-outline" />
          {!chapter.content ? 'Add an article' : 'Edit the article'}
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClosePopover();
            setOpenAddAttachmentDialog(true);
            // handleAddAttachment(index!);
          }}
        >
          <Iconify icon="mdi:file-document" />
          Add attachment
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleClosePopover();
            dispatch(
              apiDeleteChapter({ chapterId: chapter.id, sectionId: chapter.section as string })
            );
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete chapter
        </MenuItem>
      </MenuPopover>
    </>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function AddTextContentDialog({
  open,
  display,
  chapter,
  cancel,
  handleAddArticle,
  handleEditArticle,
}: {
  open: boolean;
  display?: boolean;
  chapter?: ChapterType;
  cancel: () => void;
  handleAddArticle: (content: string) => void;
  handleEditArticle: () => void;
}) {
  const isDesktop = useResponsive('up', 'sm');
  const fullWidth = isDesktop ? 900 : 400;

  const [content, setContent] = useState(chapter ? chapter.content : '');

  return (
    <BootstrapDialog onClose={cancel} aria-labelledby="customized-dialog-title" open={open}>
      <Paper
        sx={{
          width: `${fullWidth}px`,
          top: 90,
          right: `calc((100% - ${fullWidth}px)/2)`,
          margin: '0px auto',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            py: 2,
            pl: 2.5,
            pr: 1,
          }}
        >
          <IconButton onClick={cancel}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>
        <Divider />
        {display ? (
          <Stack alignItems="center" sx={{ py: 2, px: 3, overflow: 'scroll', maxHeight: '70vh' }}>
            <Markdown
              key={chapter?.name}
              children={chapter?.content as string}
              sx={{
                px: { md: 2 },
                py: { md: 2 },
              }}
            />
          </Stack>
        ) : (
          <Editor
            simple
            id="compose-mail"
            value={content as string}
            onChange={(c) => setContent(c)}
            placeholder="Type a message"
            sx={{ flexGrow: 1, borderColor: 'transparent' }}
          />
        )}
        <Divider />
        <Stack direction="row" alignItems="center" sx={{ py: 2, px: 3 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => (!display ? handleAddArticle(content as string) : handleEditArticle())}
          >
            {!display ? 'Save' : 'Edit'}
          </Button>
        </Stack>
      </Paper>
    </BootstrapDialog>
  );
}

function AddAttachmentDialog({
  open,
  cancel,
  submitData,
}: {
  open: boolean;
  cancel: () => void;
  submitData: (data: AttachmentProps) => void;
}) {
  const isDesktop = useResponsive('up', 'sm');
  const fullWidth = isDesktop ? 700 : 400;

  const nameLabel = 'name';

  return (
    <BootstrapDialog onClose={cancel} aria-labelledby="customized-dialog-title" open={open}>
      <Paper
        sx={{
          width: `${fullWidth}px`,
          top: 90,
          right: `calc((100% - ${fullWidth}px)/2)`,
          margin: '0px auto',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            py: 2,
            pl: 2.5,
            pr: 1,
          }}
        >
          <IconButton onClick={cancel}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>
        <AttachmentUploader
          {...{
            nameLabel,
            submitData,
          }}
        />
        <Divider />
      </Paper>
    </BootstrapDialog>
  );
}

function ChapterOnReadOnly({ chapter, courseId, isSelected, sx, ...other }: ChapterProps) {
  const dispatch = useDispatch();
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Stack
        onClick={() =>
          dispatch(setCurrentChapter({ chapterId: chapter.id, sectionId: chapter.section }))
        }
        direction="row"
        sx={{
          margin: '3px 1px',
          px: 1.5,
          borderRadius: 1,
          width: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          border: (theme) => `solid 1px ${isSelected ? 'green' : theme.palette.divider}`,
        }}
      >
        <Typography variant="subtitle2" sx={{ cursor: 'pointer', py: 1.5 }}>
          {chapter.name}
        </Typography>

        <Stack
          spacing={0.75}
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
        >
          {chapter.video && (
            <IconButton>
              <Iconify icon="mdi:youtube" />
            </IconButton>
          )}

          {chapter.content && (
            <IconButton>
              <Iconify icon="mdi:text-box-outline" />
            </IconButton>
          )}

          {chapter.attachments.length ? (
            <IconButton>
              <Iconify icon="mdi:file-document" />
            </IconButton>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
}
