import axios from "src/utils/axios";

export default async function getGroupDataForAdmin(groupId:string){
  const token = localStorage.getItem('x-auth-token')
  const response = await axios.get(`/groups/data/for/admin?groupId=${groupId}`, {
        headers: {
          "x-auth-token" : token,
        }
      })
  return response.data
}