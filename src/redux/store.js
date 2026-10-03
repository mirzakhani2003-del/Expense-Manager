import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { storage } from "../utils/storage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  if (state.auth.users) {
    storage.setUsers(state.auth.users);
  }

  if (state.auth.currentUser) {
    storage.setCurrentUser(state.auth.currentUser);
  }

  if (!state.auth.currentUser) {
    storage.removeCurrentUser();
  }
});
