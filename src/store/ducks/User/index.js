import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getList } from './service';

export const listUser = createAsyncThunk(
  'user/list',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getList();
      return data;
    } catch (error) {
      const err = error;
      return rejectWithValue(err.response?.data);
    }
  },
);

const initialState = {
  status: 'idle',
  message: '',
  type: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default user.reducer;
