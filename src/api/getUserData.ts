import axios from "src/utils/axios";


export default async function getUserData(id:string){
    const token = localStorage.getItem('x-auth-token')
    const response = await axios({
        url : `/users/get-user-data/v2?id=${id}`, 
    headers : {"x-auth-token" : token},
    withCredentials: true })
    return response.data
}