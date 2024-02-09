import { useEffect, useState } from 'react';
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
} from '../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// @types
import { IChatConversation, IChatMessage, IChatParticipant, IChatSendMessage, IChatTextMessage } from '../../@types/chat';
// sections
import ChatNav from './nav/ChatNav';
import ChatRoom from './room/ChatRoom';
import ChatMessageInput from './message/ChatMessageInput';
import ChatMessageList from './message/ChatMessageList';
import ChatHeaderDetail from './header/ChatHeaderDetail';
import ChatHeaderCompose from './header/ChatHeaderCompose';
import { useSocketContext } from 'src/hooks/useSocket';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------



export default function Chat() {
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext()
  const socket = useSocketContext()
  const activeConversationId="1"
  const [selectedConversation, setSelectedConversation] = useState<IChatConversation>({
    id: '1',
    messages: [],
    participants: [],
    unreadCount: 0,
    type: 'ONE_TO_ONE',
  })

  const dispatch = useDispatch();

  const {
    push,
    pathname,
    query: { conversationKey },
  } = useRouter();

  // const { contacts, recipients, participants, activeConversationId, conversations } = useSelector(
  //   (state) => state.chat
  // );

  // const selectedConversation = useSelector(() => {
  //   if (activeConversationId) {
  //     return conversations.byId[activeConversationId];
  //   }

  //   return {
  //     id: '',
  //     messages: [],
  //     participants: [],
  //     unreadCount: 0,
  //     type: '',
  //   };
  // });
  function userInList(list: any, id: string) {
    return list.some(function (user: {id: string}) {
        return user.id === id;
    });
}


  useEffect(()=>{
    if(user){
      socket.emit("join_room", "1", user?.id);
      console.log('user has joined room')
    }
  }, [user])

  useEffect(() => {
    socket.on('receive_msg', (msg:IChatMessage, user: IChatParticipant) => {
      const conver ={...selectedConversation}
      if (!userInList(conver.participants, user?.id)){
        conver.participants.push(user as IChatParticipant)
      }
      conver.messages.push(msg)
      setSelectedConversation(conver)
    });
  }, [socket]);
  // const detailView = !!conversationKey;

  // const displayParticipants = participants.filter((item) => item.id !== CURRENT_USER_ID);

  // useEffect(() => {
  //   dispatch(getConversations());
  //   dispatch(getContacts());
  // }, [dispatch]);

  // useEffect(() => {
  //   const getDetails = async () => {
  //     dispatch(getParticipants(`${conversationKey}`));
  //     try {
  //       await dispatch(getConversation(`${conversationKey}`));
  //     } catch (error) {
  //       console.error(error);
  //       push(PATH_DASHBOARD.chat.new);
  //     }
  //   };

  //   if (conversationKey) {
  //     getDetails();
  //   } else if (activeConversationId) {
  //     dispatch(resetActiveConversation());
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [conversationKey]);

  // useEffect(() => {
  //   if (activeConversationId) {
  //     dispatch(markConversationAsRead(activeConversationId));
  //   }
  // }, [dispatch, activeConversationId]);

  // const handleAddRecipients = (selectedRecipients: IChatParticipant[]) => {
  //   dispatch(addRecipients(selectedRecipients));
  // };



  const handleSendMessage = async (value: IChatSendMessage) => {
    try {
      const { conversationId, messageId, message, contentType, attachments, createdAt, senderId } = value;

    const newMessage = {
      id: messageId,
      body: message,
      contentType,
      attachments,
      createdAt,
      senderId,
    };

    const conver = {...selectedConversation}
    if (!userInList(conver.participants, user?.id)){
      conver.participants.push(user as IChatParticipant)
    }
    conver.messages.push(newMessage)
    setSelectedConversation(conver)
    await socket.emit("send_msg", newMessage, "1", user);
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
        {/* <ChatNav conversations={conversations} activeConversationId={activeConversationId} /> */}

        <Stack flexGrow={1} sx={{ overflow: 'hidden' }}>
          {/* {detailView ? (
            <ChatHeaderDetail participants={displayParticipants} />
          ) : (
            <ChatHeaderCompose
              recipients={recipients}
              contacts={Object.values(contacts.byId)}
              onAddRecipients={handleAddRecipients}
            />
          )} */}

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
                // disabled={
                //   pathname === PATH_DASHBOARD.chat.root || pathname === PATH_DASHBOARD.chat.new
                // }
              />
            </Stack>

            {/* {detailView && (
              <ChatRoom conversation={selectedConversation} participants={displayParticipants} />
            )} */}
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
