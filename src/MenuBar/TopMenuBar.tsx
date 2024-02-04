// @ts-nocheck
import React from "react";
import Button from "../ui/Button";
import MakeCopyDialog from "../DialogComp/MakeCopyDialog";
import OpenFileDialog from "../DialogComp/OpenFileDialog";
import "./Header.css";
import { useUuid, useSetSaveOnServer } from "../store/store";

export default function TopMenuBar({
  setSurveyReset,
  surveyReset,
  setTemplateURL,
  saveResults,
}) {
  const uuid = useUuid();
  const save = useSetSaveOnServer();
  return (
    <div className="topMenuBar">
      <div onClick={() => save()}>
        <Button label="Save" />
      </div>
      {/* <OpenFileDialog setTemplateURL={setTemplateURL} />
      <MakeCopyDialog />
      <Button label="Publish" /> */}
      {uuid && (
        <p>
          <span className="uuid">UUID:</span> {uuid}
        </p>
      )}
    </div>
  );
}
