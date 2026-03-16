import React, { useState } from "react";
import PreferencesDialog from "@/DialogComp/PreferencesDialog";

function ProjectComp() {
  const [projectName, setProjectName] = useState(() =>
    localStorage.getItem("project"),
  );
  return (
    <div
      style={{
        display: "flex",
        gap: "22px",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
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
  );
}

export default ProjectComp;
