// @ts-nocheck
import React from "react";
import Button from "../ui/Button";
import MakeCopyDialog from "../DialogComp/MakeCopyDialog";
import OpenFileDialog from "../DialogComp/OpenFileDialog";
import "./Header.css";

export default function TopMenuBar({
  setSurveyReset,
  surveyReset,
  setTemplateURL,
}) {
  return (
    <div className="topMenuBar">
      <div onClick={() => setSurveyReset(!surveyReset)}>
        <Button label="New" />
      </div>
      <OpenFileDialog setTemplateURL={setTemplateURL} />
      <MakeCopyDialog />
      <Button label="Publish" />
    </div>
  );
}