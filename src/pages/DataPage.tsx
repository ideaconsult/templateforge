import React, { useState } from "react";

import Button from "@/ui/Button";
import { Link, useParams } from "react-router-dom";
import LogoBarWizard from "../MenuBar/LogoBarWizard";
import SurveyComponent from "../SurveyComp/SurveyComp";
import { useProjectID } from "../store/store";
import config from "@/utils/config";
import { downloadFile } from "@/lib/request";

export default function DataPage() {
  const [result, setResult] = useState(null);
  const projectID = useProjectID();

  let params = useParams();
  const uuid = params.templateId;
  const templateURL = `${config.apiUrl}/${uuid}?format=xlsx&project=${projectID}`;
  const definition = `${config.apiUrl}/${uuid}?format=json&data_entry=true`;
  
  const downloadXLS = () => {
    uuid && downloadFile(uuid, templateURL);
  };
  return (
    <div>
      <p className="underDev">
        The Template Wizard App is under development right now
      </p>
      <LogoBarWizard />
      <div style={{ padding: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">
            <Button label="Back to Templates" disabled={false} />
          </Link>
          <div onClick={downloadXLS}>
            <Button
              disabled={!params.templateId}
              label="Generate Excel Template"
            />
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <SurveyComponent
            setResult={setResult}
            uuid={params.templateId}
            definition={definition}
            mode="edit"
          />
        </div>
      </div>
    </div>
  );
}
