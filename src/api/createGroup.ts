import { CircleFormProps } from 'src/sections/form/CreateGroupForm';
import _ from "lodash";
import axios from "./axios";

export default async function createGroup(data: CircleFormProps){
  const token = localStorage.getItem('x-auth-token')
  const response = await axios.post(`/groups/create/group`, {
      data: _.omit(data, 'imageUrl'),
      file: data.imageUrl
    }, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'multipart/form-data'
      }
    })
  return response
}