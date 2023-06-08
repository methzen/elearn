import keyBy from 'lodash/keyBy';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import { Chapter, Module, Course } from '../../@types/course';

// ----------------------------------------------------------------------

const initialState: Course = {
  name: null,
  description: null,
  created: null,
  content: null,
  isLoading: false,
  contentStructure : null,
  error: null,
};

const slice = createSlice({
  name: 'chat',
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

    addStructureType(state, action) {
      state.contentStructure = action.payload.contentStructure;
    },
    hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { addBasicInfo, addStructureType } = slice.actions;

// ----------------------------------------------------------------------

export function getContacts() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/chat/contacts');
      dispatch(slice.actions.addBasicInfo(response.data.contacts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
