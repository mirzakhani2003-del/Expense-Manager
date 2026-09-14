import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Landing from "./pages/Landing";
import PublicRoute from "./components/PublicRoute";
import Wallets from "./pages/Wallet";
import Reminders from "./pages/Reminders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },

  {
    element: <PublicRoute />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/transactions",
            element: <Transactions />,
          },
          {
            path: "/categories",
            element: <Categories />,
          },
          {
            path: "wallets",
            element: <Wallets />,
          },
          {
            path: "reminders",
            element: <Reminders />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
