import React from "react";
import Button from "../ui/Button";
import MakeCopyDialog from "../DialogComp/MakeCopyDialog";
import OpenFileDialog from "../DialogComp/OpenFileDialog";
import "./Header.css";

export default function TopMenuBar() {
  return (
    <div className="topMenuBar">
      <Button label="New" />
      <OpenFileDialog />
      <MakeCopyDialog />
      <Button label="Publish" />
    </div>
  );
}
