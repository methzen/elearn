import axios from './axios'

export default async function checkout(data:any){
    return await axios("/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: data,
        withCredentials: true,
      })
}