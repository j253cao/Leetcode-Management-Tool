import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import userReducer from "./userSlice";

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/authLogout" || action.type === "user/userLogout") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
