import { useState, useRef } from 'react';

import { alpha } from '@mui/material/styles';
// @mui
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
  Button,
  Container,
  Collapse,
  CardContent,
  CardActions
} from '@mui/material';

// next
import Head from 'next/head';
import useSWR from 'swr';
// next
import { useRouter } from 'next/router';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';
import { useSnackbar } from '../../../components/snackbar';
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
import Markdown from '../../../components/markdown/Markdown';
import getAllPostsByPage from '../../../api/getAllPostsByPage';
import likeAPost from '../../../api/likeAPost';
import unlikeAPost from '../../../api/unlikeAPost';
import commentAPost from '../../../api/commentAPost';
import CourseCardAside from '../../../components/CourseCardAside';
import CircleAccessGuard from 'src/auth/CircleAccessGuard';
import EditButton from 'src/sections/EditButton';
import ReplyButton from 'src/sections/ReplayButton';
// ----------------------------------------------------------------------

Community.getLayout = (page: React.ReactElement) => <CircleAccessGuard><DashboardLayout>{page}</DashboardLayout></CircleAccessGuard>;
const getAllPosts = (url: string) => getAllPostsByPage(url);


export default function Community() {
  const { query:{ circleId}} = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettingsContext();
  const [writeAComment, SetWriteAComment] = useState({status: false, postId: ""});

  const [page, setPage] = useState<number>(1)
  const { data , error, mutate } = useSWR(`/posts/get-all-posts?page=${page}&groupId=${circleId}`, getAllPosts)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  const posts : IUserProfilePost[] = data.posts;

  const sendPost = async (content: PostContent) => {
    if(!content.title || !content.message){
      return
    }
    try {
      const response = await submitNewPost(content, circleId as string);
      enqueueSnackbar(response.data);
      mutate()
    } catch (ResponseError) {
      console.error(ResponseError);
      enqueueSnackbar(ResponseError.message);
    }
  };

  const sendComment = async (comment: any, id:any) =>{
    const d = {
      parentItemId: id,
      text: comment
    }
    try{
      SetWriteAComment(v => ({...v, status: false}))
      const response = await commentAPost(d)
      enqueueSnackbar(response.data);
      mutate()
    }catch(e){
      console.error(e);
      enqueueSnackbar(e.message);
    }
  }
  return (
    <>
      <Head>
        <title> Community | Inner Circle</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={8}>
        <WritePost sendPost={sendPost}/>
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
      </Container>
    </>
  );
}

interface PostContent {
  title : string;
  message : string;
  attachment : string;
}

interface WriteAPostProps {
  sendPost: (message :any)=> void;
}

export function WritePost({sendPost}:WriteAPostProps) {
  const { user } = useAuthContext();
  const [content, setContent] = useState<PostContent>({title:'', message: '', attachment:''})

  const [expanded, setExpanded] = useState(false);
  const [showHead, setShowHead] = useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setShowHead(false)
  };

  const collapse = () => {
    setExpanded(!expanded);
    setShowHead(true)
    setContent({title:'', message: '', attachment:''})
  };

  const handleChangeMessage = (message: string) => {
    setContent( v=> ({...v, message}));
  };

  const handleChangeTitle = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setContent( value => ({...value, title: target.value}));
  };

  return (
    <Card sx={{ mb: 3, boxShadow:4}}>
      {showHead &&
      <CardHeader sx={{mb:3}}
        onClick={handleExpandClick}
        avatar={<CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />}
        title={<Box
          sx={{
            pl: 1.5,
            height: 50,
            width: "100%",
            borderRadius: 1,
            border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
            color: "gray",
            display:"flex",
            alignItems: "center"
          }}
        >
          <b>Write something...</b>
        </Box>}
      />}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`
          }}
        >
          <InputBase placeholder="Title" 
            sx={{ px: 2, height: 40, fontWeight: "bold"}} 
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
        </Paper>
        </CardContent>
        <CardActions >
        <Stack direction="row" alignItems="flex-end" justifyContent="flex-end">
          <Button variant="contained" sx={{ mr: 2 }} onClick={() =>{
            sendPost(content)
            collapse()
            }}>
                Post
          </Button>
          <Button size="small" onClick={collapse}>Cancel</Button>
        </Stack>
      </CardActions>
      </Collapse>
    </Card>
  );
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

  const [isLiked, setLiked] = useState(userHasLikedTheirPost?.length >=1);

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

  const handleCommentSend = () => {
    sendComment(message)
    setMessage('')
    setMinRows(1)
  }

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <CustomAvatar src={post.by?.avatarUrl} alt={post.by?.name} name={post.by?.name} />
        }
        title={
          <Link color="inherit" variant="subtitle2">
            {post.by?.name}
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
            <CustomAvatar key={person.name} alt={person.name} src={person.avatarUrl} name={person.name}/>
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
                <Paper
                  sx={{
                    p: 1.5,
                    flexGrow: 1,
                    bgcolor: 'background.neutral',
                  }}
                >
                  {/* <Stack key={comment.id} direction="row" spacing={2}>
                  <Stack
                    justifyContent="space-between"
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ sm: 'center' }}
                    sx={{ mb: 0.5 }}
                  >
                    <CustomAvatar alt={comment.author.name} src={comment.author.avatarUrl} name={comment.author.name} />
                    <Typography variant="subtitle2">{comment.author.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDate(comment.createdAt)}
                    </Typography>
                </Stack>
                {user?.id === comment.author.id ? (
                  <Stack direction="row" spacing={1}>
                    <EditButton
                      functionality={() => console.log('edit')}
                      editingComm={false}
                    />
                  </Stack>
                ) : (
                  <ReplyButton functionality={() => console.log('reply')} />
                )}
                  </Stack> */}

                  <Stack
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack spacing={2} direction="row" alignItems="center">
                
                <CustomAvatar sx={{width: "30px", height: "30px"}} alt={comment.author.name} src={comment.author.avatarUrl} name={comment.author.name} />
                               
                <Typography variant="subtitle2">{comment.author.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDate(comment.createdAt)}
                    </Typography>
                </Stack>
                {user?.id === comment.author.id ? (
                  <Stack direction="row" spacing={1}>
                    <EditButton
                      functionality={() => console.log('edit')}
                      editingComm={false}
                    />
                  </Stack>
                ) : (
                  <ReplyButton functionality={() => console.log('reply')} />
                )}
              </Stack>

                  <Markdown
                    key={post.id}
                    children={comment.message}
                    sx={{
                      p: 1.5,
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
              <Button variant="contained" sx={{ mr: 0 }} onClick={handleCommentSend}>
              Comment
            </Button>
        {/* <input type="file" ref={fileInputRef} style={{ display: 'none' }} /> */}
      </Stack>
      
    </Card>
  );
}

