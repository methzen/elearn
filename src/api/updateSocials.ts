import { IUserSocialLink } from 'src/@types/user';
import axios from 'src/utils/axios';

export default async function updateSocials(socials: IUserSocialLink) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(
    `/user/update/socials`,
    { socials },
    {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return response.data;
}
