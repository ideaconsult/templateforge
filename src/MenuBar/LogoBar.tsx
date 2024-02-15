import React from "react";
import "./Header.css";

import { useSetUuid } from "../store/store";
import { Link } from "react-router-dom";

export default function LogoBar({ startScreen, uuid }) {
  const setUUID = useSetUuid();
  return (
    <div className={startScreen ? "headerStartScreen" : "header"}>
      <Link to="/">
        <h1
          className={startScreen ? "logoWrapStartScreen" : "logoWrap"}
          onClick={() => setUUID(null)}
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
