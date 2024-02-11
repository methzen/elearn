// ----------------------------------------------------------------------

export type IChatAttachment = {
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  dateCreated: Date;
  dateModified: Date;
};

export type IChatTextMessage = {
  _id: string;
  content: string;
  contentType: 'text';
  attachments: IChatAttachment[];
  createdAt: Date;
  senderId: string;
};

export type IChatImageMessage = {
  _id: string;
  content: string;
  contentType: 'image';
  attachments: IChatAttachment[];
  createdAt: Date;
  senderId: string;
};

export type IChatMessage = IChatTextMessage | IChatImageMessage;

// ----------------------------------------------------------------------

export type IChatContact = {
  _id: string;
  firstname: string;
  lastname: string;
  about: string;
  photoURL: string;
  address?: string;
  phone?: string;
  email?: string;
  lastActivity?: Date;
  status?: string;
  role?: string;
};

export type IChatParticipant = {
  _id: string;
  firstname: string;
  lastname: string;
  photoURL?: string;
  address?: string;
  phone?: string;
  email?: string;
  lastActivity?: Date;
  status?: 'online' | 'offline' | 'away' | 'busy';
  role?: string;
};

export type IChatConversation = {
  _id: string;
  participants: IChatParticipant[];
  type: string;
  unreadCount: number;
  messages: IChatMessage[];
};

export type IChatSendMessage = {
  conversationId: string;
  messageId: string;
  message: string;
  contentType: 'text';
  attachments: IChatAttachment[];
  createdAt: Date;
  senderId: string;
};

// ----------------------------------------------------------------------

export type IChatContactsState = {
  byId: Record<string, IChatParticipant>;
  allIds: string[];
};

export type IChatConversationsState = {
  byId: Record<string, IChatConversation>;
  allIds: string[];
};

export type IChatState = {
  isLoading: boolean;
  error: Error | string | null;
  contacts: IChatContactsState;
  conversations: IChatConversationsState;
  activeConversationId: null | string;
  participants: IChatParticipant[];
  recipients: IChatParticipant[];
};
