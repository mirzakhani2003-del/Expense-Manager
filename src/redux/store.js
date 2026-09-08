import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import categoryReducer from "./categorySlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    categories: categoryReducer,
    auth: authReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "transactions",
    JSON.stringify(state.transactions.transactions),
  );

  localStorage.setItem(
    "expense-manager-categories",
    JSON.stringify(state.categories.categories),
  );

  localStorage.setItem(
    "expense-manager-users",
    JSON.stringify(state.auth.users),
  );

  localStorage.setItem(
    "expense-manager-current-user",
    JSON.stringify(state.auth.currentUser),
  );
});
