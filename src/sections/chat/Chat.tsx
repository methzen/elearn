import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Card, Container, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getContacts,
  getConversation,
  getParticipants,
  getConversations,
  addRecipients,
  sendMessage,
  markConversationAsRead,
  resetActiveConversation,
  addMessage,
} from '../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// @types
import { IChatParticipant, IChatSendMessage } from '../../@types/chat';
// sections
import ChatNav from './nav/ChatNav';
import ChatRoom from './room/ChatRoom';
import ChatMessageInput from './message/ChatMessageInput';
import ChatMessageList from './message/ChatMessageList';
import ChatHeaderDetail from './header/ChatHeaderDetail';
import ChatHeaderCompose from './header/ChatHeaderCompose';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSocketContext } from 'src/hooks/useSocket';

// ----------------------------------------------------------------------

export default function Chat() {
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const socket = useSocketContext();
  const CURRENT_USER_ID = user?.id;
  const dispatch = useDispatch();

  const {
    push,
    pathname,
    query: { conversationKey },
  } = useRouter();

  const { contacts, recipients, participants, activeConversationId, conversations } = useSelector(
    (state) => state.chat
  );

  const selectedConversation = useSelector(() => {
    if (activeConversationId) {
      return conversations.byId[activeConversationId];
    }

    return {
      _id: '',
      messages: [],
      participants: [],
      unreadCount: 0,
      type: '',
    };
  });

  const detailView = !!conversationKey;

  const displayParticipants = participants.filter((item) => item._id !== CURRENT_USER_ID);

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(`${conversationKey}`));
      try {
        await dispatch(getConversation(`${conversationKey}`));
      } catch (error) {
        console.error(error);
        push(PATH_DASHBOARD.chat.new);
      }
    };

    if (conversationKey) {
      getDetails();
      socket.emit('setup', user);
      socket.connect();
      socket.on('connected', () => {
        console.log('you are connected...');
      });
      socket.emit('join room', user?.id);
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    socket.on('message recieved', (value: IChatSendMessage) => {
      if (conversationKey === value.conversationId) {
        dispatch(sendMessage(value));

        // const messageExist = selectedConversation.messages.find(
        //   (mess) => mess._id === value.messageId
        // );
        // if (!messageExist) {
        //   // await dispatch(getConversation(`${conversationKey}`));
        //   dispatch(sendMessage(value));
        // }
      } else {
        console.log('Push a notification');
        // if (!notifications.includes(value)) {
        //   dispatch(setNotifications([value, ...notifications]))
        // }
      }
      // dispatch(fetchChats())
    });
    socket.on('disconnect', () => {
      console.log('user is disconnected...');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message recieved');
      socket.off('new message');
    };
  }, []);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  const handleAddRecipients = (selectedRecipients: IChatParticipant[]) => {
    dispatch(addRecipients(selectedRecipients));
  };

  const handleSendMessage = async (value: IChatSendMessage) => {
    socket.emit('stop typing', activeConversationId);
    try {
      dispatch(sendMessage(value));
      dispatch(addMessage(conversationKey as string, value.content));
      socket.emit('new message', { message: value, participants });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Chat"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.root,
          },
          { name: 'Chat' },
        ]}
      />

      <Card sx={{ height: '72vh', display: 'flex' }}>
        <ChatNav conversations={conversations} activeConversationId={activeConversationId} />

        <Stack flexGrow={1} sx={{ overflow: 'hidden' }}>
          {detailView ? (
            <ChatHeaderDetail participants={displayParticipants} />
          ) : (
            <ChatHeaderCompose
              recipients={recipients}
              contacts={Object.values(contacts.byId)}
              onAddRecipients={handleAddRecipients}
            />
          )}

          <Stack
            direction="row"
            flexGrow={1}
            sx={{
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Stack flexGrow={1} sx={{ minWidth: 0 }}>
              <ChatMessageList conversation={selectedConversation} />

              <ChatMessageInput
                conversationId={activeConversationId}
                onSend={handleSendMessage}
                disabled={
                  pathname === PATH_DASHBOARD.chat.root || pathname === PATH_DASHBOARD.chat.new
                }
              />
            </Stack>

            {detailView && (
              <ChatRoom conversation={selectedConversation} participants={displayParticipants} />
            )}
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
