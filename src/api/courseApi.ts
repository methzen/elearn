import axios from "./axios";

export type attachmentData = {
    title: string;
    chapterId: string;
    singleUpload: File | null;
};

export async function addAttachmentApi(data: attachmentData){
  const token = localStorage.getItem('x-auth-token')
  try{    const response =  await axios.post(`/groups/course/attachment`, {
        title: data.title,
        chapterId: data.chapterId,
        file: data.singleUpload
      }, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }catch(e){
    throw(e)
  }
}

export interface chapterData {
    name: string,
    description: string,
    creatorId: string,
    sectionId:string
}

export async function addChapterApi(data: chapterData){
  const token = localStorage.getItem('x-auth-token')
  try{
    const response = await axios.post(`/groups/course/chapter`, data, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }
  catch(e){
    throw (e)
  }
}

export interface sectionData {
    name?: string,
    description?: string,
    creatorId?: string,
    courseId: string,
}

export async function addSectionApi(data: sectionData){
  const token = localStorage.getItem('x-auth-token')
  try{
    const response = await axios.post(`/groups/course/section`, data, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
      return response.data
  }catch(e){
    throw (e);
  }
}

export type contentData = {
    title?: string;
    chapterId: string;
    content: string;
    courseId: string;
};


export async function addTextContentApi(data: contentData){
  const token = localStorage.getItem('x-auth-token')
    try {
      const response = await axios.post(`/groups/course/textcontent`, data, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }catch(e){
      throw (e);
    }
}

export type videoData = {
    title: string;
    chapterId: string;
    courseId: string;
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


export async function addVideoContentApi(data: videoData){
  const token = localStorage.getItem('x-auth-token')
  try{
    const response = await axios.post(`/groups/course/videocontent`, data, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }catch(e){
    throw (e)
  }
}

export interface CreateCourseData {
  name?: string;
  description?: string;
  groupId: string;
  avatarUrl?: string;
}

export async function createACourse(data: CreateCourseData){
  const token = localStorage.getItem('x-auth-token')
    return await axios.post(`/groups/create/course`, data, {
      headers: {
        "x-auth-token" : token,
        'Content-Type': 'application/json'
      }
    })
}