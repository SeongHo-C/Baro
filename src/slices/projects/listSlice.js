import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getProjects = createAsyncThunk('project', async (data) => {
  const url = process.env.REACT_APP_URL;
  try {
    const response = await axios.get(`${url}/project?size=8`, {
      params: {
        school: data[0],
        purpose: data[1],
        jobId: data[2],
        state: data[3],
        page: data[4] || 1,
      },
    });
    return response.data;
  } catch (error) {
    console.log('axios 에러');
  }
});

const listSlice = createSlice({
  name: 'project',
  initialState: {
    project: [],
    totalElements: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.project = action.payload.content;
      state.totalElements = action.payload.totalElements;
    });
  },
});

export default listSlice;
export { getProjects };
