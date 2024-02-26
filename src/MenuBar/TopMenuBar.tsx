// @ts-nocheck
import React, { useState } from "react";
import { useSetSaveOnServer } from "../store/store";
import Button from "../ui/Button";
import "./Header.css";

import { useIntermediateData, useUuid } from "../store/store";

import { postRequestUUID } from "../lib/request";

export default function TopMenuBar() {
  const [copied, setCopied] = useState(false);

  const save = useSetSaveOnServer();

  const uuid = useUuid();
  const interData = useIntermediateData();

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
    <div>
      <div className="topMenuBar">
        <div className="saveUuid">
          <div onClick={() => postRequestUUID(interData, uuid)}>
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
          <div>
            <Button label="Generate Excel" />
          </div>
        </div>
        {uuid && (
          <p className="uuid">
            <span className="uuidWORD">UUID:</span> {uuid}
          </p>
        )}
      </div>
    </div>
  );
}
