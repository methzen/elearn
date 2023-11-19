import { createSlice, Dispatch } from '@reduxjs/toolkit';
// @types
import { Video, Attachment, Chapter, Section ,Course } from '../../@types/course';
import createACourse from '../../api/createACourse'
import getCourseByGroupId from "../../api/getCourseByGroupId"
import createASection from "../../api/createASection"
// import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

interface CourseStore extends Course {
  isLoading: boolean;
  error: boolean;
  editable: boolean
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
      state.id = action.payload._id
      state.editable = action.payload.editable
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
      // const section = {
      //   id: state.sections.length,
      //   name : `Section ${state.sections.length + 1}`, 
      //   isValidated:false,
      //   chapters: [],
      // }
      state.sections.push(action.payload as Section)
    },

    updateSection(state:CourseStore, action: {type:any, payload:Section}) {
      const stateSection = state.sections.find(section => section.id === action.payload.id)
      const index = state.sections.indexOf(stateSection!)
      state.sections[index] = action.payload
    },

    addChapter(state:CourseStore, {type, payload}: {type:any, payload:any}) {
      const section = state.sections[payload.index]
      section.chapters.push({
        id : section.chapters.length,
        name: payload.name,
        videoContent: null,
        textContent: "",
        attachments: []
      })
      state.sections[payload.index] = section
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
  addChapter,
  updateSection,
  updateChapter,
  initalizeCourse,
} = slice.actions;

// ----------------------------------------------------------------------

export function CreateACourse(groupId:string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const response = await createACourse(groupId);
      dispatch(endLoading());
      dispatch(initalizeCourse(response.data))
      // dispatch(addSection())
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
      dispatch(initalizeCourse(response))
      dispatch(endLoading());
    } catch (error) {
      console.log(error)
      dispatch(endLoading());
    }
  };
}

export function apiCreateASection(groupId:string, courseId:string){
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const response = await createASection(groupId, courseId);
      console.log("add sestion response", response)
      dispatch(addSection(response))
      dispatch(endLoading());
    } catch (error) {
      console.log(error)
      dispatch(endLoading());
    }
  };
}
// ----------------------------------------------------------------------
