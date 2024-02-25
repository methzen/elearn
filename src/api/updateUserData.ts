import axios from 'src/utils/axios';

export default async function updateUserData(data: any, inputData: any) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.put(
    `/users/update-user-data/v2`,
    {
      data,
      file: inputData,
    },
    {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response;
}
