import axios from 'src/utils/axios';

export default async function likeAPost({ postId, urlName }: { postId: string; urlName: string }) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(
    `/posts/like/post?urlName=${urlName}`,
    {
      postId,
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
