import { createSlice } from "@reduxjs/toolkit";

let categories = [];

try {
  const savedCategories = localStorage.getItem("expense-manager-categories");

  if (savedCategories) {
    const parsedCategories = JSON.parse(savedCategories);

    if (Array.isArray(parsedCategories)) {
      categories = parsedCategories;
    }
  }
} catch (error) {
  console.error("Failed to load categories:", error);
}

const initialState = {
  categories,
};

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    addCategory: (state, action) => {
      const { name, userId } = action.payload;

      const trimmedCategory = name.trim();

      if (!trimmedCategory) return;

      const exists = state.categories.some(
        (category) =>
          category.userId === userId &&
          category.name.toLowerCase() === trimmedCategory.toLowerCase(),
      );

      if (exists) return;

      state.categories.push({
        id: crypto.randomUUID(),
        name: trimmedCategory,
        userId,
      });
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload,
      );
    },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
