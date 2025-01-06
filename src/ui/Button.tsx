import React from "react";
import NewFileIcon from "../IconsComponents/NewFileIcon";
import CopyFileIcon from "../IconsComponents/CopyFileIcon";
import OpenFileIcon from "../IconsComponents/OpenFileIcon";
import PublishIcon from "../IconsComponents/PublishIcon";
import SaveIcon from "../IconsComponents/SaveIcon";
import ShareIcon from "../IconsComponents/ShareIcon";
import ExcelIcon from "../IconsComponents/ExcelIcon";
import "./Button.css";

export default function Button({ label, disabled }) {
  let id = label.replace(/\s+/g, "-");
  return (
    <button
      id={id}
      data-cy={label}
      className="buttonMenu"
      disabled={disabled ? true : false}
    >
      {label == "New" && <NewFileIcon />}
      {label == "Make a copy" && (
        <CopyFileIcon disabled={disabled ? true : false} />
      )}
      {label == "Open" && <OpenFileIcon />}
      {label == "Publish" && <PublishIcon />}
      {label == "Save" && <SaveIcon />}
      {label == "Share" && <ShareIcon />}
      {label == "Generate Excel" && <ExcelIcon />}
      <span>{label}</span>
    </button>
  );
}
