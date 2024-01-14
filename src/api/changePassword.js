import axios from "src/utils/axios";

export default async function changePassword(id, currentPassword, newPassword) {
  const token = localStorage.getItem('x-auth-token')
  const response = await axios.put("/users/change/password", {
    id,
    currentPassword,
    newPassword
  },
   {
    headers : {"x-auth-token" : token}
  })
  return response
}

