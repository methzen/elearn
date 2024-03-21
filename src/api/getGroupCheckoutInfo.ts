import axios from 'src/utils/axios';

export default async function getGroupCheckoutInfo(urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.get(`/groups/checkout/info/by-id?urlName=${urlName}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
}
