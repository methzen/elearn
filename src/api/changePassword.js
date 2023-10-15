import axios from "src/utils/axios";

export default async function changePassword(id, currentPassword, newPassword) {
  const token = localStorage.getItem('x-auth-token')
  return await axios.put("/users/change/password", {
    id:id,
    currentPassword: currentPassword,
    newPassword: newPassword
  },
   {
    headers : {"x-auth-token" : token}
  })
}

