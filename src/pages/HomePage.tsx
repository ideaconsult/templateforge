import React from "react";
import { useLocation } from "react-router-dom";
import StartScreenComp from "../StartScreenComp/StartScreenComp";
import TemplatePage from "./TemplatePage";
import WizardPage from "./WizardPage";

import { useSetUuid, useUuid } from "../store/store";

export default function HomePage() {
  const setUUID = useSetUuid();
  const UUID = useUuid();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuidParams = queryParams.get("uuid");
  const wizardParams = queryParams.get("wizard");

  if (uuidParams) {
    setUUID(uuidParams);
  }

  console.log(wizardParams);

  return (
    <>
      {wizardParams && <WizardPage />}
      {uuidParams && <TemplatePage uuid={uuidParams} />}
      {!uuidParams && !wizardParams && <StartScreenComp />}
      {/* {uuidParams || UUID ? (
        <TemplatePage uuid={uuidParams} />
      ) : (
        <StartScreenComp />
      )} */}
    </>
  );
}
