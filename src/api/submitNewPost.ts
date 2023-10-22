import axios from "src/utils/axios";

export default async function submitNewPost(content: any){
const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/posts/submit-new-post`, {
        text: content.message,
        title: content.title,
      }, {
        
        headers: {
          "x-auth-token" : token,
          'Content-Type': 'application/json'
        },
      withCredentials: true
  
      })
}
