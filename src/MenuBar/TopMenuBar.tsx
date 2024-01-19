import React from "react";
import Button from "../ui/Button";
import MakeCopyDialog from "../DialogComp/MakeCopyDialog";
import OpenFileDialog from "../DialogComp/OpenFileDialog";

export default function TopMenuBar() {
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <Button label="New" />
      <OpenFileDialog />
      <MakeCopyDialog />

      <Button label="Publish" />
    </div>
  );
}
