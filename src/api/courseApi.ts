import axios from "./axios";

export type attachmentProps = {
    title: string;
    chapterId: string;
    singleUpload: File | null;
};

export async function addAttachment(data: attachmentProps){
  const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/groups/course/attachment`, {
        title: data.title,
        chapterId: data.chapterId,
        file: data.singleUpload
      }, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'multipart/form-data'
      }
    })

}

interface chapterData {
    name: string,
    description: string,
    creatorId: string,
    groupId: string,
    sectionId:string
}

export async function addChapter(data: chapterData){
  const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/groups/course/chapter`, data, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
}

interface sectionData {
    name: string,
    description: string,
    creatorId: string,
    courseId: string,
}

export async function addSection(data: sectionData){
  const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/groups/course/section`, data, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })

}

export type contentData = {
    title: string;
    chapterId: string;
    content: string;
};


export async function addTextContent(data: contentData){
  const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/groups/course/chapter`, data, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
}

export type videoData = {
    title: string;
    chapterId: string;
    data: {
        name: string,
        url: string,
        type: string,
        format: string,
        asset_id: string,
        thumbnail_url: string,
        secure_url: string,
        path: string,
        original_filename: string,
        public_id: string,
      }
};


export async function addVideoContent(data: videoData){
  const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/groups/course/chapter`, data, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
}