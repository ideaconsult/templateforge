import React from "react";
import NewFileIcon from "../IconsComponents/NewFileIcon";
import CopyFileIcon from "../IconsComponents/CopyFileIcon";
import OpenFileIcon from "../IconsComponents/OpenFileIcon";
import PublishIcon from "../IconsComponents/PublishIcon";
import "./Button.css";

export default function Button({ label }) {
  return (
    <button className="buttonMenu">
      {label == "New" && <NewFileIcon />}
      {label == "Make a copy" && <CopyFileIcon />}
      {label == "Open" && <OpenFileIcon />}
      {label == "Publish" && <PublishIcon />}
      <span>{label}</span>
    </button>
  );
}
