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
        id: state.sections.length + 1,
        name : `Section ${state.sections.length + 1}`, 
        isValidated:false,
      }
      state.sections.push(section as Section)
    },

    updateSection(state:CourseStore, action: {type:any, payload:Section}) {
      const stateSection = state.sections.find(section => section.id === action.payload.id)
      const index = state.sections.indexOf(stateSection!)
      state.sections[index] = action.payload
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, addSection, updateSection } = slice.actions;

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
