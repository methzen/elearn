import { CircleFormProps } from 'src/sections/form/CreateGroupForm';
import _ from "lodash";
import axios from "./axios";

export default async function updateGroup(data: CircleFormProps){
  const token = localStorage.getItem('x-auth-token')
  const groupId = data.id
  const response = await axios.put(`/groups/update/group?groupId=${groupId}`, {
      ... _.omit(data, ['imageUrl', 'id']),
      file: data.imageUrl
    }, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'multipart/form-data'
      }
    })
  return response
}