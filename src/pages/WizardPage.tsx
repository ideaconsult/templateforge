import React from "react";

import LogoBarWizard from "../MenuBar/LogoBarWizard";
import Button from "@/ui/Button";
import { Link } from "react-router-dom";

export default function WizardPage() {
  return (
    <div>
      <LogoBarWizard />
      <div style={{ padding: "1rem" }}>
        <Link to="/">
          <Button label="Back to Template Designer" disabled={false} />
        </Link>
      </div>
    </div>
  );
}
