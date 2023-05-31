import axios from "./axios";

interface groupData {
    name: string,
    description : string,
  }

export default async function createGroup(data: any, inputData:File | null){
  const newData = {name : data.name, description : data.editor} 
  const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/groups/create/group`, {
      data: newData,
      file: inputData
    }, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'multipart/form-data'
      }
    })

}