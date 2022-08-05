import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from './store';

export interface AuthState {
  loggedIn: boolean;
  token: string;
  userId: string;
}

const initialState: AuthState = {
  loggedIn: false,
  token: '',
  userId: '',
};

export const verifyLogin = createAsyncThunk(
  'auth/login',
  async (
    data: {
      email: string;
      password: string;
    },
    thunkAPI,
  ) => {
    try {
      console.log(data.email);
      const response = await axios.post('http://localhost:5000/users/login', data);
      const token = response.data.token;
      const result = { ...response.data.result, token };
      return result;
    } catch (error) {
      return error;
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(verifyLogin.fulfilled, (state, action) => {
      if (action.payload.response?.status !== 404 && action.payload.response?.status !== 400) {
        state.loggedIn = true;
        state.token = action.payload.token;
        state.userId = action.payload._id;
      }
    });
  },
});

export const selectLoggedInState = (state: RootState) => {
  return state.auth.loggedIn;
};

export const selectUserId = (state: RootState) => {
  return state.auth.userId;
};

export default authSlice.reducer;