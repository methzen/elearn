
import axios from "src/utils/axios";

interface commentDataType {
    parentItemId: string;
    isParent?: boolean;
    parentCommentId?: string;
    text: string;
}

export default async function commentAPost(commentData: commentDataType){
const token = localStorage.getItem('x-auth-token')
    const response = await axios.post(`/comments/add/comment`, {
        commentData,
      }, {
        
        headers: {
          "x-auth-token" : token,
          'Content-Type': 'application/json'
        },
      withCredentials: true
  
      })
      return response
}
