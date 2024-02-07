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

export async function createGroupSubscription(priceId:string, groupId:string){
  const token = localStorage.getItem('x-auth-token')
  const response =  await axios.post(`/group/member/create-subscription`, {
        priceId,
        groupId
      }, {
        headers: {
          "x-auth-token" : token,
          'Content-Type': 'application/json'
        }
      })
  return response.data
}

export async function cancelSubscription(subscriptionId:string){
  const token = localStorage.getItem('x-auth-token')
  const response =  await axios.post(`/cancel-subscription`, {
      subscriptionId
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

export async function getCustomerInvoices(){
  const token = localStorage.getItem('x-auth-token')
  const response =  await axios.get(`/invoice-preview`, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
  return response.data
}


export async function getCustomerPaymentMethods(){
  const token = localStorage.getItem('x-auth-token')
  const response =  await axios.get('/customer/payment/method', {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
  return response.data
}

export async function subscribeCoach(subscriptionName:string, price:string, trial:boolean){
  const token = localStorage.getItem('x-auth-token')
  const response =  await axios.post(`/users/subscribe/coach`,
        {
          subscriptionName,
          price,
          trial
        }, {
        headers: {
          "x-auth-token" : token,
          'Content-Type': 'application/json'
        }
      })
  return response.data
}

export async function updateCoachSubscription(subscriptionId:string){
  const token = localStorage.getItem('x-auth-token')
  const response = await axios.put(`/users/coach/update/subscription`, {
        subscriptionId,
        }, {
          headers: {
            "x-auth-token" : token,
            'Content-Type': 'application/json'
          }
        })
  return response.data
}



export async function getStripeAccountLink(){
  const token = localStorage.getItem('x-auth-token')
  const response = await axios.get(`/users/coach/account/link`,
        {
          headers: {
            "x-auth-token" : token,
            'Content-Type': 'application/json'
          }
        })
  return response.data
}