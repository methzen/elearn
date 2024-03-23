import axios from 'src/utils/axios';

export default async function submitNewPost(content: any, groupId: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(
    `/posts/submit-new-post?groupId=${groupId}`,
    {
      groupId,
      text: content.message,
      title: content.title,
    },
    {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return response;
}
