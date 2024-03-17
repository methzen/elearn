import axios from 'src/utils/axios';

type data = {
  with: string[];
};

export default async function createConversation(data: data) {
  const response = await axios.post('/chat/create/conversation', data, {
    headers: {
      'x-auth-token': localStorage.getItem('x-auth-token'),
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data;
}
