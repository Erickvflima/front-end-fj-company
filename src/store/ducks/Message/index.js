import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { deleteMessage, getList, postMessage, putMessage } from './service';

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
export const changeMessage = createAsyncThunk(
  'message/changeMessage',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await putMessage(payload);
      return data;
    } catch (error) {
      const err = error;
      return rejectWithValue(err.response?.data);
    }
  },
);

export const newMessage = createAsyncThunk(
  'message/new',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await postMessage(payload);
      return data;
    } catch (error) {
      const err = error;
      return rejectWithValue(err.response?.data);
    }
  },
);
export const deleteMessageById = createAsyncThunk(
  'message/delete',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await deleteMessage(payload);
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
      })
      .addCase(changeMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changeMessage.fulfilled, (state, action) => {
        state.status = 'completed';
        state.changeMessage = action.payload;
      })
      .addCase(changeMessage.rejected, (state) => {
        state.status = 'failed';
        state.signed = false;
      })
      .addCase(newMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(newMessage.fulfilled, (state, action) => {
        state.status = 'completed';
        state.newMessage = action.payload;
      })
      .addCase(newMessage.rejected, (state) => {
        state.status = 'failed';
        state.signed = false;
      });
  },
});
export const { clearMessage } = message.actions;
export default message.reducer;
