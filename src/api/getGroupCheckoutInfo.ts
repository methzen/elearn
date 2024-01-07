import axios from "src/utils/axios";

export default async function getGroupCheckoutInfo(groupId:string){
  const token = localStorage.getItem('x-auth-token')
  try{
    const response = await axios.get(`/groups/checkout/info/by-id?groupId=${groupId}`, {
        headers: {
          "x-auth-token" : token,
        }
      })
      return response.data
  }catch(e){
    throw e;
  }
}