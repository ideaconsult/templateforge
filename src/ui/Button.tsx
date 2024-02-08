import React from "react";
import NewFileIcon from "../IconsComponents/NewFileIcon";
import CopyFileIcon from "../IconsComponents/CopyFileIcon";
import OpenFileIcon from "../IconsComponents/OpenFileIcon";
import PublishIcon from "../IconsComponents/PublishIcon";
import SaveIcon from "../IconsComponents/SaveIcon";
import "./Button.css";

export default function Button({ label, disabled }) {
  return (
    <button className="buttonMenu" disabled={disabled ? true : false}>
      {label == "New" && <NewFileIcon />}
      {label == "Make a copy" && (
        <CopyFileIcon disabled={disabled ? true : false} />
      )}
      {label == "Open" && <OpenFileIcon />}
      {label == "Publish" && <PublishIcon />}
      {label == "Save" && <SaveIcon />}
      <span>{label}</span>
    </button>
  );
}
