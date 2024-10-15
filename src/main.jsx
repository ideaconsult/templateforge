import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import TemplatePage from "./pages/TemplatePage.tsx";
import WizardPage from "./pages/WizardPage.tsx";
import PreferencesPage from "./pages/PreferencesPage.tsx";

import { ReactKeycloakProvider } from "@react-keycloak/web";

import _kc from "./utils/keycloak.js";

import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: HomePage,
    },

    {
      path: "/template/:templateId/",
      Component: TemplatePage,
    },
    {
      path: "/wizard",
      Component: WizardPage,
    },
    {
      path: "/preferences",
      Component: PreferencesPage,
    },
  ],
  { basename: "/templates/" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReactKeycloakProvider
    authClient={_kc}
    initOptions={{
      onLoad: "check-sso",
      checkLoginIframe: false,
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
    }}
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ReactKeycloakProvider>
);
