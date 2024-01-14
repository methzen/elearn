import axios from "src/utils/axios";


export default async function getGroupMembers(groupId:string, page: number){
    try {
        const token = localStorage.getItem('x-auth-token')
        const response = await axios({
            url : `/groups/users/for/admin?groupId=${groupId}&page=${page}`, 
        headers : {"x-auth-token" : token},
        withCredentials: true })
        return response.data
    }catch (err) {
        return err.response}
}