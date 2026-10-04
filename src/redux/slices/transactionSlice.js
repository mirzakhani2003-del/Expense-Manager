import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";

const initialState = {
  transactions: storage.getTransactions(),
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id,
      );

      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
});

export const transactionAction = transactionSlice.actions;
export default transactionSlice.reducer;
