import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getList } from './service';

export const listMessage = createAsyncThunk(
  'message/list',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getList(payload);
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

export const message = createSlice({
  name: 'message',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.status = 'idle';
      state.message = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(listMessage.fulfilled, (state, action) => {
        state.status = 'completed';
        state.listMessage = action.payload;
      })
      .addCase(listMessage.rejected, (state) => {
        state.status = 'failed';
        state.signed = false;
      });
  },
});
export const { clearMessage } = message.actions;
export default message.reducer;
