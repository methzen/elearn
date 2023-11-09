import keyBy from 'lodash/keyBy';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import { Video, Attachment, Chapter, Section ,Course } from '../../@types/course';
// import { HYDRATE } from "next-redux-wrapper";
// ----------------------------------------------------------------------

interface CourseStore extends Course {
  isLoading: boolean;
  error: boolean;
}

const initialState: CourseStore = {
  name: null,
  description: null,
  created: null,
  isLoading: false,
  error: false,
  sections: [],

};

const slice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
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

    addSection(state:CourseStore) {
      const section = {
        id: state.sections.length,
        name : `Section ${state.sections.length + 1}`, 
        isValidated:false,
        chapters: [],
      }
      state.sections.push(section as Section)
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
  addSection,
  addChapter,
  updateSection,
  updateChapter,
} = slice.actions;

// ----------------------------------------------------------------------

// export function getContacts() {
//   return async (dispatch: Dispatch) => {
//     dispatch(startLoading());
//     try {
//       const response = await axios.get('/api/chat/contacts');
//       dispatch(addBasicInfo(response.data.contacts));
//     } catch (error) {
//       dispatch(hasError(error));
//     }
//   };
// }

// ----------------------------------------------------------------------
