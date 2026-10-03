import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Reminders from "../pages/Reminders";
import Transactions from "../pages/Transactions";
import Wallets from "../pages/Wallets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
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
            path: "/categories",
            element: <Categories />,
          },
          {
            path: "/reminders",
            element: <Reminders />,
          },
          {
            path: "/transactions",
            element: <Transactions />,
          },
          {
            path: "/wallets",
            element: <Wallets />,
          },
        ],
      },
    ],
  },
]);
