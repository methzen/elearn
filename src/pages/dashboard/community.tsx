import { useState, useRef } from 'react';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Link,
  Grid,
  Card,
  Stack,
  Paper,
  Checkbox,
  InputBase,
  Typography,
  CardHeader,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Modal,
  Button
} from '@mui/material';
import {
    _userFeeds,
  } from '../../_mock/arrays';


// next
import Head from 'next/head';
import { Container } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

import {
  _userGroups
} from '../../_mock/arrays';
// @types
import { IUserProfilePost } from '../../@types/user';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// utils
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { CustomAvatar, CustomAvatarGroup } from '../../components/custom-avatar';

// ----------------------------------------------------------------------

interface Props {
  post: IUserProfilePost;
  onClick: () => void;
}

// ----------------------------------------------------------------------

Community.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Community() {
  const { themeStretch } = useSettingsContext();
  const [open, setOpen] = useState<boolean>(false);
  const [postToDisplay, setPostToDisplay] = useState<IUserProfilePost | null>(null)

  const DisplayPost=(id:any)=>{
    setOpen(true)
    const post = _userFeeds.find(post=> post.id === id)
    setPostToDisplay(post as IUserProfilePost)
  }

  const handleClose=()=>{
    setOpen(false)
  }

  return (
    <>
      <Head>
        <title> Circles | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={8}>
        <Box>
        <Stack spacing={3}>
          {_userFeeds.map((post) => (
            <Post key={post.id} post={post} onClick={()=>DisplayPost(post.id)}/>
          ))}
        </Stack>
      </Box>
        </Grid>
          <Grid item xs={12} md={3}>
            <Box>Some box here with data</Box>
          </Grid>
        </Grid>
      {
        open && <CustomizedDialogs open={open}
        post={postToDisplay}
        handleClose={handleClose}
        />
      }
      </Container>
    </>
  );
}

interface Post {
  post: IUserProfilePost;
}
function PostCard( { post }: Post) {
  const { user } = useAuthContext();

  const commentInputRef = useRef<HTMLInputElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLiked, setLiked] = useState(post.isLiked);

  const [likes, setLikes] = useState(post.personLikes.length);

  const [message, setMessage] = useState('');

  const hasComments = post.comments.length > 0;

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleClickAttach = () => {
    const { current } = fileInputRef;
    if (current) {
      current.click();
    }
  };

  const handleClickComment = () => {
    const { current } = commentInputRef;
    if (current) {
      current.focus();
    }
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />
        }
        title={
          <Link color="inherit" variant="subtitle2">
            {user?.displayName}
          </Link>
        }
        subheader={
          <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        }
      />

      <Typography
        sx={{
          p: (theme) => theme.spacing(3, 3, 2, 3),
        }}
      >
        {post.message}
      </Typography>

      <Box sx={{ p: 1 }}>
        <Image alt="post media" src={post.media} ratio="16/9" sx={{ borderRadius: 1 }} />
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          p: (theme) => theme.spacing(2, 3, 3, 3),
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              color="error"
              checked={isLiked}
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
              onChange={isLiked ? handleUnlike : handleLike}
            />
          }
          label={fShortenNumber(likes)}
        />

        <CustomAvatarGroup>
          {post.personLikes.map((person) => (
            <CustomAvatar key={person.name} alt={person.name} src={person.avatarUrl} />
          ))}
        </CustomAvatarGroup>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton onClick={handleClickComment}>
          <Iconify icon="eva:message-square-fill" />
        </IconButton>

        <IconButton>
          <Iconify icon="eva:share-fill" />
        </IconButton>
      </Stack>

      {hasComments && (
        <Stack spacing={1.5} sx={{ px: 3, pb: 2 }}>
          {post.comments.map((comment) => (
            <Stack key={comment.id} direction="row" spacing={2}>
              <CustomAvatar alt={comment.author.name} src={comment.author.avatarUrl} />

              <Paper
                sx={{
                  p: 1.5,
                  flexGrow: 1,
                  bgcolor: 'background.neutral',
                }}
              >
                <Stack
                  justifyContent="space-between"
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ sm: 'center' }}
                  sx={{ mb: 0.5 }}
                >
                  <Typography variant="subtitle2">{comment.author.name}</Typography>

                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    {fDate(comment.createdAt)}
                  </Typography>
                </Stack>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {comment.message}
                </Typography>
              </Paper>
            </Stack>
          ))}
        </Stack>
      )}

      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        sx={{
          p: (theme) => theme.spacing(0, 3, 3, 3),
        }}
      >
        <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />

        <InputBase
          fullWidth
          value={message}
          inputRef={commentInputRef}
          placeholder="Write a comment…"
          onChange={(event) => handleChangeMessage(event.target.value)}
          endAdornment={
            <InputAdornment position="end" sx={{ mr: 1 }}>
              <IconButton size="small" onClick={handleClickAttach}>
                <Iconify icon="ic:round-add-photo-alternate" />
              </IconButton>

              <IconButton size="small">
                <Iconify icon="eva:smiling-face-fill" />
              </IconButton>
            </InputAdornment>
          }
          sx={{
            pl: 1.5,
            height: 40,
            borderRadius: 1,
            border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
          }}
        />

        <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
      </Stack>
    </Card>
  );
}

const CardSx = {
  boxShadow: 5, 
  cursor:"pointer",
  "&:hover": {
    boxShadow: 10,
  },
};

function Post({ post, onClick }: Props) {
    const { user } = useAuthContext();  
    const [isLiked, setLiked] = useState(post.isLiked);
  
    const [likes, setLikes] = useState(post.personLikes.length);
  
    const handleLike = () => {
      setLiked(true);
      setLikes((prevLikes) => prevLikes + 1);
    };
  
    const handleUnlike = () => {
      setLiked(false);
      setLikes((prevLikes) => prevLikes - 1);
    };

    return (
      <Card sx={CardSx} onClick={onClick}>
        <CardHeader
          disableTypography
          avatar={
            <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />
          }
          title={
            <Link color="inherit" variant="subtitle2">
              {user?.displayName}
            </Link>
          }
          subheader={
            <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
              {fDate(post.createdAt)}
            </Typography>
          }
        />
  
        <Typography
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
          }}
        >
          {post.message}
        </Typography>
  
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            p: (theme) => theme.spacing(2, 3, 3, 3),
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                color="error"
                checked={isLiked}
                icon={<Iconify icon="eva:heart-fill" />}
                checkedIcon={<Iconify icon="eva:heart-fill" />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
          />
  
          <CustomAvatarGroup>
            {post.personLikes.map((person) => (
              <CustomAvatar key={person.name} alt={person.name} src={person.avatarUrl} />
            ))}
          </CustomAvatarGroup>
        </Stack>
      </Card>
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

  interface DialogCommands {
    post: IUserProfilePost | null;
    open: boolean;
    handleClose: ()=> void;
  }

function CustomizedDialogs({post, open, handleClose}: DialogCommands) {  
    return (
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
          <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <PostCard post={post as IUserProfilePost}/>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
  }