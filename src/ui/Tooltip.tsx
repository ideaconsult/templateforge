import React from "react";
import "./Tooltip.css";

function Tooltip({ show }: { show: boolean }) {
  return (
    <div className={`tooltipWrap ${show ? "show" : ""}`}>
      Upload a completed template to validate the data structure and convert it
      to NeXus format. The file is processed temporarily and not stored.
    </div>
  );
}

export default Tooltip;
