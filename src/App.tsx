import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main } from "./page/main";
import { GraphPage } from "./page/graph";
import { TagsPage } from "./page/tags";
import { NipposPage } from "./page/nippos";

const router = createBrowserRouter([
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/",
    element: <GraphPage />,
  },
  {
    path: "/tags",
    element: <TagsPage />,
  },
  {
    path: "/nippos",
    element: <NipposPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
