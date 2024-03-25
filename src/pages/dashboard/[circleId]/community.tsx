import { useState, useRef, createContext, useContext } from 'react';

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
  CardActions,
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
import { IUserComment, IUserProfilePost } from '../../../@types/user';
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
import commentAPost, { commentDataArg } from '../../../api/commentAPost';
import CourseCardAside from '../../../components/CourseCardAside';
import ReplyButton from 'src/sections/ReplayButton';
import ExpandCommentButton from 'src/sections/seeComments';
import DisplayReplies from 'src/sections/displayReplies';
import LoadingScreen from 'src/components/loading-screen';

// ----------------------------------------------------------------------

Community.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

const getAllPosts = (url: string) => getAllPostsByPage(url);

const CommentContext = createContext<(data: commentDataArg) => void>(() => null);

export default function Community() {
  const {
    query: { circleId },
  } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettingsContext();

  const [page, setPage] = useState<number>(1);
  const { data, isLoading, mutate } = useSWR(
    `/posts/get-all-posts?page=${page}&urlName=${circleId}`,
    getAllPosts
  );

  const sendPost = async (content: PostContent) => {
    if (!content.message) {
      return;
    }
    try {
      const response = await submitNewPost(content, circleId as string);
      enqueueSnackbar(response.data);
      mutate();
    } catch (ResponseError) {
      console.error(ResponseError);
      enqueueSnackbar(ResponseError.message, { variant: 'error' });
    }
  };

  const sendComment = async (data: commentDataArg) => {
    if (!data.parentId || !data.text) {
      return;
    }
    try {
      const response = await commentAPost(data);
      enqueueSnackbar(response.data);
      mutate();
    } catch (e) {
      console.error(e);
      enqueueSnackbar(e.message);
    }
  };

  if (!circleId || isLoading) return <LoadingScreen />;
  const posts: IUserProfilePost[] = data?.posts;

  return (
    <>
      <Head>
        <title> Community | Inner Circle</title>
      </Head>

      <CommentContext.Provider value={sendComment}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} md={8}>
              <WritePost sendPost={sendPost} />
              {posts && (
                <Stack spacing={3}>
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} mutate={mutate} />
                  ))}
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              <CourseCardAside {...data.group} />
            </Grid>
          </Grid>
        </Container>
      </CommentContext.Provider>
    </>
  );
}

interface PostContent {
  title: string;
  message: string;
  attachment: string;
}

interface WriteAPostProps {
  sendPost: (message: any) => void;
}

