import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getRounge = createAsyncThunk('rounge', async (page) => {
  const url = process.env.REACT_APP_URL;

  try {
    const response = await axios.get(`${url}/lounge?size=5`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const roungeSlice = createSlice({
  name: 'rounge',
  initialState: {
    data: [],
    totalElements: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRounge.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload.content;
      state.totalElements = action.payload.totalElements;
    });
  },
});

export default roungeSlice;
export { getRounge };
