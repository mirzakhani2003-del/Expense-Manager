import { createSlice } from "@reduxjs/toolkit";
import { transactions as initialTransactions } from "../data/transactions";

const savedTransactions = localStorage.getItem("transactions");

const initialState = {
  transactions: savedTransactions
    ? JSON.parse(savedTransactions)
    : initialTransactions,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push({ ...action.payload, id: Date.now() });
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
    },
    updateTransaction: (state, action) => {
      const { id, updatedTransaction } = action.payload;

      state.transactions = state.transactions.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              ...updatedTransaction,
            }
          : transaction,
      );
    },
  },
});

export const transactionActions = transactionSlice.actions;

export default transactionSlice.reducer;
