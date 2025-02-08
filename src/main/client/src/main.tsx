import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./routes/Dashboard";
import History
 from "./routes/History";
import Notifications from "./routes/Notifications";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
