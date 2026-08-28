import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TransactionProvider } from "./context/TransactionContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CategoryProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </CategoryProvider>
  </StrictMode>,
);
