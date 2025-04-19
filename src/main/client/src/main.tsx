import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./routes/Dashboard";
import History from "./routes/History";
import Notifications from "./routes/Notifications";
import Profile from "./routes/Profile";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "./routes/Login/Login.tsx";
import { Approvals } from "@/routes/Approvals";
import { Register } from "./routes/Register/Register.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/history",
        element: <History />
      },
      {
        path: "/approvals",
        element: <Approvals />
      },
      {
        path: "/notifications",
        element: <Notifications />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]);

const queryClient = new QueryClient(

);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
