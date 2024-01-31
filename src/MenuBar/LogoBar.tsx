import React from "react";
import "./Header.css";

export default function LogoBar({ startScreen, setShowStartScreen }) {
  return (
    <div className={startScreen ? "headerStartScreen" : "header"}>
      <h1
        className={startScreen ? "logoWrapStartScreen" : "logoWrap"}
        onClick={() => setShowStartScreen(true)}
      >
        Template Designer{" "}
        <span className="slogan">
          Designing data entry templates for eNanoMapper
        </span>
      </h1>
    </div>
  );
}
