import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserState {
  username?: string;
  email?: string;
  id?: string;
}

const initialState: UserState = {};

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (
    data: {
      id: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axios.get("http://localhost:5000/users/fetch-user", {
        params: data,
      });
      return response;
    } catch (error) {}
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {},
  },
  extraReducers: {},
});

export default userSlice.reducer;

export const {
  actions: { userLogout },
} = userSlice;
