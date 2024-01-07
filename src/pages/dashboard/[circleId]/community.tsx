import { useState, useRef } from 'react';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
// @mui
import { alpha } from '@mui/material/styles';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Editor from '../../../components/editor';
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
  Divider,
  Button
} from '@mui/material';
import {
    _userFeeds,
  } from '../../../_mock/arrays';


// next
import Head from 'next/head';
import useSWR from 'swr';
// next
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';
import { useSnackbar } from '../../../components/snackbar';

import {
  _userGroups
} from '../../../_mock/arrays';
// @types
import { IUserProfilePost } from '../../../@types/user';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import submitNewPost from '../../../api/submitNewPost';
import { CustomAvatar, CustomAvatarGroup } from '../../../components/custom-avatar';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Markdown from '../../../components/markdown/Markdown';
import getAllPostsByPage from '../../../api/getAllPostsByPage';
import likeAPost from '../../../api/likeAPost';
import unlikeAPost from '../../../api/unlikeAPost';
import commentAPost from '../../../api/commentAPost';
import CourseCardAside from '../../../components/CourseCardAside';
import CircleAccessGuard from 'src/auth/CircleAccessGuard';
// ----------------------------------------------------------------------


interface Props {
  post: IUserProfilePost;
  onClick: () => void;
}

interface commentDataType {
  parentItemId: string;
  isParent?: boolean;
  parentCommentId?: string;
  text: string;
}
// ----------------------------------------------------------------------

Community.getLayout = (page: React.ReactElement) => <DashboardLayout><CircleAccessGuard>{page}</CircleAccessGuard></DashboardLayout>;
const getAllPosts = (url: string) => getAllPostsByPage(url);


export default function Community() {
  const { push, query:{ circleId}} = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettingsContext();
  const [open, setOpen] = useState<boolean>(false);
  const [writeSomething, SetWriteSomething] = useState<boolean>(false);
  const [writeAComment, SetWriteAComment] = useState({status: false, postId: ""});

  const [page, setPage] = useState<number>(1)
  const { data , error, mutate } = useSWR(`/posts/get-all-posts?page=${page}&groupId=${circleId}`, getAllPosts)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  const posts : IUserProfilePost[] = data.posts;

  const HandleCreatePost = (e:any)=> {
    e.preventDefault()
    SetWriteSomething(true)
  }

  const cancelPost = () =>{
    SetWriteSomething(false)
  }

  const sendPost = async (content: any) => {
    try {
      const response = await submitNewPost(content);
      SetWriteSomething(false)
      enqueueSnackbar(response.data);
      push(PATH_DASHBOARD.group.community(circleId as String));
    } catch (error) {
      console.error(error);
    }
  };

  const sendComment = async (comment: any, id:any) =>{
    const data = {
      parentItemId: id,
      text: comment
    }
    try{
      SetWriteAComment(v => ({...v, status: false}))
      const response = await commentAPost(data)
      enqueueSnackbar(response.data);
      push(PATH_DASHBOARD.group.community(circleId as String));
    }catch(e){
      console.error(e);
    }
  }
  return (
    <>
      <Head>
        <title> Circles | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
       
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={8}>
        <Box sx={{ boxShadow:5, borderRadius:1, margin: "5px 0px 50px", cursor:"pointer", paddingTop:"20px"}} onClick={HandleCreatePost}>
        <WriteSomething />
        </Box>
        <Box>
        <Stack spacing={3}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post}
            sendComment={(comment)=>sendComment(comment, post.id)}
            mutate={mutate}
            />
          ))}
        </Stack>
      </Box>
        </Grid>

          <Grid item xs={12} md={3}>
            <CourseCardAside {...data.group}/>
          </Grid>
        </Grid>
      {
        writeSomething &&
        <CreateAPostDialog open={writeSomething} cancelPost={cancelPost} sendPost={sendPost}/>
      }
      </Container>
    </>
  );
}

function WriteSomething(){
  const { user } = useAuthContext();
  return (<Stack
        spacing={2}
        direction="row"
        alignItems="center"
        sx={{
          p: (theme) => theme.spacing(0, 3, 3, 3),
          cursor:"pointer",
        }}
      >
        <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />
        <Box
          sx={{
            pl: 1.5,
            height: 40,
            width: "100%",
            borderRadius: 1,
            border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
            cursor:"pointer",
            color: "gray",
            display:"flex",
            alignItems: "center"
          }}
        >
          <b>Write something...</b>
        </Box>
      </Stack>)
}
interface Post {
  post: IUserProfilePost;
  sendComment: (comment: string) => void;
  mutate: () => void;
}

