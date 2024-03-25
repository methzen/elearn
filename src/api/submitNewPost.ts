import axios from 'src/utils/axios';

export default async function submitNewPost(content: any, urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(
    `/posts/submit-new-post?urlName=${urlName}`,
    {
      urlName,
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
