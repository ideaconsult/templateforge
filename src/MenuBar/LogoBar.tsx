import React from "react";
import "./Header.css";

export default function LogoBar() {
  return (
    <div className="header">
      <h1 className="logoWrap">
        Template Designer{" "}
        <span className="slogan">
          Designing data entry templates for eNanoMapper
        </span>
      </h1>
    </div>
  );
}
