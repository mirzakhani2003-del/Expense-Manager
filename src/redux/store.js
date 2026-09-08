import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    categories: categoryReducer,
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
});
