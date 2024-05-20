import React from "react";
import "./Header.css";

import { Link } from "react-router-dom";
import Button from "@/ui/Button";
export default function LogoBarWizard() {
  return (
    <div className="headerStartScreen">
      <Link to="/">
        <h1 className={"logoWrapStartScreen"}>
          Template Wizard{" "}
          <span className="sloganWizard">Customize yoiur template</span>
        </h1>
      </Link>
    </div>
  );
}
