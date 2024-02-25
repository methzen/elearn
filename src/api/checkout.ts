import axios from './axios';

export default async function checkout(data: any) {
  const response = await axios('/payment/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
    withCredentials: true,
  });
  return response;
}
