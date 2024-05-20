import React from "react";
import "./Header.css";

import { Link } from "react-router-dom";
import Button from "@/ui/Button";
export default function LogoBarWizard() {
  return (
    <div className="headerStartScreen">
      <h1 className={"logoWrapStartScreen"}>
        <Link to="/">
          <span className={"logoWrapStartScreen"}>Template Wizard</span>
        </Link>
        <span className="sloganWizard">Customize your template</span>
      </h1>
    </div>
  );
}
