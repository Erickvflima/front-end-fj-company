import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getList, postSignin } from './service';

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

export const sendSignin = createAsyncThunk(
  'user/signin',
  async (cpf, { rejectWithValue }) => {
    try {
      const data = await postSignin(cpf);
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
  reducers: {
    clearUser: (state) => {
      // eslint-disable-next-line no-undef
      console.log(state);
      state.status = 'idle';
      state.signed = false;
      state.sendSignin = {
        status: '',
        message: '',
        token: '',
        document: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendSignin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendSignin.fulfilled, (state, action) => {
        state.status = 'completed';
        state.signed = true;
        state.sendSignin = action.payload;
      })
      .addCase(sendSignin.rejected, (state) => {
        state.status = 'failed';
        state.signed = false;
      });
  },
});
export const { clearUser } = user.actions;
export default user.reducer;
