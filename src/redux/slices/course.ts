import { createSlice, Dispatch } from '@reduxjs/toolkit';
// @types
import { Video, Attachment, Chapter, Section, Course } from '../../@types/course';
import { getCourseByGroupId } from '../../api/getCourseByGroupId';
import {
  createACourse,
  addAttachmentApi,
  addChapterApi,
  addSectionApi,
  addTextContentApi,
  addVideoContentApi,
  CreateCourseData,
  attachmentData,
  chapterData,
  contentData,
  sectionData,
  videoData,
  updateSectionApi,
  deleteChapterApi,
  editOrSaveCourseApi,
  deleteSectionApi,
} from '../../api/courseApi';
// import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

interface CourseStore extends Course {
  isLoading: boolean;
  error: boolean;
  editable?: boolean;
  currentSection?: string;
  currentChapter?: string;
  hasCourse: boolean;
}

const initialState: CourseStore = {
  hasCourse: false,
  name: null,
  description: null,
  createdAt: null,
  isLoading: false,
  error: false,
  sections: [],
  editable: false,
  isSaved: undefined,
  currentSection: '',
  currentChapter: '',
  viewCurrentChapter: { sectionId: '', chapterId: '' },
};

const slice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    initalizeCourse(state, action) {
      if (!action.payload) return state;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.createdAt = action.payload.createdAt;
      state.groupId = action.payload.groupId;
      state.creatorId = action.payload.creatorId;
      state.sections = action.payload.sections;
      state._id = action.payload._id;
      state.editable = action.payload.editable;
      return state;
    },

    updateState(state, action) {
      if (!action.payload) return state;
      return { ...state, ...action.payload };
    },

    endLoading(state) {
      state.isLoading = false;
    },
    // RESET ACTIVE CONVERSATION
    addBasicInfo(state, action) {
      state.name = action.payload.name;
      state.description = action.payload.description;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    addSection(state, action) {
      const section = {
        _id: action.payload._id,
        name: action.payload.name,
        isValidated: action.payload.isValidated,
        chapters: action.payload.chapters,
      };
      state.sections.push(section as Section);
    },

    updateSection(state: CourseStore, action: { type: any; payload: Section }) {
      const stateSection = state.sections.find((section) => section._id === action.payload._id);
      const index = state.sections.indexOf(stateSection!);
      state.sections[index] = action.payload;
    },

    setCurrentSection(state, action) {},

    setCurrentChapter(state, action) {
      return {
        ...state,
        currentChapter: action.payload.chapterId,
        currentSection: action.payload.sectionId,
      };
    },

    addAttachment(state, action) {
      const attachment: Attachment = action.payload;
      const section = state.sections.find((s) => s._id === attachment.sectionId) as Section;
      section.chapters.map((chap) => {
        if (chap._id === attachment.chapter) {
          chap.attachments.push(attachment);
          return chap;
        }
        return chap;
      });
    },

    addVideo(state, action) {
      const video: Video = action.payload;
      const section = state.sections.find((s) => s._id === video.sectionId) as Section;
      section.chapters.map((chap) => {
        if (chap._id === video.chapterId) {
          chap.video = video;
          return chap;
        }
        return chap;
      });
    },

    addContent(state, action) {
      const chapter = action.payload;
      const section = state.sections.find((s) => s._id === chapter.sectionId) as Section;
      section.chapters.map((chap) => {
        if (chap._id === chapter._id) {
          chap.content = chapter.content;
          return chap;
        }
        return chap;
      });
    },

    updateChapter(state, action) {
      const section: Section = state.sections[action.payload.index];
      const chapter: Chapter = section.chapters[action.payload.chapter._id];
      const newChapter = {
        ...chapter,
        ...action.payload.chapter,
      };
      section.chapters[action.payload.chapter._id] = newChapter;
      state.sections[action.payload.index] = section;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startLoading,
  endLoading,
  addSection,
  addAttachment,
  addVideo,
  addContent,
  updateSection,
  updateChapter,
  initalizeCourse,
  updateState,
  setCurrentChapter,
} = slice.actions;

// ----------------------------------------------------------------------

export function CreateACourse(data: CreateCourseData) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const response = await createACourse(data);
      dispatch(updateState(response.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function getCourse(urlName: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const response = await getCourseByGroupId(urlName);
      if (response.groupHasNoCourse) {
        dispatch(endLoading());
        return;
      }
      dispatch(updateState(response));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiCreateASection(courseId: string, urlName: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addSectionApi({ courseId } as sectionData, urlName);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiUpdateSection(inputData: sectionData, urlName: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await updateSectionApi(inputData, urlName);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiDeleteSection(courseId: string, sectionId: string, urlName: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await deleteSectionApi(courseId, sectionId, urlName);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiEditOrSaveCourse(inputData: {
  groupId: string;
  courseId: string;
  forSave: boolean;
}) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await editOrSaveCourseApi(inputData);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiAddChapter(chapData: chapterData, urlName: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addChapterApi(chapData, urlName);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiDeleteChapter(chapData: chapterData, urlName: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await deleteChapterApi(chapData, urlName);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiAddAttachment(aD: attachmentData, urlName: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addAttachmentApi(aD, urlName);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiAddTextContent(cd: contentData, urlName: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addTextContentApi(cd, urlName);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiAddVideoContent(vd: videoData, urlName: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addVideoContentApi(vd, urlName);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export type { CreateCourseData, attachmentData, chapterData, contentData, sectionData, videoData };
// ----------------------------------------------------------------------
