import axios from "src/utils/axios";

export default async function unlikeAPost({postId}: any){
const token = localStorage.getItem('x-auth-token')
    return await axios.put(`/posts/unlike/post`, {
        postId,
      }, {
        
        headers: {
          "x-auth-token" : token,
          'Content-Type': 'application/json'
        },
      withCredentials: true
  
      })
}
