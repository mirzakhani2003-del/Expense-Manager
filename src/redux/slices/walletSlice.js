import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";

const initialState = {
  wallets: storage.getWallets(),
};

const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    addWallet: (state, action) => {
      state.wallets.push(action.payload);
    },
    updateWallet: (state, action) => {
      const index = state.wallets.findIndex(
        (wallet) => wallet.id === action.payload.id,
      );

      if (index !== -1) {
        state.wallets[index] = action.payload;
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
