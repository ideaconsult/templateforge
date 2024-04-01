import React from "react";
import { useLocation } from "react-router-dom";
import StartScreenComp from "../StartScreenComp/StartScreenComp";
import TemplatePage from "./TemplatePage";

import { useSetUuid, useUuid } from "../store/store";

export default function HomePage() {
  const setUUID = useSetUuid();
  const UUID = useUuid();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuidParams = queryParams.get("uuid");

  if (uuidParams) {
    setUUID(uuidParams);
  }

  return (
    <>
      {uuidParams || UUID ? (
        <TemplatePage uuid={uuidParams} />
      ) : (
        <StartScreenComp />
      )}
    </>
  );
}
