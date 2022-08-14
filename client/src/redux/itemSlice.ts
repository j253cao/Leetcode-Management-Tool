import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import { Root } from "react-dom/client";
import { RootState } from "./store";

export type difficulty = "Easy" | "Medium" | "Hard";
export type status = "Completed" | "Attempted" | "To-Do";

export interface item {
  status: status;
  problemName: String;
  difficulty: difficulty;
  timeTaken: String;
  dateCompleted: String;
  topics?: String;
  ownerId: String;
  _id: string;
  __v: number;
  updatedAt: string;
  createdAt: string;
}

interface ItemsState {
  itemList: {
    [itemId: string]: item;
  };
  itemIdList: string[];
}

const initialState: ItemsState = {
  itemList: {},
  itemIdList: [],
};

export const addItemEntry = createAsyncThunk(
  "entries/add",
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

export const fetchAllItems = createAsyncThunk(
  "entry/fetch",
  async (
    data: {
      ownerId: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axios.get("http://localhost:5000/entries/fetch", {
        params: { ownerId: data.ownerId },
      });
      const result = response.data.response;
      return result;
    } catch (error) {
      return error;
    }
  },
);

export const deleteItemEntry = createAsyncThunk(
  "entry/delete",
  async (
    data: {
      _id: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axios.delete("http://localhost:5000/entries/delete", { data });
      const result = response.data.response;
      return result;
    } catch (error) {
      console.log("axios error", error);
      return error;
    }
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
    builder.addCase(fetchAllItems.fulfilled, (state, action) => {
      const items = action.payload;
      items.forEach((item: item) => {
        if (!state.itemList.hasOwnProperty(item._id)) {
          state.itemList[item._id] = item;
          state.itemIdList.push(item._id);
        }
      });
    });
    builder.addCase(deleteItemEntry.fulfilled, (state, action) => {
      const { _id } = action.payload;
      delete state.itemList[_id];
      const index = state.itemIdList.findIndex((id) => id === _id);
      state.itemIdList.splice(index, 1);
    });
  },
});

export const selectPagedItems = (state: RootState, page: number | null = null) => {
  let response: item[] = [];
  if (page) {
    state.item.itemIdList.slice((page - 1) * 10, page * 10 - 1).forEach((id) => {
      response.push(state.item.itemList[id]);
    });
  } else {
    state.item.itemIdList.forEach((id) => {
      response.push(state.item.itemList[id]);
    });
  }

  return response;
};

export const selectPagedCompletedItems = (state: RootState, page: number | null = null) => {
  let response: item[] = [];
  if (page) {
    state.item.itemIdList.forEach((id) => {
      const item = state.item.itemList[id];
      if (response.length < 10 && item.status === "Completed") {
        response.push(state.item.itemList[id]);
      }
    });
  } else {
    state.item.itemIdList.forEach((id) => {
      const item = state.item.itemList[id];
      if (item.status === "Completed") response.push(state.item.itemList[id]);
    });
  }
  return response;
};
export const selectPagedAttemptedItems = (state: RootState, page: number | null = null) => {
  let response: item[] = [];
  if (page) {
    state.item.itemIdList.forEach((id) => {
      const item = state.item.itemList[id];
      if (response.length < 10 && item.status === "Attempted") {
        response.push(state.item.itemList[id]);
      }
    });
  } else {
    state.item.itemIdList.forEach((id) => {
      const item = state.item.itemList[id];
      if (item.status === "Attempted") response.push(state.item.itemList[id]);
    });
  }
  return response;
};
export const selectPagedToDoItems = (state: RootState, page: number | null = null) => {
  let response: item[] = [];
  if (page) {
    state.item.itemIdList.forEach((id) => {
      const item = state.item.itemList[id];
      if (response.length < 10 && item.status === "To-Do") {
        response.push(state.item.itemList[id]);
      }
    });
  } else {
    state.item.itemIdList.forEach((id) => {
      const item = state.item.itemList[id];
      if (item.status === "To-Do") response.push(state.item.itemList[id]);
    });
  }
  return response;
};

export default itemsSlice.reducer;
