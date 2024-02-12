// @ts-nocheck
import React from "react";
import { useSetSaveOnServer, useSetUuid, useUuid } from "../store/store";
import Button from "../ui/Button";
import { useLocation } from "react-router-dom";
import "./Header.css";

export default function TopMenuBar({ uuid }) {
  const setUUID = useSetUuid();
  const save = useSetSaveOnServer();

  const urlToCopy = import.meta.env.PROD
    ? `https://enanomapper.adma.ai/designer/template/${uuid}`
    : `http://localhost:5173/designer/template/${uuid}`;

  const copyLink = () => {
    uuid && navigator.clipboard.writeText(urlToCopy);
  };
  return (
    <div className="topMenuBar">
      <div className="saveUuid">
        <div onClick={() => save()}>
          <Button label="Save" />
        </div>
        <div onClick={() => copyLink()}>
          <Button label="Share" />
        </div>
      </div>
      <button
        className="createNewBtn"
        onClick={() => {
          // setShowStartScreen(false);
          // setStartScreen();
          // setSurveyReset(true);
          setUUID("");
        }}
      >
        Create a new Draft
      </button>
    </div>
  );
}
