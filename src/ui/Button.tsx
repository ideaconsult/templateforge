import React from "react";
import NewFileIcon from "../IconsComponents/NewFileIcon";
import CopyFileIcon from "../IconsComponents/CopyFileIcon";
import OpenFileIcon from "../IconsComponents/OpenFileIcon";
import PublishIcon from "../IconsComponents/PublishIcon";
import SaveIcon from "../IconsComponents/SaveIcon";
import ShareIcon from "../IconsComponents/ShareIcon";
import ExcelIcon from "../IconsComponents/ExcelIcon";
import ViewIcon from "@/IconsComponents/ViewIcon";
import EditIcon from "@/IconsComponents/EditIcon";
import ShareLinkIcon from "@/IconsComponents/ShareLinkIcon";
import CustomizeIcon from "@/IconsComponents/CustomizeIcon";
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
      {label == "View" && <ViewIcon disabled={disabled} />}

      {label == "Share a link" && <ShareLinkIcon disabled={disabled} />}
      {label == "Edit blueprint" && <EditIcon disabled={disabled} />}
      {label == "Customize Excel template" && (
        <CustomizeIcon disabled={disabled} />
      )}

      {label == "New" && <NewFileIcon />}
      {/* {label == "Make a copy" && <CopyFileIcon disabled={disabled} />} */}
      {label == "Open" && <OpenFileIcon />}
      {label == "Publish" && <PublishIcon />}
      {label == "Save" && <SaveIcon />}
      {label == "Share" && <ShareIcon />}
      {label == "Generate Excel Template" && <ExcelIcon disabled={disabled} />}
      <span>{label}</span>
    </button>
  );
}
