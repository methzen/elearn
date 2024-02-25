import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ExpandCommentButton = ({
  functionality,
  expanded,
}: {
  functionality: () => void;
  expanded: boolean;
}) => {
  const text = expanded ? 'Hide comments' : 'See comments';
  return (
    <Button
      startIcon={expanded ? <VisibilityOffIcon /> : <VisibilityIcon />}
      sx={{
        fontWeight: 500,
        textTransform: 'capitalize',
        marginLeft: 'auto',
      }}
      onClick={() => {
        functionality();
      }}
    >
      {text}
    </Button>
  );
};

export default ExpandCommentButton;
