import React, { useState } from "react";
import "./Header.css";

import PreferencesDialog from "@/DialogComp/PreferencesDialog";

import { Link } from "react-router-dom";
import { useSetIsShosen, useSetUuid } from "../store/store";

export default function LogoBar({ startScreen }) {
  const setUUID = useSetUuid();
  const setIdShosen = useSetIsShosen();
  const [projectName, setProjectName] = useState(() =>
    localStorage.getItem("project")
  );
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
        {projectName ? (
          <div className="projectName">
            <span className="projectLabel">Project:</span>
            <span>{projectName}</span>
          </div>
        ) : (
          <p className="projectPromt">Project is not selected</p>
        )}
        <PreferencesDialog
          setProjectName={setProjectName}
          projectName={projectName}
        />
      </div>
    </div>
  );
}
