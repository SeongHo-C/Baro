import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getProjects = createAsyncThunk('project', async (data) => {
  const url = process.env.REACT_APP_URL;
  console.log(data);
  try {
    const response = await axios.get(`${url}/project?page=1&size=8`, {
      params: {
        school: data[0],
        purpose: data[1],
        jobId: data[2],
        state: data[3],
      },
    });
    return response.data.content;
  } catch (error) {
    console.log('axios 에러');
  }
});

const listSlice = createSlice({
  name: 'project',
  initialState: {
    project: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.project = action.payload;
    });
  },
});

export default listSlice;
export { getProjects };
