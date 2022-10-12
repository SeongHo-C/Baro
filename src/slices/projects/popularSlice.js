import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getPopularProjects = createAsyncThunk('project/popular', async () => {
  const url = process.env.REACT_APP_URL;
  try {
    const response = await axios.get(`${url}/project/popular`);
    return response.data;
  } catch (error) {
    console.log('axios 에러');
  }
});

const popularSlice = createSlice({
  name: 'popular',
  initialState: {
    project: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPopularProjects.fulfilled, (state, action) => {
      state.project = action.payload;
    });
  },
});

export default popularSlice;
export { getPopularProjects };
