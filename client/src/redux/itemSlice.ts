import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";

export type difficulty = "Easy" | "Medium" | "Hard";
export type status = "Completed" | "Attempted" | "To-Do";
type item = {
  status: status;
  problemName: String;
  difficulty: difficulty;
  timeTaken: String;
  dateCompleted: String;
  topics?: String;
  ownerId: String;
};

interface ItemsState {
  itemList: {
    [itemId: string]: item;
  };
  itemIdList: String[];
}

const initialState: ItemsState = {
  itemList: {},
  itemIdList: [],
};

export const addItemEntry = createAsyncThunk(
  "user/fetch",
  async (
    data: {
      status: string;
      problemName: string;
      difficulty: string;
      timeTaken: string;
      dateCompleted: string;
      topics?: string;
      ownerId: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axios.post("http://localhost:5000/entries/add", data);
      return response.data.item;
    } catch (error) {}
  },
);

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    userLogout: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(addItemEntry.fulfilled, (state, action) => {
      if (!state.itemList.hasOwnProperty(action.payload._id)) {
        state.itemList[action.payload._id] = action.payload;
        state.itemIdList.push(action.payload._id);
      }
    });
  },
});

export default itemsSlice.reducer;
