import axios from 'src/utils/axios';

export async function getCourseByGroupId(urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.get(`/groups/course/get?urlName=${urlName}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
}

export async function getCourseByGroupUrlNameForLecture(urlName: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.get(`/groups/course/student/get?urlName=${urlName}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
}

export type CurrentChapterProps = {
  groupId: string;
  courseId: string;
  chapterId: string;
  sectionId: string;
};

export async function apiSetCurrentChapter(data: CurrentChapterProps) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.post(
    `/groups/course/current/chapter?groupId=${data.groupId}`,
    data,
    {
      headers: {
        'x-auth-token': token,
      },
    }
  );
  return response.data;
}
