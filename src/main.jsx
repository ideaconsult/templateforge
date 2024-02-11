import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import TemplatePage from "./pages/TemplatePage.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: () => fetch(`https://api.ramanchada.ideaconsult.net/template`),
  },

  {
    path: "/template/:templateId",
    element: <TemplatePage />,
    loader: ({ params }) =>
      fetch(
        `https://api.ramanchada.ideaconsult.net/template/${params.templateId}`
      ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
