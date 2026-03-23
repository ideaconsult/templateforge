import React from "react";

import LogoBarWizard from "../MenuBar/LogoBarWizard";
import Button from "@/ui/Button";
import Select from "@/ui/Select";
import { Link, useParams } from "react-router-dom";

const selectUrl =
  "https://enanomapper.adma.ai/api/projects/nanoreg2/materials.json";

export default function WizardPage() {
  let params = useParams();

  return (
    <div>
      <p className="underDev">
        The Template Wizard App is under development right now
      </p>
      <LogoBarWizard />
      <div style={{ padding: "1rem" }}>
        <Link to="/">
          <Button label="Back to Templates" disabled={false} />
        </Link>
        <div style={{ marginTop: "6rem" }}>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              color: "#ccc",
              marginTop: "3rem",
            }}
          >
            Coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
