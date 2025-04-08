import React from "react";
import "./styles.css";

function Notification({ children, mode }) {
  return (
    <div
      className={`${
        mode == "Draft"
          ? "notification-content-draft"
          : "notification-content-finalized"
      }`}
    >
      {children}
    </div>
  );
}

export default Notification;
