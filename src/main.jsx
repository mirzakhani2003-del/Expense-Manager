import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRouter.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, dartTheme } from "./theme/theme.js";
import { ThemeModeProvider, useThemeMode } from "./theme/ThemeContext.jsx";
import CssBaseline from "@mui/material/CssBaseline";

const AppTheme = () => {
  const { themeMode } = useThemeMode();

  const theme = themeMode === "light" ? lightTheme : dartTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <ThemeModeProvider>
          <AppTheme />
        </ThemeModeProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
