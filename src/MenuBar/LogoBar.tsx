import React from "react";
import "./Header.css";

import { useSetUuid, useSetIsShosen } from "../store/store";
import { Link } from "react-router-dom";

export default function LogoBar({ startScreen, uuid }) {
  const setUUID = useSetUuid();
  const setIdShosen = useSetIsShosen();
  return (
    <div className={startScreen ? "headerStartScreen" : "header"}>
      <Link to="/">
        <h1
          className={startScreen ? "logoWrapStartScreen" : "logoWrap"}
          onClick={() => {
            setUUID(null);
            setIdShosen(null);
          }}
        >
          Template Designer{" "}
          <span className="slogan">
            Designing data entry templates for eNanoMapper
          </span>
        </h1>
      </Link>
    </div>
  );
}
