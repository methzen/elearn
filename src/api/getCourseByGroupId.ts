import axios from 'src/utils/axios';

export async function getCourseByGroupId(groupId: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.get(`/groups/course/get?groupId=${groupId}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
}

export async function getCourseByGroupIdForLecture(groupId: string) {
  const token = localStorage.getItem('x-auth-token');
  const response = await axios.get(`/groups/course/student/get?groupId=${groupId}`, {
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
