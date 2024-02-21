import { Button } from "@mui/material";

const ReplyButton = ({ functionality } : {functionality : ()=>void;}) => {
  return (
    <Button
      startIcon={<img src={'/assets/icons/icon-reply.svg'} alt="reply icon" />}
      sx={{
        color: "custom.moderateBlue",
        fontWeight: 500,
        textTransform: "capitalize",
      }}
      onClick={() => {
        functionality();
      }}
    >
      Reply
    </Button>
  );
};

export default ReplyButton;
