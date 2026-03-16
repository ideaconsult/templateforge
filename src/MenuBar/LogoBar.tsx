import React from "react";
import "./Header.css";

import AuthComp from "@/StartScreenComp/AuthComp";
import { Link } from "react-router-dom";
import { useSetIsShosen, useSetUuid } from "../store/store";

export default function LogoBar({ startScreen }) {
  const setUUID = useSetUuid();
  const setIdShosen = useSetIsShosen();

  return (
    <div className={startScreen ? "headerStartScreen" : "header"}>
      <div>
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
      <AuthComp />
    </div>
  );
}
