import axios from 'src/utils/axios';

export type Role = 'admin' | 'member' | 'moderator';

export default async function checkGroupAccess(groupId: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.get(`/groups/access?groupId=${groupId}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data as { role: Role; access: boolean; name: string };
}