export function WritePost({ sendPost }: WriteAPostProps) {
  const { user } = useAuthContext();
  const [content, setContent] = useState<PostContent>({ title: '', message: '', attachment: '' });

  const [expanded, setExpanded] = useState(false);
  const [showHead, setShowHead] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setShowHead(false);
  };

  const collapse = () => {
    setExpanded(!expanded);
    setShowHead(true);
    setContent({ title: '', message: '', attachment: '' });
  };

  const handleChangeMessage = (message: string) => {
    setContent((v) => ({ ...v, message }));
  };

  const handleChangeTitle = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setContent((value) => ({ ...value, title: target.value }));
  };

  return (
    <Card sx={{ mb: 3, boxShadow: 4 }}>
      {showHead && (
        <CardHeader
          sx={{ mb: 3 }}
          onClick={handleExpandClick}
          avatar={
            <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />
          }
          title={
            <Box
              sx={{
                pl: 1.5,
                height: 50,
                width: '100%',
                borderRadius: 1,
                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
                color: 'gray',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <b>Write something...</b>
            </Box>
          }
        />
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
            }}
          >
            <InputBase
              placeholder="Title"
              sx={{ px: 2, height: 40, fontWeight: 'bold' }}
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
        <CardActions>
          <Stack direction="row" alignItems="flex-end" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={() => {
                sendPost(content);
                collapse();
              }}
            >
              Post
            </Button>
            <Button size="small" onClick={collapse}>
              Cancel
            </Button>
          </Stack>
        </CardActions>
      </Collapse>
    </Card>
  );
}
interface Post {
  post: IUserProfilePost;
  mutate: () => void;
}

interface By {
  _id: string;
  photoURL: string;
  firstname: string;
  lastname: string;
}

function PostCard({ post, mutate }: Post) {
  const {
    query: { circleId },
  } = useRouter();
  const { user } = useAuthContext();

  const userHasLikedTheirPost = post?.personLikes?.filter((like) => like._id === user?._id);
  const [isLiked, setLiked] = useState(userHasLikedTheirPost?.length >= 1);
  const [likes, setLikes] = useState(post?.personLikes?.length);
  const [onComment, setOnComment] = useState(true);
  const [onReply, setOnReply] = useState(!onComment);
  const [expanded, setExpanded] = useState(false);

  let personWhoContributed: By[] = post.personLikes;

  let commentCount = post.commentCount;

  post.comments.forEach((comments) => {
    commentCount += comments?.comments ? comments?.comments?.length : 0;
  });

  post.comments.forEach((comments) => {
    if (!personWhoContributed.find((element: By) => element._id === comments.by._id)) {
      personWhoContributed.push(comments.by);
    }
    let secondOrderComments = comments.comments;
    if (secondOrderComments && secondOrderComments.length > 0) {
      secondOrderComments.forEach((nex_comments) => {
        if (!personWhoContributed.find((element: By) => element._id === nex_comments.by._id)) {
          personWhoContributed.push(nex_comments.by);
        }
      });
    }
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const hasComments = commentCount > 0;

  const handleLike = async () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
    await likeAPost({ postId: post._id, urlName: circleId as string });
    mutate();
  };

  const handleUnlike = async () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
    await unlikeAPost({ postId: post._id, urlName: circleId as string });
    mutate();
  };

  const handleOnReply = () => {
    setOnReply(!onReply);
  };

  const handleOnComment = () => {
    setOnComment(!onComment);
  };
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <CustomAvatar
            src={post.by?.photoURL}
            alt={`${post.by?.firstname} ${post.by?.lastname}`}
            name={`${post.by?.firstname} ${post.by?.lastname}`}
          />
        }
        title={
          <Link color="inherit" variant="subtitle2">
            {`${post.by?.firstname} ${post.by?.lastname}`}
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
      <CardContent>
        <Typography
          sx={{
            fontWeight: 'bold',
            mb: 1,
          }}
        >
          {post.title}
        </Typography>
        <Markdown key={post._id} children={post.content} />
      </CardContent>
      <CardActions disableSpacing>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            p: (theme) => theme.spacing(2, 3, 3, 3),
          }}
        >
          <FormControlLabel
            id="like"
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
          {hasComments && (
            <FormControlLabel
              id="comment"
              control={
                <Checkbox
                  color="success"
                  checked={true}
                  icon={<Iconify icon="eva:message-square-fill" />}
                  checkedIcon={<Iconify icon="eva:message-square-fill" />}
                  onClick={handleOnComment}
                />
              }
              label={fShortenNumber(commentCount)}
            />
          )}
          <CustomAvatarGroup>
            {personWhoContributed?.map((person) => (
              <CustomAvatar
                key={person._id}
                alt={person.firstname}
                src={person.photoURL}
                name={`${person.firstname} ${person.lastname}`}
              />
            ))}
          </CustomAvatarGroup>

          <Box sx={{ flexGrow: 1 }} />
        </Stack>
        {hasComments && (
          <ExpandCommentButton functionality={handleExpandClick} expanded={expanded} />
        )}
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {hasComments && (
          <Stack spacing={1.5} sx={{ px: 3, pb: 2 }}>
            {post.comments.map((comment) => (
              <CommentComponent
                key={comment._id}
                user={user}
                comment={comment}
                isTopLevel={true}
                onToggle={() => console.log('toggle')}
                handleOnReply={handleOnReply}
                onReply={onReply}
              />
            ))}
          </Stack>
        )}
      </Collapse>

      {onComment && (
        <WriteCommentComponent
          user={user}
          parentId={post._id}
          type="comment"
          functionality={() => null}
        />
      )}
    </Card>
  );
}

