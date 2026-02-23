import React from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";

import AuthComp from "@/StartScreenComp/AuthComp";
import { Link } from "react-router-dom";
import { useSetIsShosen, useSetUuid } from "../store/store";
import ExcelIcon from "@/IconsComponents/ExcelIcon";

export default function LogoBar({ startScreen }) {
  const setUUID = useSetUuid();
  const setIdShosen = useSetIsShosen();
  const [projectName, setProjectName] = useState(() =>
    localStorage.getItem("project"),
  );
  const location = useLocation();
  console.log(location.pathname);

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
        {/* {location.pathname !== "/upload" && (
          <Link to="/upload" className="upload-link">
            <ExcelIcon disabled={false} />
            Upload Excel
          </Link>
        )} */}
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
