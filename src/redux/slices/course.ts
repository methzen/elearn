import { createSlice, Dispatch } from '@reduxjs/toolkit';
// @types
import { Video, Attachment, Chapter, Section ,Course } from '../../@types/course';
import getCourseByGroupId from "../../api/getCourseByGroupId"
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
  videoData
} from "../../api/courseApi"
// import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

interface CourseStore extends Course {
  isLoading: boolean;
  error: boolean;
  editable?: boolean
  ownershipLevel?: string
}

const initialState: CourseStore = {
  name: null,
  description: null,
  created: null,
  isLoading: false,
  error: false,
  sections: [],
  editable: false,
};

const slice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    initalizeCourse(state, action){
      if(!action.payload) return state
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.created = action.payload.created
      state.groupId = action.payload.groupId
      state.creatorId = action.payload.creatorId
      state.sections = action.payload.sections
      state.id = action.payload.id
      state.editable = action.payload.editable
    },

    updateState(state, action){
      if(!action.payload) return state
      return {...state, ...action.payload}
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
        name : action.payload.name, 
        isValidated:action.payload.isValidated,
        chapters: action.payload.chapters,
      }
      state.sections.push(section as Section)
    },

    updateSection(state:CourseStore, action: {type:any, payload:Section}) {
      const stateSection = state.sections.find(section => section.id === action.payload.id)
      const index = state.sections.indexOf(stateSection!)
      state.sections[index] = action.payload
    },

    // addChapter(state:CourseStore, {type, payload}:{type:any, payload: Chapter}) {
    //   const section = state.sections.find(section => section.id === payload.section) as Section
    //   const index = state.sections.indexOf(section!)
    //   section.chapters.push({
    //     id: payload.id,
    //     name: payload.name,
    //     attachments: payload.attachments,
    //     content: payload.content,
    //     created: payload.created,
    //     description: payload.description,
    //     video: payload.video
    //   })
    //   state.sections[index] = {...section}
    // },

    addAttachment(state, action){
      const attachment: Attachment = action.payload
      const section = state.sections.find(section => section.id === attachment.sectionId) as Section
      section.chapters.map(chap => {
        if (chap.id === attachment.chapter){
          chap.attachments.push(attachment)
          return chap;
        }
        return chap;
      })
    },

    addVideo(state, action){
      const video: Video = action.payload
      const section = state.sections.find(section => section.id === video.sectionId) as Section
      section.chapters.map(chap => {
        if (chap.id === video.chapterId){
          chap.video = video;
          return chap;
        }
        return chap;
      })
    },

    addContent(state, action){
      const chapter = action.payload
      const section = state.sections.find(section => section.id === chapter.sectionId) as Section
      section.chapters.map(chap => {
        if (chap.id === chapter.id){
          chap.content = chapter.content;
          return chap;
        }
        return chap;
      })
    },

    updateChapter(state, action){
      const section : Section = state.sections[action.payload.index]
      const chapter : Chapter = section.chapters[action.payload.chapter.id]
      const newChapter = {
        ...chapter,
        ...action.payload.chapter
      }
      section.chapters[action.payload.chapter.id] = newChapter
      state.sections[action.payload.index] = section
    }
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
} = slice.actions;

// ----------------------------------------------------------------------

export function CreateACourse(data:CreateCourseData) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const response = await createACourse(data);
      dispatch(updateState(response.data))
      dispatch(endLoading());
    } catch (error) {
      console.log(error)
      dispatch(endLoading());
    }
  };
}

export function getCourse(groupId:string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const response = await getCourseByGroupId(groupId);
      if (response.groupHasNoCourse) return 
      dispatch(updateState(response))
      dispatch(endLoading());
    } catch (error) {
      console.log(error)
      dispatch(endLoading());
    }
  };
}

export function apiCreateASection(courseId:string){
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addSectionApi({courseId} as sectionData);
      console.log("add section data", data)
      dispatch(updateState(data))
      dispatch(endLoading());
    } catch (error) {
      console.log(error)
      dispatch(endLoading());
    }
  };
}

export function apiAddChapter(chapData:chapterData){
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addChapterApi(chapData);
      console.log("add chapter data", data)
      dispatch(updateState(data))
      dispatch(endLoading());
    } catch (error) {
      console.log(error)
      dispatch(endLoading());
    }
  };
}

export function apiAddAttachment(attachmentData:attachmentData){
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addAttachmentApi(attachmentData);
      console.log("add attachment data", data)
      dispatch(updateState(data))
      dispatch(endLoading());
    } catch (error) {
      console.log(error)
      dispatch(endLoading());
    }
  };
}

export function apiAddTextContent(contentData:contentData){
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addTextContentApi(contentData);
      dispatch(updateState(data))
      dispatch(endLoading());
    } catch (error) {
      console.log(error)
      dispatch(endLoading());
    }
  };
}

export function apiAddVideoContent(videoData:videoData){
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = await addVideoContentApi(videoData);
      dispatch(updateState(data))
      dispatch(endLoading());
    } catch (error) {
      console.log(error)
      dispatch(endLoading());
    }
  };
}

export type {
  CreateCourseData,
  attachmentData,
  chapterData,
  contentData,
  sectionData,
  videoData
}
// ----------------------------------------------------------------------
