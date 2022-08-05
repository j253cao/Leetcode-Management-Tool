import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserState {
  username?: string;
  email?: string;
  id?: string;
}

const initialState: UserState = {};

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (
    data: {
      id: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axios.get('http://localhost:5000/users/fetch-user', {
        params: data,
      });
      console.log(response);
    } catch (error) {}
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
