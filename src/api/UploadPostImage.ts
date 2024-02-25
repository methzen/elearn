import axios from 'src/utils/axios';

export default async function uploadPostImage(file: any) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(
    '/post/uplaod/image',
    {
      file,
    },
    {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response;
}
