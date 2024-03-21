import axios from 'src/utils/axios';

export type Role = 'admin' | 'member' | 'moderator';

export default async function checkGroupAccess(urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.get(`/groups/access?urlName=${urlName}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data as { role: Role; access: boolean; name: string };
}
