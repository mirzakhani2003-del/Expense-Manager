import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const defaultCategories = [
    "Food",
    "Transport",
    "Bills",
    "Entertainment",
    "Shopping",
  ];

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");

    return savedCategories ? JSON.parse(savedCategories) : defaultCategories;
  });

  const addCategory = (category) => {
    const trimmedCategory = category.trim();

    if (!trimmedCategory) return;

    setCategories((prev) => {
      const exists = prev.some(
        (item) => item.toLowerCase() === trimmedCategory.toLowerCase(),
      );

      if (exists) return prev;

      return [...prev, category];
    });
  };

  const deleteCategory = (categoryToDelete) => {
    setCategories((prev) =>
      prev.filter((category) => category !== categoryToDelete),
    );
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategory() {
  return useContext(CategoryContext);
}
