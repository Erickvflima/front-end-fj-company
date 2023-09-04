import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getList } from './service';

export const listTeam = createAsyncThunk(
  'team/list',
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

export const team = createSlice({
  name: 'team',
  initialState,
  reducers: {
    clearTeam: (state) => {
      state.status = 'idle';
      state.team = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listTeam.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(listTeam.fulfilled, (state, action) => {
        state.status = 'completed';
        state.listTeam = action.payload;
      })
      .addCase(listTeam.rejected, (state) => {
        state.status = 'failed';
        state.signed = false;
      });
  },
});
export const { clearTeam } = team.actions;
export default team.reducer;
