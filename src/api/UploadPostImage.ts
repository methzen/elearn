import axios from "src/utils/axios";

export default async function uploadPostImage(file:any){
  const token = localStorage.getItem('x-auth-token')
    return await axios.post("/post/uplaod/image", {
      file: file
    }, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'multipart/form-data'
      }
    })

}