function PostCard( { post, sendComment, mutate }: Post) {
  const { user } = useAuthContext();

  const commentInputRef = useRef<HTMLInputElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const userHasLikedTheirPost = post?.personLikes?.filter(like => like.id === user?.id)

  const [isLiked, setLiked] = useState(userHasLikedTheirPost?.length >=1 ? true: false);

  const [likes, setLikes] = useState(post?.personLikes?.length);

  const [message, setMessage] = useState('');
  const [minRows, setMinRows] = useState(1)

  const hasComments = post?.comments?.length > 0;

  const handleLike = async () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
    await likeAPost({postId: post.id})
    mutate()
  };

  const handleUnlike = async () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
    await unlikeAPost({postId: post.id})
    mutate()
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
            {fDate(post?.createdAt)}
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
          fontWeight:"bold",
          px: { md: 2 },
          py: { md: 2 },
        }}
      >
        {post.title}
      </Typography>

      <Markdown
            key={post.id}
            children={post.content}
            sx={{
              px: { md: 2 },
              py: { md: 2 },
            }} />
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
          {post?.personLikes?.map((person) => (
            <CustomAvatar key={person.name} alt={person.name} src={person.avatarUrl} />
          ))}
        </CustomAvatarGroup>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton onClick={handleClickComment}>
          <Iconify icon="eva:message-square-fill" />
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
                <Markdown
                  key={post.id}
                  children={comment.message}
                  sx={{
                    color: 'text.secondary'
                  }} />

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
          multiline
          minRows={minRows}
          inputRef={commentInputRef}
          placeholder="Write a comment…"
          onChange={(event) => handleChangeMessage(event.target.value)}
          onClick={()=>setMinRows(4)}
          endAdornment={
            <InputAdornment position="end" sx={{ mr: 0 }}>
              {/* <IconButton size="small" onClick={handleClickAttach}>
                <Iconify icon="ic:round-add-photo-alternate" />
              </IconButton> */}

              {/* <IconButton size="small">
                <Iconify icon="eva:smiling-face-fill" />
              </IconButton> */}
            </InputAdornment>
          }
          sx={{
            pl: 1.5,
            minHeight: 40,
            borderRadius: 1,
            border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
          }}
        />
              <Button variant="contained" sx={{ mr: 0 }} onClick={() => sendComment(message)}>
              Post
            </Button>
        {/* <input type="file" ref={fileInputRef} style={{ display: 'none' }} /> */}
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
  
    const [likes, setLikes] = useState(post?.personLikes?.length);
  
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
            fontWeight: "bold",
            px: { md: 2 },
            py: { md: 2 },
          }}
        >
          {post?.title}
        </Typography>

        <Markdown
            key={post.id}
            children={post.content}
            sx={{
              px: { md: 2 },
              py: { md: 2 },
            }} />
  
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
            {post?.personLikes?.map((person) => (
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


  interface PostSomeThingDialogProps {
    open: boolean;
    cancelPost: ()=> void;
    sendPost: (message :any)=> void;
  }

  interface PostContent {
    title : string;
    message : string;
    attachment : string;
  }

  function CreateAPostDialog({open, cancelPost, sendPost}: PostSomeThingDialogProps) {
    const { user } = useAuthContext();

    const isDesktop = useResponsive('up', 'sm');

    const [content, setContent] = useState<PostContent>({title:'', message: '', attachment:''})
    const [fullScreen, setFullScreen] = useState(false);
  
    const handleChangeMessage = (message: string) => {
      setContent( value=> ({...value, message: message}));
    };

    const handleChangeTitle = (event: React.ChangeEvent) => {
      const target = event.target as HTMLInputElement;
      setContent( value => ({...value, title: target.value}));
    };
  
    const fullWidth = isDesktop ?
                        (fullScreen ? 90 : 40) : 90

    return (
        <BootstrapDialog
          onClose={cancelPost}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
        <Paper
          sx={{
            width:`calc(${fullWidth}%)`,
            top: 90,
            right: `calc((100% - ${fullWidth}%)/2)`,
            margin: "0px auto",
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
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              What's on your mind {user?.displayName} ?
            </Typography>

            <IconButton onClick={() => setFullScreen(!fullScreen)}>
              <Iconify icon={fullScreen ? 'eva:collapse-fill' : 'eva:expand-fill'} />
            </IconButton>
  
            <IconButton onClick={cancelPost}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Stack>
  
          <Divider />
  
          <InputBase placeholder="Title" 
            sx={{ px: 2, height: 40 }} 
            value={content.title}
            onChange={handleChangeTitle}
            />
  
          <Divider />
  
          <Editor
            simple
            id="compose-mail"
            value={content.message}
            onChange={handleChangeMessage}
            placeholder="Type a message"
            sx={{ flexGrow: 1, borderColor: 'transparent' }}
          />
  
          <Divider />
  
          <Stack direction="row" alignItems="center" sx={{ py: 2, px: 3 }}>
            <Button variant="contained" sx={{ mr: 2 }} onClick={() => sendPost(content)}>
              Post
            </Button>
            <IconButton>
              <Iconify icon="ic:round-add-photo-alternate" />
            </IconButton>
  
            <IconButton>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
          </Stack>
        </Paper>
        </BootstrapDialog>
    );
  }
