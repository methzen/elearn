import axios from "src/utils/axios";

export default async function likeAPost({postId}: any){
const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/posts/like/post`, {
        postId,
      }, {
        
        headers: {
          "x-auth-token" : token,
          'Content-Type': 'application/json'
        },
      withCredentials: true
  
      })
}