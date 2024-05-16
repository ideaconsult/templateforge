import React from "react";
import { Navigate } from "react-router-dom";
import "./Header.css";

import { useSetUuid, useSetIsShosen } from "../store/store";
import { Link } from "react-router-dom";
import Button from "@/ui/Button";

export default function LogoBar({ startScreen, uuid }) {
  const setUUID = useSetUuid();
  const setIdShosen = useSetIsShosen();
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
      <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
        {localStorage.getItem("project") && (
          <div className="projectName">
            <span className="projectLabel">Project:</span>
            <span>{localStorage.getItem("project")}</span>
          </div>
        )}
        <Link to="/preferences">
          <Button label="Preferences" disabled={false} />
        </Link>
      </div>
    </div>
  );
}
