import axios from 'src/utils/axios';

export default async function updateUserGroupStatus(subscriptionId: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.put(
    `/group/member/update/status`,
    {
      subscriptionId,
    },
    {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}
