import axios from './axios';

export type attachmentData = {
  title: string;
  courseId: string;
  chapterId: string;
  singleUpload: File | null;
};

export async function addAttachmentApi(data: attachmentData, urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(
    `/groups/course/attachment?urlName=${urlName}`,
    {
      title: data.title,
      chapterId: data.chapterId,
      courseId: data.courseId,
      file: data.singleUpload,
    },
    {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
}

export interface chapterData {
  name?: string;
  description?: string;
  creatorId?: string;
  sectionId: string;
  chapterId?: string;
}

export async function addChapterApi(data: chapterData, urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(`/groups/course/chapter?urlName=${urlName}`, data, {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function deleteChapterApi(data: chapterData, urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.delete(`/groups/course/chapter?urlName=${urlName}`, {
    data,
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}
export interface sectionData {
  name?: string;
  description?: string;
  creatorId?: string;
  courseId?: string;
  isValidated?: boolean;
  sectionId?: string;
}

export async function addSectionApi(data: sectionData, urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(`/groups/course/section?urlName=${urlName}`, data, {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function updateSectionApi(data: sectionData, urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.put(`/groups/course/section?urlName=${urlName}`, data, {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function deleteSectionApi(courseId: string, sectionId: string, urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.delete(
    `/groups/course/section?courseId=${courseId}&sectionId=${sectionId}&urlName=${urlName}`,
    {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}

export async function editOrSaveCourseApi({
  groupId,
  courseId,
  forSave,
}: {
  groupId: string;
  courseId: string;
  forSave: boolean;
}) {
  const token = localStorage.getItem('x-auth-token');
  const baseUrl = forSave ? '/groups/course/save' : '/groups/course/edit';
  const response = await axios.put(
    `${baseUrl}?groupId=${groupId}&courseId=${courseId}`,
    {},
    {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}

export type contentData = {
  title?: string;
  chapterId: string;
  content: string;
  courseId: string;
};

export async function addTextContentApi(data: contentData, urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(`/groups/course/textcontent?urlName=${urlName}`, data, {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export type videoData = {
  title: string;
  chapterId: string;
  courseId: string;
  data: {
    name: string;
    url: string;
    type: string;
    format: string;
    asset_id: string;
    thumbnail_url: string;
    secure_url: string;
    path: string;
    original_filename: string;
    public_id: string;
  };
};

export async function addVideoContentApi(data: videoData, urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(`/groups/course/videocontent?urlName=${urlName}`, data, {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export interface CreateCourseData {
  name?: string;
  description?: string;
  urlName: string;
  avatarUrl?: string;
}

export async function createACourse(data: CreateCourseData) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(`/groups/create/course?urlName=${data.urlName}`, data, {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  });
  return response;
}
