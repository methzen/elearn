import axios from "src/utils/axios";

export default async function checkGroupAccess(groupId:string){
  const token = localStorage.getItem('x-auth-token')
  try{
    const response = await axios.get(`/groups/access?groupId=${groupId}`, {
        headers: {
          "x-auth-token" : token,
        }
      })
      return response.data.access
  }catch(e){
    throw e;
  }
}