function CommentComponent({
  comment,
  user,
  isTopLevel,
  onToggle,
  defaultParentId,
  onReply,
  handleOnReply,
}: {
  comment: IUserComment;
  user: any;
  isTopLevel: boolean;
  onToggle: (id: string) => void;
  defaultParentId?: string;
  onReply?: boolean;
  handleOnReply?: () => void;
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [commentReply, setCommentReply] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    onToggle(comment._id);
  };

  return (
    <>
      <Stack direction="column">
        <Paper
          sx={{
            ml: isTopLevel ? '0' : '20px',
            my: 1.5,
            p: 1.5,
            flexGrow: 1,
            bgcolor: 'background.neutral',
          }}
        >
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={2} direction="row" alignItems="center">
              <CustomAvatar
                sx={{ width: '30px', height: '30px' }}
                alt={comment.by.firstname}
                src={comment.by.photoURL}
                name={`${comment.by.firstname} ${comment.by.lastname}`}
              />
              <Typography variant="subtitle2">{`${comment.by.firstname} ${comment.by.lastname}`}</Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {fDate(comment.createdAt)}
              </Typography>
            </Stack>
            {user?._id === comment.by._id ? null : (
              <ReplyButton
                functionality={() => {
                  setCommentReply(true);
                  handleOnReply && handleOnReply();
                }}
              />
            )}
          </Stack>
          <Markdown
            children={comment.text}
            sx={{
              p: 1.5,
              color: 'text.secondary',
            }}
          />
        </Paper>
        {comment.comments && comment.comments.length > 0 && (
          <DisplayReplies functionality={toggleReplies} expanded={showReplies} />
        )}
      </Stack>
      {comment.comments && comment.comments.length > 0 && (
        <div>
          {showReplies &&
            comment.comments.map((reply: IUserComment) => (
              <CommentComponent
                user={user}
                key={reply._id}
                comment={reply}
                isTopLevel={false}
                onToggle={onToggle}
                defaultParentId={comment._id}
              />
            ))}
        </div>
      )}
      {commentReply && (
        <WriteCommentComponent
          user={user}
          parentId={defaultParentId ? defaultParentId : comment._id}
          type="reply"
          functionality={() => setCommentReply(false)}
        />
      )}
    </>
  );
}

function WriteCommentComponent({
  user,
  parentId,
  type,
  functionality,
}: {
  user: any;
  parentId: string;
  type: 'comment' | 'reply';
  functionality: () => void;
}) {
  const {
    query: { circleId },
  } = useRouter();

  const sendComment = useContext(CommentContext);
  const [message, setMessage] = useState('');
  const [minRows, setMinRows] = useState(1);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleClickComment = () => {
    setMinRows(4);
    const { current } = commentInputRef;
    if (current) {
      current.focus();
    }
  };

  const send = () => {
    sendComment({
      parentId,
      type,
      text: message,
      urlName: circleId as string,
    });
    setMessage('');
    setMinRows(1);
    functionality();
  };
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{
        p: (theme) => theme.spacing(0, 3, 3, 3),
        ml: type === 'comment' ? '-20px' : 0,
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
        onChange={(event) => setMessage(event.target.value)}
        onClick={handleClickComment}
        endAdornment={<InputAdornment position="end" sx={{ mr: 0 }}></InputAdornment>}
        sx={{
          pl: 1.5,
          minHeight: 40,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        }}
      />
      <Button variant="contained" sx={{ mr: 0 }} onClick={send}>
        {type === 'comment' ? 'comment' : 'Reply'}
      </Button>
    </Stack>
  );
}
