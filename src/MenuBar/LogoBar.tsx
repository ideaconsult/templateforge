import React, { useState } from "react";
import "./Header.css";

import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useSetIsShosen, useSetUuid } from "../store/store";

export default function LogoBar({ startScreen, uuid, setProjectID }) {
  const setUUID = useSetUuid();
  const setIdShosen = useSetIsShosen();
  const [projectName, setProjectName] = useState(() =>
    localStorage.getItem("project")
  );

  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const username = keycloak.tokenParsed?.preferred_username
    ? keycloak.tokenParsed?.preferred_username
    : localStorage.getItem("username");

  const stored_token = localStorage.getItem("token");

  const logoutHandle = () => {
    navigate("/");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    keycloak.logout();
  };
  return (
    <div className={startScreen ? "headerStartScreen" : "header"}>
      <div>
        <Link to="/">
          <h1
            className={startScreen ? "logoWrapStartScreen" : "logoWrap"}
            onClick={() => {
              setUUID(null);
              setIdShosen(null);
            }}
          >
            Template Designer{" "}
            <span className="slogan">
              Designing data entry templates for eNanoMapper
            </span>
          </h1>
        </Link>
      </div>
      <div className="userInfo">
        <div className="username">
          {keycloak.authenticated || username ? username : ""}
        </div>
        {keycloak.authenticated || stored_token ? (
          <button
            onClick={() => {
              logoutHandle();
            }}
            className="buttonLogin"
          >
            Log out
          </button>
        ) : (
          <button
            onClick={() => {
              // navigate("/");
              keycloak.login();
            }}
            className="buttonLogin"
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
}
