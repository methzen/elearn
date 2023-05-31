import axios from './axios'

export default async function subscibe(data:any){
    return await axios("/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: data,
        withCredentials: true,
      })
}