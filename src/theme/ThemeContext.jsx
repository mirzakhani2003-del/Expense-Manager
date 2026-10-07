import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

const savedTheme = localStorage.getItem("expense-manger-theme");

const initialTheme = savedTheme === "dark" ? "dark" : "light";

export const ThemeModeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(initialTheme);

  const toggleTheme = () => {
    setThemeMode((currentMode) => {
      const newMode = currentMode === "light" ? "dark" : "light";

      localStorage.setItem("expense-manger-theme", newMode);

      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeModeProvider");
  }

  return context;
};
