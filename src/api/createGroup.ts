import { CircleFormProps } from 'src/sections/form/CreateGroupForm';
import _ from "lodash";
import axios from "./axios";

export default async function createGroup(data: CircleFormProps){
  const myData = _.omit(data, 'image')
  console.log('Data', myData)
  return
  const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/groups/create/group`, {
      data: myData,
      file: data.image
    }, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'multipart/form-data'
      }
    })

}