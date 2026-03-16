import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import TemplatePage from "./pages/TemplatePage.tsx";
import WizardPage from "./pages/WizardPage.tsx";
import PreferencesPage from "./pages/PreferencesPage.tsx";
import UploadPage from "./pages/UploadPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

import { AuthProvider, useAuth } from "react-oidc-context";

import "./index.css";

const oidcConfig = {
  authority: "https://iam.ideaconsult.net/auth/realms/nano",
  client_id: "idea-ui",
  redirect_uri: window.location.origin + "/templates/",
  automaticSilentRenew: true,
  post_logout_redirect_uri: window.location.origin + "/templates/",
  response_type: "code",
  scope: "openid profile email",
  loadUserInfo: true,
};

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
    {
      path: "/upload",
      Component: UploadPage,
    },
    { path: "/404", Component: NotFoundPage },
    { path: "*", Component: NotFoundPage },
  ],
  { basename: "/templates" },
);

export const Main = () => {
  const auth = useAuth();

  const token = auth.user?.access_token;

  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          "/serviceWorker.js",
          {
            scope: "/templates/",
          },
        );

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

  useEffect(() => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "TOKEN",
        token: token,
      });
    }
  }, [token]);
  return <></>;
};

function onSigninCallback() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider {...oidcConfig} onSigninCallback={onSigninCallback}>
    <React.StrictMode>
      <Main />
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>,
);
