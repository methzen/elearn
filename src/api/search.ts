import axios from 'src/utils/axios';

export async function searchContact(query: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios({
    url: `/search/users?search=${query}`,
    headers: { 'x-auth-token': token },
    withCredentials: true,
  });
  return response;
}

export async function searchParticipant(query: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios({
    url: `/search/users?search=${query}`,
    headers: { 'x-auth-token': token },
    withCredentials: true,
  });
  return response;
}
