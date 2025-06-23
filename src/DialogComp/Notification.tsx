import React from "react";
import "./styles.css";

function Notification({ children, mode }) {
  return (
    <div
      className={`${
        (mode == "Draft" && "notification-content-draft") ||
        (mode == "Finalized" && "notification-content-finalized") ||
        (mode == "TemplateScreen" && "notification-content-screen")
      }`}
    >
      {children}
    </div>
  );
}

export default Notification;
