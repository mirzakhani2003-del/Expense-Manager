import { createSlice } from "@reduxjs/toolkit";

const savedUsers = localStorage.getItem("expense-manager-users");

const savedCurrentUser = localStorage.getItem("expense-manager-current-user");

const initialState = {
  users: savedUsers ? JSON.parse(savedUsers) : [],
  currentUser: savedCurrentUser ? JSON.parse(savedCurrentUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    register: (state, action) => {
      const newUser = {
        id: Date.now(),
        ...action.payload,
      };

      state.users.push(newUser);

      const { password, ...userWithoutPassword } = newUser;

      state.currentUser = userWithoutPassword;
    },

    login: (state, action) => {
      const { password, ...userWithoutPassword } = action.payload;

      state.currentUser = userWithoutPassword;
    },

    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
