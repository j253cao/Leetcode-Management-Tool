import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer, { authLogout } from "./authSlice";
import userReducer, { userLogout } from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

const appReducer = combineReducers({
  auth: authLogout,
  user: userLogout,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "authLogout" || action.type === "userLogout") {
    state = undefined;
  }
  return appReducer(state, action);
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
