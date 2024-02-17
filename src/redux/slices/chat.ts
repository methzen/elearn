import keyBy from 'lodash/keyBy';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import { IChatState } from '../../@types/chat';

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

      state.contacts.byId = keyBy(contacts, '_id');
      state.contacts.allIds = Object.keys(state.contacts.byId);
    },

    // GET CONVERSATIONS
    getConversationsSuccess(state, action) {
      const conversations = action.payload;

      state.conversations.byId = keyBy(conversations, '_id');
      state.conversations.allIds = Object.keys(state.conversations.byId);
    },

    // GET CONVERSATION
    getConversationSuccess(state, action) {
      const conversation = action.payload;

      if (conversation) {
        state.conversations.byId[conversation._id] = conversation;
        state.activeConversationId = conversation._id;
        if (!state.conversations.allIds.includes(conversation._id)) {
          state.conversations.allIds.push(conversation._id);
        }
      } else {
        state.activeConversationId = null;
      }
    },

    // ON SEND MESSAGE
    sendMessage(state, action) {
      const conversation = action.payload;
      const { conversationId, messageId, content, contentType, attachments, createdAt, senderId } =
        conversation;

      const newMessage = {
        _id: messageId,
        content: content,
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
      const response = await axios.get('/chat/contacts');
      dispatch(slice.actions.getContactsSuccess(response.data));
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
      const response = await axios.get('/chat/get/conversations');
      dispatch(slice.actions.getConversationsSuccess(response.data));
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
      const response = await axios.get('/chat/get/conversation', {
        params: { conversationId : conversationKey },
      });
      dispatch(slice.actions.getConversationSuccess(response.data));
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
      await axios.post('/chat/markasseen',{ conversationId: conversationId});
      dispatch(slice.actions.markConversationAsReadSuccess({ conversationId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getParticipants(conversationKey: string) {

  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/chat/get/conversation', {
        params: { conversationId : conversationKey },
      });
      const participants = response.data.participants
      dispatch(slice.actions.getParticipantsSuccess(participants));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function addMessage(conversationKey: string, content: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/chat/add/message',
      {
        content
      },
      {
        params: { conversationId : conversationKey },
      });
      // const participants = response.data.participants
      // dispatch(slice.actions.getParticipantsSuccess(participants));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}