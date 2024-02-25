import axios from './axios';

export default async function subscibe(data: any) {
  const response = await axios('/subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
    withCredentials: true,
  });
  return response;
}
