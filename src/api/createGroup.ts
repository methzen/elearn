import { FormValuesProps } from "src/@types/create";
import axios from "./axios";

interface groupData {
    name: string,
    description : string,
  }

export default async function createGroup(data: FormValuesProps){
  const newData = {name : data.name, description : data.editor} 
  const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/groups/create/group`, {
      data: newData,
      file: data.singleUpload
    }, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'multipart/form-data'
      }
    })

}