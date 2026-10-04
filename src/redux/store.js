import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import transactionReducer from "./slices/transactionSlice";
import { storage } from "../utils/storage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    transactions: transactionReducer,
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

  if (state.categories.categories) {
    storage.setCategories(state.categories.categories);
  }

  if (state.transactions.transactions) {
    storage.setTransactions(state.transactions.transactions);
  }
});
