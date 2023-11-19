import axios from "./axios";


export default async function createACourse(groupId: string){
  const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/groups/create/course`, {
        name:"",
        description:"",
        groupId: groupId,
        avatarUrl:""
    }, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })

}