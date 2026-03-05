import React from "react";
import "./Tooltip.css";

function Tooltip({ show, isLoggedIn }: { show: boolean; isLoggedIn: boolean }) {
  const loggedInTooltipText = `Upload a completed template to validate the data structure and convert it to NeXus format. The file is processed temporarily and not stored.`;
  const loggedOutTooltipText = `Please log in to upload and validate your template.`;
  return (
    <div className={`tooltipWrap ${show ? "show" : ""}`}>
      {isLoggedIn ? loggedInTooltipText : loggedOutTooltipText}
    </div>
  );
}

export default Tooltip;
