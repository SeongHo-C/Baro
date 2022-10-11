import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getRecentProjects = createAsyncThunk('project/recent', async () => {
  const url = process.env.REACT_APP_URL;
  try {
    const response = await axios.get(`${url}/project/recent?size=8`);
    return response.data;
  } catch (error) {
    console.log('axios 에러');
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    recent: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecentProjects.fulfilled, (state, action) => {
      state.recent = action.payload;
    });
  },
});

export default projectsSlice;
export { getRecentProjects };
