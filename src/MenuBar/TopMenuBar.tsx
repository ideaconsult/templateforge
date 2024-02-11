// @ts-nocheck
import React from "react";
import { useSetSaveOnServer, useSetUuid, useUuid } from "../store/store";
import Button from "../ui/Button";
import { useLocation } from "react-router-dom";
import "./Header.css";

export default function TopMenuBar({ uuid }) {
  const setUUID = useSetUuid();
  const save = useSetSaveOnServer();

  const loc = useLocation();
  console.log(import.meta.env.BASE_URL);

  const copyLink = () => {
    uuid &&
      navigator.clipboard.writeText(`http://localhost:5173/template/${uuid}`);
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
