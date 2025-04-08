import React from "react";
import { useLocation } from "react-router-dom";
import StartScreenComp from "../StartScreenComp/StartScreenComp";
import WizardPage from "./WizardPage";

export default function HomePage() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const wizardParams = queryParams.get("wizard");

  return (
    <>
      {wizardParams && <WizardPage />}
      <StartScreenComp />
    </>
  );
}
