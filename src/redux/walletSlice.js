import { createSlice } from "@reduxjs/toolkit";

const savedWallets = localStorage.getItem("expense-manager-wallets");

const initialState = {
  wallets: savedWallets ? JSON.parse(savedWallets) : [],
};

const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    addWallet: (state, action) => {
      const wallet = {
        id: crypto.randomUUID(),
        ...action.payload,
      };

      state.wallets.push(wallet);
    },
    updateWallet: (state, action) => {
      const { id, updatedWallet } = action.payload;

      const wallet = state.wallets.find((wallet) => wallet.id === id);

      if (wallet) {
        Object.assign(wallet, updatedWallet);
      }
    },
    deleteWallet: (state, action) => {
      state.wallets = state.wallets.filter(
        (wallet) => wallet.id !== action.payload,
      );
    },
  },
});

export const walletActions = walletSlice.actions;

export default walletSlice.reducer;
