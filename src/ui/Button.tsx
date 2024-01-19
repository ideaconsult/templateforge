import React from "react";
import NewFileIcon from "../IconsComponents/NewFileIcon";
import CopyFileIcon from "../IconsComponents/CopyFileIcon";
import OpenFileIcon from "../IconsComponents/OpenFileIcon";
import PublishIcon from "../IconsComponents/PublishIcon";
import "./Button.css";

export default function Button({ label }) {
  return (
    <button className="flex items-center justify-between gap-2 py-2 px-4 border-none focus:outline-none select-none font-medium leading-none rounded text-violet11 text-[14px] hover:bg-indigo-100">
      {label == "New" && <NewFileIcon />}
      {label == "Make a copy" && <CopyFileIcon />}
      {label == "Open" && <OpenFileIcon />}
      {label == "Publish" && <PublishIcon />}
      <span>{label}</span>
    </button>
  );
}
