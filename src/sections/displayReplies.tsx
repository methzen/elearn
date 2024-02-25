import { Button } from '@mui/material';

const DisplayReplies = ({
  functionality,
  expanded,
}: {
  functionality: () => void;
  expanded: boolean;
}) => {
  const text = expanded ? 'hide replies' : 'See replies';
  return (
    <Button
      startIcon={<img src={'/assets/icons/icon-reply.svg'} alt="reply icon" />}
      variant="text"
      size="small"
      sx={{
        alignSelf: 'flex-start',
        my: '-20px',
        color: 'custom.moderateBlue',
        fontWeight: 500,
      }}
      onClick={() => {
        functionality();
      }}
    >
      {text}
    </Button>
  );
};

export default DisplayReplies;
