import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import "./StartScreenComp.css";

function AuthComp() {
  const auth = useAuth();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      sessionStorage.setItem("access_token", auth?.user?.access_token || "");
    }
  }, [auth]);

  return (
    <div className="authButtons">
      {auth?.isAuthenticated ? (
        <div className="userInfo">
          <p className="userName">{auth.user?.profile.name}</p>
          <button
            className="buttonMenu"
            onClick={() => {
              auth.signoutRedirect();
              sessionStorage.clear();
            }}
          >
            Log out
          </button>
        </div>
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
