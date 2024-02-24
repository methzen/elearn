
import axios from "src/utils/axios";

export interface commentDataArg {
    parentId: string;
    text: string;
    type: "comment" | "reply"
}

export default async function commentAPost(commentData: commentDataArg){
const token = localStorage.getItem('x-auth-token')
    const response = await axios.post(`/comments/add/comment`,
        commentData,
      {
        headers: {
          "x-auth-token" : token,
          'Content-Type': 'application/json'
        },
      withCredentials: true
  
      })
      return response
}
