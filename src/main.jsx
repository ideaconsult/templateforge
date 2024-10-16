import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import TemplatePage from "./pages/TemplatePage.tsx";
import WizardPage from "./pages/WizardPage.tsx";
import PreferencesPage from "./pages/PreferencesPage.tsx";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import { useKeycloak } from "@react-keycloak/web";

import _kc from "./utils/keycloak.js";

import "./index.css";
import { useEffect } from "react";

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

const Main = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (keycloak.authenticated) {
      localStorage.setItem("refreshToken", keycloak.refreshToken);
      localStorage.setItem("token", keycloak.token);
      localStorage.setItem("username", keycloak.tokenParsed.preferred_username);
    }
  }, [keycloak.authenticated]);

  const stored_token = localStorage.getItem("token");
  const token = keycloak.token ? keycloak.token : stored_token;

  const base_url = import.meta.env.PROD
    ? "/templates/serviceWorker.js"
    : "/serviceWorker.js";

  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(base_url, {
          scope: "/templates/",
        });

        await registration.active.postMessage({
          type: "TOKEN",
          token: token,
        });
      } catch (error) {
        console.log(`Registration failed with ${error}`);
      }
    }
  };

  registerServiceWorker();
};

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
      <Main />
      <RouterProvider router={router} />
    </React.StrictMode>
  </ReactKeycloakProvider>
);
