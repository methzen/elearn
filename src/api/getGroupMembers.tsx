import axios from 'src/utils/axios';

export default async function getGroupMembers(urlName: string, page: number) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios({
    url: `/groups/users/for/admin?urlName=${urlName}&page=${page}`,
    headers: { 'x-auth-token': token },
    withCredentials: true,
  });
  return response.data;
}
