import axios from "./axios";

export async function getGroupSubscriptionPrice(){
  const token = localStorage.getItem('x-auth-token')
    const response =  await axios.get(`/admin/get/product/prices`,{
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
    return response.data
}

export async function createSubscription(priceId:string){
    const token = localStorage.getItem('x-auth-token')
      const response =  await axios.post(`/create-subscription`, {
        priceId: priceId
      }, {
        headers: {
          "x-auth-token" : token,
          'Content-Type': 'application/json'
        }
      })
      return response.data
}

export async function getSubscription(){
    const token = localStorage.getItem('x-auth-token')
      const response =  await axios.get(`/subscriptions`, {
        headers: {
          "x-auth-token" : token,
          'Content-Type': 'application/json'
        }
      })
      return response.data
}