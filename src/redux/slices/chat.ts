import keyBy from 'lodash/keyBy';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import { IChatState } from '../../@types/chat';
import { contactData, conversationData, conversationWithReeceChungData } from 'src/_mock/_chat';

// ----------------------------------------------------------------------

const initialState: IChatState = {
  isLoading: false,
  error: null,
  contacts: { byId: {}, allIds: [] },
  conversations: { byId: {}, allIds: [] },
  activeConversationId: null,
  participants: [],
  recipients: [],
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CONTACT SSUCCESS
    getContactsSuccess(state, action) {
      const contacts = action.payload;

      state.contacts.byId = keyBy(contacts, 'id');
      state.contacts.allIds = Object.keys(state.contacts.byId);
    },

    // GET CONVERSATIONS
    getConversationsSuccess(state, action) {
      const conversations = action.payload;

      state.conversations.byId = keyBy(conversations, 'id');
      state.conversations.allIds = Object.keys(state.conversations.byId);
    },

    // GET CONVERSATION
    getConversationSuccess(state, action) {
      const conversation = action.payload;

      if (conversation) {
        state.conversations.byId[conversation.id] = conversation;
        state.activeConversationId = conversation.id;
        if (!state.conversations.allIds.includes(conversation.id)) {
          state.conversations.allIds.push(conversation.id);
        }
      } else {
        state.activeConversationId = null;
      }
    },

    // ON SEND MESSAGE
    sendMessage(state, action) {
      const conversation = action.payload;
      const { conversationId, messageId, message, contentType, attachments, createdAt, senderId } =
        conversation;

      const newMessage = {
        id: messageId,
        body: message,
        contentType,
        attachments,
        createdAt,
        senderId,
      };

      state.conversations.byId[conversationId].messages.push(newMessage);
    },

    markConversationAsReadSuccess(state, action) {
      const { conversationId } = action.payload;
      const conversation = state.conversations.byId[conversationId];
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },

    // GET PARTICIPANTS
    getParticipantsSuccess(state, action) {
      const participants = action.payload;
      state.participants = participants;
    },

    // RESET ACTIVE CONVERSATION
    resetActiveConversation(state) {
      state.activeConversationId = null;
    },

    addRecipients(state, action) {
      const recipients = action.payload;
      state.recipients = recipients;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { addRecipients, sendMessage, resetActiveConversation } = slice.actions;

// ----------------------------------------------------------------------

export function getContacts() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/contacts');
      dispatch(slice.actions.getContactsSuccess(contactData.contacts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getConversations() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/conversations');
      dispatch(slice.actions.getConversationsSuccess(conversationData.conversations));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getConversation(conversationKey: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/conversation', {
      //   params: { conversationKey },
      // });
      dispatch(slice.actions.getConversationSuccess(conversationWithReeceChungData.conversation));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function markConversationAsRead(conversationId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // await axios.get('/api/chat/conversation/mark-as-seen', {
      //   params: { conversationId },
      // });
      dispatch(slice.actions.markConversationAsReadSuccess({ conversationId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getParticipants(conversationKey: string) {
  const data={
    participants: [
        {
            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
            "avatar": "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_4.jpg",
            "name": "Harrison Stein",
            "username": "harrison.stein",
            "address": "110 Lamar Station Apt. 730 - Hagerstown, OK / 49808",
            "phone": "692-767-2903",
            "email": "violet.ratke86@yahoo.com",
            "role": "ux designer",
            "status": "online",
            "lastActivity": "2024-02-05T16:20:04.666Z"
        }
    ]
}
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/participants', {
      //   params: { conversationKey },
      // });
      dispatch(slice.actions.getParticipantsSuccess(data.participants));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
