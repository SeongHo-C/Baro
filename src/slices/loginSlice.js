import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  user_email: null,
  user_name: null,
  user_job: null,
  user_file: null,
  user_intro: null,
  user_school: null,
};

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.push({ isLogin: true });
    },
  },
});

export default loginSlice;
export const { login } = loginSlice.actions;
