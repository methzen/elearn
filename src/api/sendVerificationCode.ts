import axios from './axios';

export async function sendVerificationCode() {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(
    `/users/send/verify/code`,
    {},
    {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}
