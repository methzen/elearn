import axios from 'src/utils/axios';

export default async function getAllPostsByPage(url: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.get(url, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
}
