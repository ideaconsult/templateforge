import React from "react";
import { useAuth } from "react-oidc-context";

import "./StartScreenComp.css";

function AuthComp() {
  const auth = useAuth();
  return (
    <div className="authButtons">
      {auth?.isAuthenticated ? (
        <button
          className="buttonMenu"
          onClick={() => {
            auth.signoutRedirect();
          }}
        >
          Log out
        </button>
      ) : (
        <button
          className="buttonMenu"
          onClick={() => {
            auth.signinRedirect();
          }}
        >
          Log in
        </button>
      )}
    </div>
  );
}

export default AuthComp;
