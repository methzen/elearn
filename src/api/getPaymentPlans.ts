import axios from 'src/utils/axios';

export default async function getPaymentPlans() {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios({
    url: `/payments/get/plans`,
    headers: { 'x-auth-token': token },
    withCredentials: true,
  });
  return response.data;
}
