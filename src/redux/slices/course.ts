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
}

const initialState: CourseStore = {
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
      state.id = action.payload.id;
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
        id: action.payload.id,
        name: action.payload.name,
        isValidated: action.payload.isValidated,
        chapters: action.payload.chapters,
      };
      state.sections.push(section as Section);
    },

    updateSection(state: CourseStore, action: { type: any; payload: Section }) {
      const stateSection = state.sections.find((section) => section.id === action.payload.id);
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
      const section = state.sections.find((s) => s.id === attachment.sectionId) as Section;
      section.chapters.map((chap) => {
        if (chap.id === attachment.chapter) {
          chap.attachments.push(attachment);
          return chap;
        }
        return chap;
      });
    },

    addVideo(state, action) {
      const video: Video = action.payload;
      const section = state.sections.find((s) => s.id === video.sectionId) as Section;
      section.chapters.map((chap) => {
        if (chap.id === video.chapterId) {
          chap.video = video;
          return chap;
        }
        return chap;
      });
    },

    addContent(state, action) {
      const chapter = action.payload;
      const section = state.sections.find((s) => s.id === chapter.sectionId) as Section;
      section.chapters.map((chap) => {
        if (chap.id === chapter.id) {
          chap.content = chapter.content;
          return chap;
        }
        return chap;
      });
    },

    updateChapter(state, action) {
      const section: Section = state.sections[action.payload.index];
      const chapter: Chapter = section.chapters[action.payload.chapter.id];
      const newChapter = {
        ...chapter,
        ...action.payload.chapter,
      };
      section.chapters[action.payload.chapter.id] = newChapter;
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

export function getCourse(groupId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const response = await getCourseByGroupId(groupId);
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

export function apiCreateASection(courseId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addSectionApi({ courseId } as sectionData);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiUpdateSection(inputData: sectionData) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await updateSectionApi(inputData);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiDeleteSection(courseId: string, sectionId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await deleteSectionApi(courseId, sectionId);
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

export function apiAddChapter(chapData: chapterData) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addChapterApi(chapData);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiDeleteChapter(chapData: chapterData) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await deleteChapterApi(chapData);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiAddAttachment(aD: attachmentData) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addAttachmentApi(aD);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiAddTextContent(cd: contentData) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addTextContentApi(cd);
      dispatch(updateState(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
}

export function apiAddVideoContent(vd: videoData) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addVideoContentApi(vd);
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
