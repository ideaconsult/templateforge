import React from "react";
import "./Header.css";

import { useSetShowStartScreen } from "../store/store";

export default function LogoBar({ startScreen }) {
  const setStartScreen = useSetShowStartScreen();
  return (
    <div className={startScreen ? "headerStartScreen" : "header"}>
      <h1
        className={startScreen ? "logoWrapStartScreen" : "logoWrap"}
        onClick={() => setStartScreen()}
      >
        Template Designer{" "}
        <span className="slogan">
          Designing data entry templates for eNanoMapper
        </span>
      </h1>
    </div>
  );
}
