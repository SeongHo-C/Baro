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
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    },
  },
});
export default loginSlice;
export const { add } = loginSlice.actions;
