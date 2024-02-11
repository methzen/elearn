import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import {
  Badge,
  Stack,
  Typography,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from '@mui/material';
// @types
import { IChatConversation } from '../../../@types/chat';
// components
import { CustomAvatar, CustomAvatarGroup } from '../../../components/custom-avatar';
import BadgeStatus from '../../../components/badge-status';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

type Props = {
  conversation: IChatConversation;
  openNav: boolean;
  isSelected: boolean;
  onSelect: VoidFunction;
};

export default function ChatNavItem({ conversation, openNav, isSelected, onSelect }: Props) {
  const { user} = useAuthContext()
  const details = getDetails(conversation, user?.id);

  const lastActivity = conversation.messages.length!=0 && conversation.messages[conversation.messages.length - 1].createdAt;

  const isGroup = details.otherParticipants.length > 1;

  const isUnread = conversation.unreadCount > 0;

  const hasOnlineInGroup =
    isGroup && details.otherParticipants.map((item) => item.status).includes('online');

  return (
    <ListItemButton
      disableGutters
      onClick={onSelect}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(isSelected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        {isGroup ? (
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={hasOnlineInGroup && <BadgeStatus status="online" />}
          >
            <CustomAvatarGroup compact sx={{ width: 48, height: 48 }}>
              {details.otherParticipants.slice(0, 2).map((participant) => (
                <CustomAvatar
                  key={participant._id}
                  alt={participant.firstname}
                  src={participant.photoURL}
                />
              ))}
            </CustomAvatarGroup>
          </Badge>
        ) : (
          <CustomAvatar
            key={details.otherParticipants[0]._id}
            alt={details.otherParticipants[0].firstname}
            src={details.otherParticipants[0].photoURL}
            BadgeProps={{
              badgeContent: <BadgeStatus status={details.otherParticipants[0].status} />,
            }}
            sx={{ width: 48, height: 48 }}
          />
        )}
      </ListItemAvatar>

      {openNav && (
        <>
          <ListItemText
            primary={details.displayNames}
            primaryTypographyProps={{ noWrap: true, variant: 'subtitle2' }}
            secondary={details.displayText}
            secondaryTypographyProps={{
              noWrap: true,
              variant: isUnread ? 'subtitle2' : 'body2',
              color: isUnread ? 'text.primary' : 'text.secondary',
            }}
          />

          <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
            {lastActivity && <Typography
              noWrap
              variant="body2"
              component="span"
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(lastActivity), {
                addSuffix: false,
              })}
            </Typography>}

            {isUnread && <BadgeStatus status="unread" size="small" />}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

const getDetails = (conversation: IChatConversation, currentUserId: string) => {
  const otherParticipants = conversation.participants.filter(
    (participant) => participant._id !== currentUserId
  );

  const displayNames = otherParticipants.map((participant) => participant.firstname).join(', ');

  let displayText = '';

  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';

    const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.content;

    displayText = `${sender}${message}`;
  }
  return { otherParticipants, displayNames, displayText };
};
