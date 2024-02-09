// @ts-nocheck
import React from "react";
import Button from "../ui/Button";
import MakeCopyDialog from "../DialogComp/MakeCopyDialog";
import OpenFileDialog from "../DialogComp/OpenFileDialog";
import "./Header.css";
import { useUuid, useSetUuid, useSetSaveOnServer } from "../store/store";

export default function TopMenuBar({ setSurveyReset }) {
  const uuid = useUuid();
  const setUUID = useSetUuid();
  const save = useSetSaveOnServer();
  return (
    <div className="topMenuBar">
      <div className="saveUuid">
        <div onClick={() => save()}>
          <Button label="Save" />
        </div>
        {/* <OpenFileDialog setTemplateURL={setTemplateURL} />
      <MakeCopyDialog />
      <Button label="Publish" /> */}
        {uuid && (
          <p className="uuid">
            <span className="uuidWORD">UUID:</span> {uuid}
          </p>
        )}
      </div>
      <button
        className="createNewBtn"
        onClick={() => {
          // setShowStartScreen(false);
          // setStartScreen();
          setSurveyReset(true);
          setUUID("");
        }}
      >
        Create a new Draft
      </button>
    </div>
  );
}
