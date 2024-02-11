import React from "react";
import "./Header.css";

import { useSetShowStartScreen } from "../store/store";
import { Link } from "react-router-dom";

export default function LogoBar({ startScreen, uuid }) {
  const setStartScreen = useSetShowStartScreen();
  return (
    <div className={startScreen ? "headerStartScreen" : "header"}>
      <Link to="/">
        <h1
          className={startScreen ? "logoWrapStartScreen" : "logoWrap"}
          onClick={() => setStartScreen()}
        >
          Template Designer{" "}
          <span className="slogan">
            Designing data entry templates for eNanoMapper
          </span>
        </h1>
      </Link>
      {uuid && (
        <p className="uuid">
          <span className="uuidWORD">UUID:</span> {uuid}
        </p>
      )}
    </div>
  );
}
