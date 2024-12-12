import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import StartScreenComp from "../StartScreenComp/StartScreenComp";
import TemplatePage from "./TemplatePage";
import WizardPage from "./WizardPage";

import { useSetUuid, useUuid, useProjectID } from "../store/store";

export default function HomePage() {
  const setUUID = useSetUuid();
  const UUID = useUuid();
  const prID = useProjectID();

  const [projectID, setProjectID] = useState(() =>
    localStorage.getItem("projectID")
  );

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuidParams = queryParams.get("uuid");
  const wizardParams = queryParams.get("wizard");

  if (!UUID) setUUID(uuidParams);

  return (
    <>
      {wizardParams && <WizardPage />}
      {uuidParams || UUID ? (
        <TemplatePage
          uuid={UUID}
          setProjectID={setProjectID}
          projectID={projectID}
        />
      ) : null}
      {!uuidParams && !wizardParams && <StartScreenComp />}
    </>
  );
}
