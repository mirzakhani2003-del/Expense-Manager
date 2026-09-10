import { createSlice } from "@reduxjs/toolkit";
import { defaultTransactions } from "../data/transactions";

const savedTransactions = localStorage.getItem("expense-manager-transactions");

const initialState = {
  transactions: savedTransactions ? JSON.parse(savedTransactions) : [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    addDefaultTransactions: (state, action) => {
      const { userId } = action.payload;

      const userTransactions = defaultTransactions.map((transaction) => ({
        ...transaction,
        id: crypto.randomUUID(),
        userId,
      }));

      state.transactions.push(...userTransactions);
    },
    addTransaction: (state, action) => {
      state.transactions.push({ ...action.payload, id: crypto.randomUUID() });
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
