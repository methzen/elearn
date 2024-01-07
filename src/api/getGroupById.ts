import axios from "src/utils/axios";

export default async function getGroupById(groupId:string){
  const token = localStorage.getItem('x-auth-token')
  try{
    const response = await axios.get(`/groups/admin/get/by-id?groupId=${groupId}`, {
        headers: {
          "x-auth-token" : token,
        }
      })
      return response.data
  }catch(e){
    console.log(e);
    return
  }
}