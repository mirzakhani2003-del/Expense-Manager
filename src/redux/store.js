import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import transactionReducer from "./slices/transactionSlice";
import walletReducer from "./slices/walletSlice";
import reminderReducer from "./slices/reminderSlice";
import { storage } from "../utils/storage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    transactions: transactionReducer,
    wallets: walletReducer,
    reminders: reminderReducer,
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

  if (state.wallets.wallets) {
    storage.setWallets(state.wallets.wallets);
  }

  if (state.reminders.reminders) {
    storage.setReminders(state.reminders.reminders);
  }
});
