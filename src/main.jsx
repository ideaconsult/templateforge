import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import TemplatePage from "./pages/TemplatePage.tsx";
import WizardPage from "./pages/WizardPage.tsx";
import PreferencesPage from "./pages/PreferencesPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: HomePage,
    },

    {
      path: "/:templateId",
      Component: TemplatePage,
    },
    {
      path: "/wizard/:templateId",
      Component: WizardPage,
    },
    {
      path: "/preferences",
      Component: PreferencesPage,
    },
    { path: "/404", Component: NotFoundPage },
    { path: "*", Component: NotFoundPage },
  ],
  { basename: "/templates" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
