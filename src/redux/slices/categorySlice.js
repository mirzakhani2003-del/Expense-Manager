import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";

const initialState = {
  categories: storage.getCategories(),
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload,
      );
    },
  },
});

export const categoryAction = categorySlice.actions;
export default categorySlice.reducer;
