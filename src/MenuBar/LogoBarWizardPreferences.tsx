import React from "react";
import "./Header.css";

import { Link } from "react-router-dom";
import Button from "@/ui/Button";
export default function LogoBarWizardPreferences() {
  return (
    <div className="headerStartScreen">
      <Link to="/">
        <h1 className={"logoWrapStartScreen"}>
          Template Designer <span className="slogan">Preferences</span>
        </h1>
      </Link>
      <Link to="/" style={{ paddingRight: "1rem" }}>
        <Button label="Back to Start screen" disabled={false} />
      </Link>
    </div>
  );
}
