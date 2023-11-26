import axios from "src/utils/axios";

export default async function getCourseByGroupId(groupId:string){
  const token = localStorage.getItem('x-auth-token')
  try{
    const response = await axios.get(`/groups/course/get?groupId=${groupId}`, {
        headers: {
          "x-auth-token" : token,
        }
      })
      return response.data
  }catch(e){
    throw (e);
  }
}