// @ts-nocheck
import React, { useState } from "react";
import CreateNewDialog from "../DialogComp/CreateNewDialog";
import { useSetSaveOnServer } from "../store/store";
import Button from "../ui/Button";
import "./Header.css";

export default function TopMenuBar({ uuid }) {
  const [copied, setCopied] = useState(false);

  const save = useSetSaveOnServer();

  const urlToCopy = import.meta.env.PROD
    ? `https://enanomapper.adma.ai/designer?uuid=${uuid}`
    : `http://localhost:5173/designer?uuid=${uuid}`;

  const copyLink = () => {
    uuid && navigator.clipboard.writeText(urlToCopy);
  };

  setTimeout(() => {
    setCopied(false);
  }, 3000);

  return (
    <div className="topMenuBar">
      <div className="saveUuid">
        <div onClick={() => save()}>
          <Button label="Save" />
        </div>
        <div
          onClick={() => {
            copyLink();
            setCopied(true);
          }}
        >
          <Button label={copied ? "Copied to clipboard!" : "Share"} />
        </div>
      </div>
      <CreateNewDialog />
    </div>
  );
}
