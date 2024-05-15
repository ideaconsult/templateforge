import React from "react";

import LogoBarWizardPreferences from "../MenuBar/LogoBarWizardPreferences";
import Button from "@/ui/Button";
import Select from "@/ui/Select";
import { Link } from "react-router-dom";

const selectUrl = "https://enanomapper.adma.ai/api/projects.json";

export default function PreferencesPage() {
  return (
    <div>
      <LogoBarWizardPreferences />
      <div style={{ padding: "1rem" }}>
        <Select url={selectUrl} name="Project" />
      </div>
    </div>
  );
}
