import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action) => {
      return {
        isAuthenticated: !isEmpty(action.payload.nickname),
        user: action.payload,
      };
    },
    remove: (state, action) => {
      return {
        isAuthenticated: false,
        user: {},
      };
    },
  },
});
export default loginSlice;
export const { add, remove } = loginSlice.actions;
