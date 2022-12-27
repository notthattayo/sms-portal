import { createBrowserRouter, Link, Navigate } from "react-router-dom";

import Login from "./pages/login/login";
import Conversations from "./pages/conversations/conversations";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Conversations />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
