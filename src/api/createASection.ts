'/groups/:groupId/:courseId/section/add'

import axios from "src/utils/axios";

export default async function createASection(groupId:string, courseId:string){
  const token = localStorage.getItem('x-auth-token')
  try{
    const response = await axios.post(`/groups/${groupId}/${courseId}/section/add`, {
        headers: {
          "x-auth-token" : token,
        }
      })
      return response.data
  }catch(e){
    throw (e);
  }
}