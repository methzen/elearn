import { useState, useMemo } from 'react';
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
  DialogContent,
  DialogActions,
} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// import useCopyToClipboard from '../../hooks/useCopyToClipboard';
// components
import Iconify from '../components/iconify';
import MenuPopover from '../components/menu-popover';
//
import { CldUploadWidget, CldVideoPlayer ,CldUploadWidgetPropsOptions } from 'next-cloudinary';
// import { FileShareDialog, FileDetailsDrawer } from '../../file';

import { Video as VideoProps, Attachment, Chapter as ChapterType, Section , Course } from '../@types/course';
// ----------------------------------------------------------------------

const options = {
    sources: [
        "local"
    ],
    showAdvancedOptions: false,
    cropping: false,
    multiple: false,
    defaultSource: "local",
    styles: {
        palette: {
            window: "#F5F5F5",
            sourceBg: "#FFFFFF",
            windowBorder: "#90a0b3",
            tabIcon: "#0094c7",
            inactiveTabIcon: "#69778A",
            menuIcons: "#0094C7",
            link: "#53ad9d",
            action: "#8F5DA5",
            inProgress: "#0194c7",
            complete: "#53ad9d",
            error: "#c43737",
            textDark: "#000000",
            textLight: "#FFFFFF"
        },
        fonts: {
            default: null,
            "'Poppins', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Poppins",
                active: true
            }
        }
    }
}

interface ChapterProps extends PaperProps {
    index?: number;
    chapter: ChapterType;
    handleAddAttachment: (index:number)=>void;
    handleAddArticle: (index:number)=>void;
    handleAddVideo: (index:number, info:any)=>void;
    onDelete: (index:number)=>void;
  };

interface CloudinaryResult {
    public_id:string
  }
export default function Chapter({
    index,
    chapter,
    handleAddAttachment,
    handleAddArticle,
    handleAddVideo,
    onDelete, sx, ...other }: ChapterProps) {

  const isDesktop = useResponsive('up', 'sm');

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [thisChapter, setThisChapter] = useState(chapter)
  const [chapIndex, setChapIndex] = useState< number|undefined >(index)
  const [openViewer, setOpenViewer] = useState(false)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleViewVideo = () => {
    setOpenViewer(true)
  }

  const handleViewArticle = () => {
    console.log('user want to display article')
  }
  
  const handleViewAttachment = () => {
    console.log('user want to display attachment')
  }

  return (
    <>
    {openViewer && <VideoViewer open={openViewer} public_id={thisChapter.videoContent?.url as string} close={()=>setOpenViewer(false)} />}
      <Stack
        spacing={isDesktop ? 1.5 : 2}
        direction={isDesktop ? 'row' : 'column'}
        alignItems={isDesktop ? 'center' : 'flex-start'}
        sx={{
          p: 2.5,
          borderRadius: 2,
          margin:"5px 30px",
          maxWidth: 900,
          position: 'relative',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          },
          ...(isDesktop && {
            p: 1.5,
            borderRadius: 1.5,
          }),
          ...sx,
        }}
        {...other}
      >

        <Stack
          direction="row"
          sx={{
            width: 1,
            justifyContent:"space-between",
            alignItems:"center"
          }}
        >
          <Typography variant="subtitle2">
            {chapter.name}
          </Typography>

          <Stack
            spacing={0.75}
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', color: 'text.disabled', mt: 0.5 }}
          >
            <IconButton onClick={handleViewVideo} >
                <Iconify icon="mdi:youtube" />
            </IconButton>
            <IconButton onClick={handleViewArticle} >
                <Iconify icon="mdi:text-box-outline" />
            </IconButton>
            <IconButton onClick={handleViewAttachment}>
                <Iconify icon="mdi:file-document" />
            </IconButton>

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
            options={{...options} as CldUploadWidgetPropsOptions}
            uploadPreset="oshhrjgn"
            onSuccess={
                (result, _) => handleAddVideo(chapIndex!, result.info)
            }>
            {({ open }) => {
              return (
                <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  handleClosePopover();
                  open();
                }}
              >
                <Iconify icon="mdi:youtube" />
                Add a video
              </MenuItem>
              );
            }}
        </CldUploadWidget>

        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleAddArticle(index!);
          }}
        >
          <Iconify icon="mdi:text-box-outline" />
          Add an article
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleAddAttachment(index!);
          }}
        >
          <Iconify icon="mdi:file-document" />
          Add attachment
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleClosePopover();
            onDelete(index!);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      {/* <FileDetailsDrawer
        item={file}
        favorited={favorited}
        onFavorite={handleFavorite}
        onCopyLink={handleCopy}
        open={openDetails}
        onClose={handleCloseDetails}
        onDelete={() => {
          handleCloseDetails();
          onDelete();
        }}
      /> */}

      {/* <FileShareDialog
        open={openShare}
        shared={file.shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onCopyLink={handleCopy}
        onClose={() => {
          handleCloseShare();
          setInviteEmail('');
        }}
      /> */}
    </>
  );
}


export function VideoViewer({ open, public_id, close } : { open: boolean, public_id: string, close: () => void;}) {
  return (
    <>
    <Dialog fullWidth maxWidth="sm" open={open} onClose={close}  sx={{mt : -70}}>
      <DialogContent dividers sx={{ pt: 5, pb: 0, border: 'none' }}>
        <CldVideoPlayer
            width="1920"
            height="1080"
            src={public_id}
            logo={false}
        />
      </DialogContent>
      <DialogActions>
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={close}>
              Close
            </Button>
          </Stack>
      </DialogActions>
    </Dialog>
    </>
  )
}