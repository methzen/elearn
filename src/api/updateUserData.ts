import axios from "src/utils/axios";

export default async function updateUserData(data: any, inputData:any){
  const token = localStorage.getItem('x-auth-token')
  // return await axios.put(`/users/update-user-data/v2`, {
  //     // data: inputData, 
  //     file:inputData,
  // },
  //     {headers : {"x-auth-token" : token,
  //     "Content-Type": 'multipart/form-data'},
  //     withCredentials: true,}
  //   )
    return await axios.put(`/users/update-user-data/v2`, {
      data: data,
      file: inputData
    }, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'multipart/form-data'
      }
    })

}