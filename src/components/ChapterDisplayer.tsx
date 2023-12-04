import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Chapter, Videodata } from '../@types/course';
import Markdown from '../components/markdown/Markdown';
import { AttachmentDisplayer } from './AttachmentDisplayer';
import { Suspense } from 'react'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ChapterDisplayProps {
  chapter: Chapter
}

export default function ChapterDisplayer({chapter}: ChapterDisplayProps) {
  const [expanded, setExpanded] = React.useState(false);
  const data : Videodata | undefined = chapter?.video?.data

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card >
      {!!data &&
          <CardMedia
            component="video"
            width="100%"
            src={data.url}
            image={data.url}
            autoPlay
            controls
          />
      }
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {chapter?.description}
        </Typography>
      </CardContent>
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
            {chapter?.attachments.map(
              (Attachment) => <AttachmentDisplayer key={Attachment.id} file={Attachment} />
            )}
          {chapter?.content 
            &&
            <Markdown
              key={chapter.id}
              children={chapter.content}
          />
          }
          </CardContent>
      </Collapse>
    </Card>
  );
}
