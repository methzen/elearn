import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import { Avatar, Typography, Stack } from '@mui/material';
// @types
import { IChatConversation, IChatMessage } from '../../../@types/chat';
// components
import Image from '../../../components/image';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

type Props = {
  message: IChatMessage;
  conversation: IChatConversation;
  onOpenLightbox: (value: string) => void;
};

export default function ChatMessageItem({ message, conversation, onOpenLightbox }: Props) {
  const sender = conversation.participants.find(
    (participant) => participant._id === message.senderId
  );
  const { user } = useAuthContext();
  const senderDetails =
    message.senderId === user?.id
      ? {
          type: 'me',
        }
      : {
          avatar: sender?.photoURL,
          name: `${sender?.firstname} ${sender?.lastname}`,
        };

  const currentUser = senderDetails.type === 'me';

  const isImage = message.contentType === 'image';

  const firstName = senderDetails.name && senderDetails.name.split(' ')[0];

  return (
    <Stack direction="row" justifyContent={currentUser ? 'flex-end' : 'unset'} sx={{ mb: 3 }}>
      {!currentUser && (
        <Avatar
          alt={senderDetails.name}
          src={senderDetails.avatar}
          sx={{ width: 32, height: 32, mr: 2 }}
        />
      )}

      <Stack spacing={1} alignItems="flex-end">
        <Typography
          noWrap
          variant="caption"
          sx={{
            color: 'text.disabled',
            ...(!currentUser && {
              mr: 'auto',
            }),
          }}
        >
          {!currentUser && `${firstName},`} &nbsp;
          {formatDistanceToNowStrict(new Date(message.createdAt), {
            addSuffix: true,
          })}
        </Typography>

        <Stack
          sx={{
            p: 1.5,
            minWidth: 48,
            maxWidth: 320,
            borderRadius: 1,
            overflow: 'hidden',
            typography: 'body2',
            bgcolor: 'background.neutral',
            ...(currentUser && {
              color: 'grey.800',
              bgcolor: 'primary.lighter',
            }),
            ...(isImage && {
              p: 0,
            }),
          }}
        >
          {isImage ? (
            <Image
              alt="attachment"
              src={message.content}
              onClick={() => onOpenLightbox(message.content)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            />
          ) : (
            message.content
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
